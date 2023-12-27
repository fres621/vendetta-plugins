import { React, ReactNative, i18n, constants } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { findByProps, findByName, findByStoreName } from "@vendetta/metro";
import { General } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { DownloadButton, FCButton, FCButtonBar, MonospaceSvg, WordWrapSvg } from "./FCButtons";
import translations from "../translations";
import JumpModal from "./JumpModal";
import { FCTitle } from "./FCTitle";
import { semanticColors } from "@vendetta/ui";
import LoadMore from "./LoadMore";

const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

// https://github.com/nexpid/VendettaPlugins/blob/main/stuff/types.tsx#L43-L47
const Navigator = findByName("Navigator") ?? findByProps("Navigator")?.Navigator;
const closeButton = findByProps("getRenderCloseButton")?.getRenderCloseButton ?? findByProps("getHeaderCloseButton")?.getHeaderCloseButton;

const { ActivityIndicator, ScrollView, Image, Modal }: { [key: string]: any } = ReactNative;

const { View, Text } = General;

const SafeArea = findByProps("useSafeAreaInsets");
const humanize = findByProps("intword");

/** Format file size
 * @param bytes
 * @returns Human readable string
 */
const filesize = (bytes: number): string => humanize.intword(bytes, ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'], 1024, undefined, undefined, undefined, ' ');

const modals = findByProps('pushModal');

const MODALS = {
    JUMP: JumpModal
}

const Loading: any = () => (
    <View style={{ margin: 32 }}>
        <ActivityIndicator size="large" />
    </View>
);

export const FCModal: any = ({
    filename = "unknown",
    url = "https://cdn.discordapp.com/attachments/1068304660269641738/1144843403151020122/file.txt",
    bytes = 1
}) => {
    const colors = {
        header: resolveSemanticColor(ThemeStore.theme, semanticColors.HEADER_PRIMARY),
        sub: resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_MUTED),
        bgDark: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_SECONDARY_ALT),
        bgBright: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_SECONDARY),
        bgBrighter: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_ACCENT)
    }

    const buttonColors = {
        background: {
            active: colors.bgBrighter,
            inactive: colors.bgDark
        },
        border: {
            active: colors.bgBright,
            inactive: colors.bgDark,
        }
    }

    const Content: any = () => {
        const insets = SafeArea.useSafeAreaInsets();
        const [visibleModal, setVisibleModal] = React.useState<{ key: keyof typeof MODALS; props: { [key: string]: any } } | null>(null);
        const maxBytes = storage.chunkSize || 60928;
        const [state, setState] = React.useState({ content: "", loadedBytes: maxBytes, firstTime: true });

        const scrollViewRef = React.useRef(null);

        const [wordWrap, setWordWrap] = React.useState(false);
        const [monospace, setMonospace] = React.useState(true);

        const isLoading = state.content ? false : true;

        if (state.firstTime) {
            console.log('first time');
            fetch(url, {
                headers: {
                    'Range': `bytes=0-${maxBytes}`
                }
            }).then(r => {
                if (!r.ok) { // Network response was not ok
                    setState({ content: "", loadedBytes: 0, firstTime: false });
                } else {
                    r.text().then(text => {
                        setState({ content: text, loadedBytes: state.loadedBytes, firstTime: false });
                    });
                };
            });
        };

        const ModalComponent = visibleModal ? MODALS[visibleModal.key] : null;


        function onJumpToTop() {
            setVisibleModal(null);
            let scrollView: any = scrollViewRef.current;
            scrollView?.scrollTo?.({ y: 0, animated: true });
        }

        function onJumpToBottom() {
            setVisibleModal(null);
            let scrollView: any = scrollViewRef.current;
            scrollView?.scrollToEnd?.({ animated: true });
        }

        let pending = false;
        function onLoadMore() {
            if (pending) return;
            pending = true;
            fetch(url, {
                headers: {
                    'Range': `bytes=${state.loadedBytes + 1}-${state.loadedBytes + maxBytes}`
                }
            }).then(r => {
                if (!r.ok) {
                    pending = false;
                    showToast("Error: Network response was not ok", getAssetIDByName("ic_close_circle"));
                } else {
                    r.text().then(text => {
                        setState({ content: state.content + text, loadedBytes: state.loadedBytes + maxBytes, firstTime: false });
                    });
                };
            });
        }

        let lineIteration = 0;
        const [nl, setnl] = React.useState([]);

        if (isLoading) return (<Loading />);

        return (
            <View style={{ marginTop: 0 }}>
                <FCButtonBar>
                    <FCButton
                        onPress={() => setWordWrap(v => !v)}
                        active={wordWrap}
                        colors={buttonColors}
                        info={translations.TOGGLE_WORD_WRAP[i18n.getLocale()] ?? "Toggle Word Wrap"}
                        content={<WordWrapSvg color={wordWrap ? colors.header : colors.sub} />}
                    />
                    <FCButton
                        onPress={() => setMonospace(v => !v)}
                        active={monospace}
                        colors={buttonColors}
                        info={translations.MONOSPACE[i18n.getLocale()] ?? "Toggle Monospace Font"}
                        content={<MonospaceSvg color={monospace ? colors.header : colors.sub} />}
                    />
                    <FCButton
                        onPress={
                            () => setVisibleModal({
                                key: 'JUMP', props: {
                                    onJumpToTop,
                                    onJumpToBottom,
                                    onClose: () => setVisibleModal(null),
                                    textColor: colors.sub,
                                    buttonColor: colors.bgBright,
                                    texts: {
                                        JUMP: i18n.Messages.JUMP,
                                        JUMP_BOTTOM: translations.JUMP_BOTTOM[i18n.getLocale()] ?? "Jump to the bottom",
                                        JUMP_TOP: translations.JUMP_TOP[i18n.getLocale()] ?? "Jump to the top",
                                    }
                                }
                            })
                        }
                        active={false}
                        colors={buttonColors}
                        info={i18n.Messages.JUMP}
                        content={
                            <Image
                                source={getAssetIDByName("ic_reply_24px")}
                                style={{
                                    height: 24, width: 24,
                                    transform: [{ scaleX: -1 }, { rotate: '-90deg' }]
                                }}
                            />
                        }
                    />
                </FCButtonBar>
                <ScrollView ref={scrollViewRef} style={{ margin: 15, marginBottom: 50 + insets.bottom }}>
                    <ScrollView horizontal={!wordWrap}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4, backgroundColor: colors.bgDark, marginRight: 5, paddingRight: 2, paddingLeft: 2, alignSelf: 'flex-start' }}>
                                <Text style={{ textAlign: 'right', color: colors.sub, lineHeight: 20 }}>
                                    {nl.map((line) => line ? ++lineIteration : ' ').join('\n')}
                                </Text>
                            </View>
                            <Text selectable={true} style={[{ color: colors.header, lineHeight: 20, flex: 1 }, monospace && { fontFamily: constants.Fonts.CODE_SEMIBOLD }]} onTextLayout={(e) => {
                                let lines = e.nativeEvent.lines;
                                // Code below: For each line, if it's the first line or the line before has a line break return true,
                                // otherwise return false, this way I have an array of booleans which lets me know whether I should put
                                // a line number at a certain index
                                // TODO -- perhaps use a line height instead (like vscode i think) like {'12': 2} = line 12 indicator takes 2 lines
                                setnl(lines.map((_line, i) => i > 0 ? lines[i - 1].text.indexOf("\n") > -1 : true));
                            }}>{state.content}</Text>
                        </View>
                    </ScrollView>
                    {state.loadedBytes < bytes &&
                        <LoadMore
                            buttonColor={colors.bgBright}
                            buttonTextColor={colors.header}
                            textColor={colors.sub}
                            remainingText={`+ ${filesize(bytes - state.loadedBytes)} not loaded.`}
                            onPress={onLoadMore}
                        />
                    }
                </ScrollView>
                <Modal
                    transparent={true}
                    animationType="none"
                    visible={visibleModal != null}
                    onRequestClose={() => setVisibleModal(null)}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
                    }}>
                        <View style={{
                            backgroundColor: colors.bgBrighter,
                            padding: 20,
                            borderRadius: 10,
                            width: '90%',
                        }}>
                            {visibleModal != null && <ModalComponent {...visibleModal.props} />}
                        </View>
                    </View>
                </Modal>
            </View>
        )
    };

    return (
        <Navigator
            initialRouteName="FILE_CONTENT_PREVIEW"
            screens={{
                FILE_CONTENT_PREVIEW: {
                    headerLeft: closeButton(() => modals.popModal('file-content-preview')),
                    headerRight: () => (
                        <DownloadButton
                            url={url}
                            saveText={translations.FILE_SAVED[i18n.getLocale()] ?? "File saved"}
                            failText={translations.FILE_SAVE_ERROR[i18n.getLocale()] ?? "Error saving file"}
                            copyText={i18n.Messages.COPIED + " " + i18n.Messages.SEARCH_ANSWER_HAS_LINK} />
                    ),
                    render: () => <Content />,
                    headerTitle: () => <FCTitle filename={filename} subtext={filesize(bytes)} color={colors.header} />
                }
            }}
        />
    );
}
