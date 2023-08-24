import { findByProps, findByName, findByStoreName } from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";
import { semanticColors } from "@vendetta/ui";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { React, clipboard, ReactNative } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";

const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

const { View, Text, TouchableOpacity } = General;
const { FormIcon, FormText } = Forms;
const { ActivityIndicator } = ReactNative;

const { default: Navigator, getRenderCloseButton } = findByProps('getRenderCloseButton');
const modals = findByProps('pushModal');

const humanize = findByProps("intword");

const downloadIcon = getAssetIDByName("ic_download_24px");

function testBtn(onPress) {
    return ()=>(
    <TouchableOpacity onPress={onPress}>
        <FormIcon source={downloadIcon} style={{ marginRight: 8, marginLeft: -8, opacity: 1 }} />
    </TouchableOpacity>  
    );
};

function createFCModal(filename = "unknown", url = "https://cdn.discordapp.com/attachments/593084706593964043/1143675462376239236/SPOILER_a.txt", bytes = 1) {
    return ()=>{
        const [content, setContent] = React.useState("");
        let maxBytes = '10000';
        
        fetch(url, {
            headers: {
              'Range': 'bytes=0-' + maxBytes
            }
        }).then(r=>{
            if (!r.ok) {
                setContent("Error reading file content: Network response was not ok");
            } else {
                r.text().then(text=>{
                    setContent(text);
                });
            };
        });
        
        let loading = (  
            <View style={{margin: 32}}>
              <ActivityIndicator size="large" />
            </View>
            );

        let loaded = (    
            <View style={{margin: 15}}>
              <FormText>{content}</FormText>
            </View>
            )
        
        return (
            <Navigator
            initialRouteName="FILE_CONTENT_PREVIEW"
            screens={{
                FILE_CONTENT_PREVIEW: {
                    headerLeft: getRenderCloseButton(() => modals.popModal('file-content-preview')),
                    headerRight: testBtn(() => { console.log("uwu") }),
                    render: () => {
                        return (
                        content ? loaded : loading
                        );
                    },
                    headerTitle: ()=> {
                        let headerColor = resolveSemanticColor(ThemeStore.theme, semanticColors.HEADER_PRIMARY);
                        return <TouchableOpacity
                        onPress={() => {
                          clipboard.setString(filename);
                          showToast(
                            "Copied filename to clipboard",
                            getAssetIDByName("toast_copy_message")
                          );
                        }}
                      >
                        <Text numberOfLines={1} style={{ color: headerColor }}>
                          {filename}
                        </Text>
                        <Text numberOfLines={1} style={{ color: headerColor, fontSize: 12 }}>
                          {humanize.intword(bytes, [ 'bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ], 1024, undefined, undefined, undefined, ' ')}
                        </Text>
                      </TouchableOpacity>;
                    }
                }
            }}
            />
        );
    };
};

const MessageStore = findByStoreName("MessageStore");
const SelectedChannelStore = findByStoreName("SelectedChannelStore");

export default function() {
    return after("render", findByName("Chat").prototype, (_a, b) => {
        if (!b.props.hasOwnProperty("onTapInviteEmbed")) return; // This happens when you're viewing an image
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
};