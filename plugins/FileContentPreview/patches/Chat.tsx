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
const { FormIcon } = Forms;
const { ActivityIndicator, ScrollView } = ReactNative;

const { default: Navigator, getRenderCloseButton } = findByProps('getRenderCloseButton');
const modals = findByProps('pushModal');

const humanize = findByProps("intword");

const Svg = findByName("Svg",false).default;
const Path = findByName("Svg",false).Path;

function testBtn(onPress) {
    return ()=>(
    <TouchableOpacity onPress={onPress}>
        <FormIcon source={getAssetIDByName("ic_download_24px")} style={{ marginRight: 8, marginLeft: -8, opacity: 1 }} />
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

        const [wordWrap, setwordWrap] = React.useState(false);

        const Colors = {
            header: resolveSemanticColor(ThemeStore.theme, semanticColors.HEADER_PRIMARY),
            test: resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_MUTED),
            bgDark: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_SECONDARY_ALT),
            bgBright: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_SECONDARY),
            bgBrighter: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_ACCENT)
            };

        const wordwrapsvg = (
            <Svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill={wordWrap ? Colors.header : Colors.test}
                >
                
            <Path d="M2.75 5C2.33579 5 2 5.33579 2 5.75C2 6.16421 2.33579 6.5 2.75 6.5H21.25C21.6642 6.5 22 6.16421 22 5.75C22 5.33579 21.6642 5 21.25 5H2.75Z" />
            <Path d="M2.75 11.5C2.33579 11.5 2 11.8358 2 12.25C2 12.6642 2.33579 13 2.75 13H19C20.3807 13 21.5 14.1193 21.5 15.5C21.5 16.8807 20.3807 18 19 18H14.5607L15.2803 17.2803C15.5732 16.9874 15.5732 16.5126 15.2803 16.2197C14.9874 15.9268 14.5126 15.9268 14.2197 16.2197L12.2197 18.2197C11.9268 18.5126 11.9268 18.9874 12.2197 19.2803L14.2197 21.2803C14.5126 21.5732 14.9874 21.5732 15.2803 21.2803C15.5732 20.9874 15.5732 20.5126 15.2803 20.2197L14.5607 19.5H19C21.2091 19.5 23 17.7091 23 15.5C23 13.2909 21.2091 11.5 19 11.5H2.75Z" />
            <Path d="M2 18.75C2 18.3358 2.33579 18 2.75 18H9.25C9.66421 18 10 18.3358 10 18.75C10 19.1642 9.66421 19.5 9.25 19.5H2.75C2.33579 19.5 2 19.1642 2 18.75Z" />
            </Svg>);

        let loaded = (    
            <View style={{marginTop: 0}}>
            <View style={{
                  padding: 15,
                  paddingBottom: 0,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between"
            }}>
              <TouchableOpacity 
              onPress={()=>{setwordWrap(!wordWrap)}}
              onLongPress={()=>{showToast("Toggle Word Wrap", getAssetIDByName("ic_information_filled_24px"))}}
              style={{
                backgroundColor: wordWrap ? Colors.bgBrighter : Colors.bgDark,
                padding: 4,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: wordWrap ? Colors.bgBright : Colors.bgDark
              }}
              >
              {wordwrapsvg}
              </TouchableOpacity>
            </View>
            <ScrollView style={{margin: 15, marginBottom: 50}}>
              <ScrollView horizontal={!wordWrap}>
                <Text selectable={true} style={{color: Colors.header}}>{content}</Text>
              </ScrollView>
            </ScrollView>
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