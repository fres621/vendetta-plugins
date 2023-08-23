import { findByProps, findByName, findByStoreName } from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import React from "react";
import { Forms, General } from "@vendetta/ui/components";

const { Text, TouchableOpacity } = General;
const { FormIcon } = Forms;

const WebView = findByName("WebView");
const { default: Navigator, getRenderCloseButton } = findByProps('getRenderCloseButton');
const modals = findByProps('pushModal');




const downloadIcon = getAssetIDByName("ic_download_24px");

function testBtn(onPress) {
    return ()=>(
    <TouchableOpacity onPress={onPress}>
        <FormIcon source={downloadIcon} style={{ marginRight: 8, marginLeft: -8, opacity: 1 }} />
    </TouchableOpacity>  
    );
};

let maxBytes = 1024*100; // 1 kb

function createFCModal(filename = "unknown", url = "https://cdn.discordapp.com/attachments/593084706593964043/1143675462376239236/SPOILER_a.txt", bytes = 1*1024*1024) {
    return ()=>{
        const [count, setCount] = React.useState("");
        let injectedJS = `
        let url = "${url}";
        let maxBytes = 1;
        (async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const reader = response.body.getReader();
                let bytesRead = 0;
                let chunks = [];
                while (bytesRead < maxBytes) {
                    const {
                        done,
                        value
                    } = await reader.read();
                    if (done) {
                        break;
                    }
                    chunks.push(value);
                    bytesRead += value.length;
                }
                reader.cancel("Download size limit reached.");

                const result = new Uint8Array(bytesRead);
                let offset = 0;

                for (const chunk of chunks) {
                    result.set(chunk, offset);
                    offset += chunk.length;
                }

                let str = (new TextDecoder().decode(result));
                window.ReactNativeWebView.postMessage(str);
            } catch (error) {
                window.ReactNativeWebView.postMessage("Error reading file content: " + error.message);
            }
        })();
        `;
        let wv = <WebView 
            source={{uri: 'https://cdn.discordapp.com/robots.txt'}}
            style={{display: 'none'}}
            injectedJavaScript={injectedJS}
            onMessage={(event) => {
                setCount(event.nativeEvent.data);
            }} />;

        let rnfetch = (bytes > maxBytes);
        
        if (!count && rnfetch) {
            fetch(url).then(r=>{
            if (!r.ok) {
                setCount("Error reading file content: Network response was not ok");
            } else {
                r.text().then(text=>{
                setCount(text);
                });
            };
            });
        };
        
        
        return (
            <Navigator
            initialRouteName="FILE_CONTENT_PREVIEW"
            screens={{
                FILE_CONTENT_PREVIEW: {
                    headerLeft: getRenderCloseButton(() => modals.popModal('file-content-preview')),
                    headerRight: testBtn(() => { console.log("uwu") }),
                    render: () => {
                        return (
                        <>
                            <Text>{count ? count : "Loading file content..."}</Text>
                            {rnfetch ? null : wv}
                        </>
                        );
                    },
                    title: filename.toUpperCase()
                }
            }}
            />
        );
    };
};

const MessageStore = findByStoreName("MessageStore");
const SelectedChannelStore = findByStoreName("SelectedChannelStore");

export default after("render", findByName("Chat").prototype, (_a, b) => {
  before("onTapInviteEmbed", b.props, ([{ nativeEvent: { index, messageId } }])=>{
    
    let channel = SelectedChannelStore.getChannelId();
    let message = MessageStore.getMessage(channel, messageId);
    let codedLinks = message.codedLinks;
    let attachments = message.attachments;
    if (index >= codedLinks.length) {
      let attachmentIndex = index-codedLinks.length;
      let attachment = attachments[attachmentIndex];
      modals.pushModal({
        key: 'file-content-preview',
        modal: {
            key: 'file-content-preview',
            modal: createFCModal("uwu", attachment.url, attachment.size),
            animation: 'slide-up',
            shouldPersistUnderModals: false,
            closable: true
        }
    });
    };
  });
});