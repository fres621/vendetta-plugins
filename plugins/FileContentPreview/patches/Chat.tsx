import { findByProps, findByName, findByStoreName } from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";
import { semanticColors } from "@vendetta/ui";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { React, clipboard, ReactNative } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";
import translations from "../translations";
import filetypes from "../filetypes";
import { storage } from "@vendetta/plugin";
import { constants } from "@vendetta/metro/common";

const Locale = findByProps("Messages");
const { getLocale } = findByProps("getLocale");

const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

const { View, Text, TouchableOpacity } = General;
const { FormIcon } = Forms;
const { ActivityIndicator, ScrollView, Image, Modal } = ReactNative;

const download = ReactNative.NativeModules.MediaManager.downloadMediaAsset;

const { default: Navigator, getRenderCloseButton } = findByProps('getRenderCloseButton');
const modals = findByProps('pushModal');

const humanize = findByProps("intword");

const Svg = findByName("Svg",false).default;
const Path = findByName("Svg",false).Path;

const SafeArea = findByProps("useSafeAreaInsets");

function testBtn(onPress, onLongPress) {
    return ()=>(
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        <FormIcon source={getAssetIDByName("ic_download_24px")} style={{ marginRight: 8, marginLeft: -8, opacity: 1 }} />
    </TouchableOpacity>  
    );
};

