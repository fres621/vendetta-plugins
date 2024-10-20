import { find, findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

import { semanticColors } from "@vendetta/ui";
import { showToast } from "@vendetta/ui/toasts";
const ThemeStore = findByStoreName("ThemeStore");
const {
    meta: { resolveSemanticColor },
} = findByProps("colors", "meta");

const ActionSheet = findByProps("ActionSheet")?.ActionSheet ?? find((x) => x.render?.name === "ActionSheet");
const LazyActionSheet = findByProps("openLazy", "hideActionSheet");

// https://discord.com/channels/1015931589865246730/1062531774187573308/1117197626648039494
function renderActionSheet(component: any, props: { [key: string]: any }) {
    ActionSheet
        ? LazyActionSheet?.openLazy(new Promise((r) => r({ default: component })), "ActionSheet", props)
        : showToast("You cannot open ActionSheets on this version! Upgrade to 163+");
}
const { BottomSheetScrollView } = findByProps("BottomSheetScrollView");

let isList = (type) => type === "playlist" || type === "album";

const WebView = findByName("WebView") || findByProps("WebView").default.render;
let wv = (link, type) => {
    const bgcolor = resolveSemanticColor(ThemeStore.theme, semanticColors.MODAL_BACKGROUND);
    return (
        <WebView
            source={{ uri: link }}
            style={{ marginTop: 20, backgroundColor: bgcolor, height: isList(type) ? 352 : 152, width: "100%" }}
            nestedScrollEnabled={isList(type)}
        />
    );
};

function as({ "0": link, "1": pageType }) {
    return (
        <ActionSheet>
            <BottomSheetScrollView contentContainerStyle={{ marginBottom: 100 }}>
                {wv(link.replace("https://open.spotify.com", "https://open.spotify.com/embed"), pageType)}
            </BottomSheetScrollView>
        </ActionSheet>
    );
}

const handleClick = findByProps("handleClick");

export default function patch() {
    return before("handleClick", handleClick, function ([args]) {
        const { href } = args;
        const isSpotify = href.startsWith("https://open.spotify.com/");
        if (!isSpotify) return;

        let type = href.split("/")[3];
        if (!["track", "playlist", "episode", "album"].includes(type)) return; // Unsupported page

        args.href = undefined;
        renderActionSheet(as, [href, type]);
    });
}