function createFCModal(filename = "unknown", url = "https://cdn.discordapp.com/attachments/1068304660269641738/1144843403151020122/file.txt", bytes = 1) {
    return ()=>{
        let maxBytes = storage.chunkSize || 60928;
        const [state, setState] = React.useState({content: "", loadedBytes: maxBytes, firstTime: true});
        if (state.firstTime) {
          fetch(url, {
              headers: {
                'Range': 'bytes=0-' + String(maxBytes)
              }
          }).then(r=>{
              if (!r.ok) {
                  //setContent("Error reading file content: Network response was not ok");
                  setState({content: "", loadedBytes: 0, firstTime: false});
              } else {
                  r.text().then(text=>{
                      //setContent(text);
                      setState({content: text, loadedBytes: state.loadedBytes, firstTime: false});
                  });
              };
          });
        };
        
        let loading = (  
            <View style={{margin: 32}}>
              <ActivityIndicator size="large" />
            </View>
            );

        const [wordWrap, setwordWrap] = React.useState(false);
        const [nl, setnl] = React.useState([]);

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

        let unloadedRemaining = (
          <>
            <Text style={{color: Colors.test, marginTop: 7}}>+ {humanize.intword(bytes-state.loadedBytes, [ 'bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ], 1024, undefined, undefined, undefined, ' ')} not loaded.</Text>
            <TouchableOpacity 
            style={{backgroundColor: Colors.bgBright, borderRadius: 5, padding: 10, marginBottom: 20, marginTop: 5}}
            onPress={()=>{
              //setLoadedBytes(loadedBytes + maxBytes);
              fetch(url, {
                headers: {
                  'Range': 'bytes=' + String(state.loadedBytes + 1) + '-' + String(state.loadedBytes + maxBytes)
                }
              }).then(r=>{
                  if (!r.ok) {
                      //setContent(content + "\nError loading more of the file content: Network response was not ok");
                      //console.log("Error loading more bytes: Network response was not ok");
                      showToast("Error: Network response was not ok", getAssetIDByName("ic_close_circle"));
                  } else {
                      r.text().then(text=>{
                          //setContent(content + text);
                          setState({content: state.content + text, loadedBytes: state.loadedBytes + maxBytes, firstTime: false});
                      });
                  };
              });
            }}
            ><Text style={{color: Colors.header, textTransform: "uppercase", fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>{Locale.Messages.VOICE_PANEL_LOAD_MORE}</Text></TouchableOpacity>
          </>
        );

        const [isOverlayVisible, setIsOverlayVisible] = React.useState(false);
        const scrollViewRef = React.useRef(null);

        const insets = SafeArea.useSafeAreaInsets();
        let lineIteration = 0;

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
              <View style={{
                display: "flex",
                flexDirection: "row"
              }}>
                <TouchableOpacity 
                onPress={()=>{setwordWrap(!wordWrap)}}
                onLongPress={()=>{showToast(translations.TOGGLE_WORD_WRAP[getLocale()] ?? "Toggle Word Wrap", getAssetIDByName("ic_information_filled_24px"))}}
                style={{
                  backgroundColor: wordWrap ? Colors.bgBrighter : Colors.bgDark,
                  padding: 4,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: wordWrap ? Colors.bgBright : Colors.bgDark
                }}>
                  {wordwrapsvg}
                </TouchableOpacity>
                <TouchableOpacity 
                      onPress={()=>{setIsOverlayVisible(true)}}
                      onLongPress={()=>{showToast(Locale.Messages.JUMP, getAssetIDByName("ic_information_filled_24px"))}}
                      style={{
                          marginLeft: 10,
                          backgroundColor: Colors.bgDark,
                          padding: 4,
                          borderRadius: 5,
                          borderWidth: 2,
                          borderColor: Colors.bgDark
                      }}
                      >
                      <Image 
                      source={getAssetIDByName("ic_reply_24px")} 
                      style={{ 
                          height: 24, width: 24, 
                          transform: [{ scaleX: -1 }, { rotate: '-90deg' }] }}
                      />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView ref={scrollViewRef} style={{margin: 15, marginBottom: 50+insets.bottom}}>
              <ScrollView horizontal={!wordWrap}>
                <View style={{ flexDirection: 'row' }}>
                <View style={{borderTopLeftRadius: 4, borderBottomLeftRadius: 4, backgroundColor: Colors.bgDark, marginRight: 5, paddingRight: 2, paddingLeft: 2, alignSelf: 'flex-start'}}>
                    <Text style={{textAlign: 'right', color: Colors.test, lineHeight: 20}}>
                        {nl.map((line)=>line?++lineIteration:' ').join('\n')}
                    </Text>
                </View>
                <Text selectable={true} style={{color: Colors.header, lineHeight: 20, flex: 1}} onTextLayout={(e)=>{
                    let lines = e.nativeEvent.lines;
                    // Code below: For each line, if it's the first line or the line before has a line break return true,
                    // otherwise return false, this way I have an array of booleans which lets me know whether I should put
                    // a line number at a certain index
                    setnl(lines.map((_line, i)=>i>0 ? lines[i-1].text.indexOf("\n")>-1 : true));
                    }}>{state.content}</Text>
                </View>
              </ScrollView>
              {state.loadedBytes < bytes && unloadedRemaining}
            </ScrollView>
            <Modal
            transparent={true}
            animationType="none"
            visible={isOverlayVisible}
            onRequestClose={()=>setIsOverlayVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
                }}>
                    <View style={{
                        backgroundColor: Colors.bgBright,
                        padding: 20,
                        borderRadius: 10,
                        width: '90%',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 15
                        }}>
                        <Forms.FormText style={{fontSize: 20, fontFamily: constants.Fonts.PRIMARY_BOLD}}>{Locale.Messages.JUMP}</Forms.FormText>
                        <TouchableOpacity onPress={()=>setIsOverlayVisible(false)}>
                            <FormIcon source={getAssetIDByName("ic_close_16px")} style={{ opacity: 1 }} />
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.bgDark, borderRadius: 5, 
                            padding: 10, marginBottom: 15, marginTop: 5,
                            flexDirection: 'row', justifyContent: 'space-between',
                            alignItems: 'center'
                        }} onPress={()=>{
                            let scrollView: any = scrollViewRef?.current;
                            setIsOverlayVisible(false)
                            scrollView?.scrollToEnd?.({ animated: true });
                        }}>
                            <FormIcon source={getAssetIDByName("ic_jump_to_bottom_24px")} style={{ opacity: 1 }} />
                            <Forms.FormText style={{color: Colors.test, fontSize: 16, fontFamily: constants.Fonts.PRIMARY_BOLD, textTransform: "uppercase"}}>{translations.JUMP_BOTTOM[getLocale()] ?? "Jump to the bottom"}</Forms.FormText>
                            <View />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.bgDark, borderRadius: 5, 
                            padding: 10, marginBottom: 10,
                            flexDirection: 'row', justifyContent: 'space-between',
                            alignItems: 'center'
                        }} onPress={()=>{
                            let scrollView: any = scrollViewRef?.current;
                            setIsOverlayVisible(false)
                            scrollView?.scrollTo?.({ y: 0, animated: true });
                        }}>
                            <FormIcon source={getAssetIDByName("ic_jump_to_bottom_24px")} style={{ opacity: 1, transform: [{ scaleY: -1 }] }} />
                            <Forms.FormText style={{color: Colors.test, fontSize: 16, fontFamily: constants.Fonts.PRIMARY_BOLD, textTransform: "uppercase"}}>{translations.JUMP_TOP[getLocale()] ?? "Jump to the top"}</Forms.FormText>
                            <View />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
          </View>
            )
        
        return (
            <Navigator
            initialRouteName="FILE_CONTENT_PREVIEW"
            screens={{
                FILE_CONTENT_PREVIEW: {
                    headerLeft: getRenderCloseButton(() => modals.popModal('file-content-preview')),
                    headerRight: testBtn(() => { 
                      download(url, 0).then(saved=>{
                        if (saved) {
                        showToast(translations.FILE_SAVED[getLocale()] ?? "File saved", getAssetIDByName("ic_selection_checked_24px"));
                        } else {
                        showToast(translations.FILE_SAVE_ERROR[getLocale()] ?? "Error saving file", getAssetIDByName("ic_close_circle"));
                        };
                      });
                     }, () => {
                      clipboard.setString(url);
                      showToast(
                        Locale.Messages.COPIED + " " + Locale.Messages.SEARCH_ANSWER_HAS_LINK,
                        getAssetIDByName("toast_copy_link")
                      );
                     }),
                    render: () => {
                        return (
                        state.content ? loaded : loading
                        );
                    },
                    headerTitle: ()=> {
                        let headerColor = resolveSemanticColor(ThemeStore.theme, semanticColors.HEADER_PRIMARY);
                        return <TouchableOpacity
                        onPress={() => {
                          clipboard.setString(filename);
                          showToast(
                            Locale.Messages.COPIED_TEXT,
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
            let textFiles = message.attachments.filter(attachment=>filetypes.has(attachment.filename.toLowerCase().split(".").pop()));
            if (index >= codedLinks.length) {
            let attachmentIndex = index-codedLinks.length;
            let attachment = textFiles[attachmentIndex];
            modals.pushModal({
                key: 'file-content-preview',
                modal: {
                    key: 'file-content-preview',
                    modal: createFCModal(attachment.filename, attachment.url, attachment.size),
                    animation: 'slide-up',
                    shouldPersistUnderModals: false,
                    closable: true
                }
            });
            };
        });
    });
};