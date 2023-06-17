import { find, findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

import { semanticColors } from "@vendetta/ui";
import { showToast } from "@vendetta/ui/toasts";
const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

const { default: { render: ActionSheet } } = (find(x => x.default?.render?.name == "ActionSheet") ?? { default: { render: false } });
const LazyActionSheet = findByProps("openLazy", "hideActionSheet");

// https://discord.com/channels/1015931589865246730/1062531774187573308/1117197626648039494
function renderActionSheet(component: any, props: { [key: string]: any }) {
  ActionSheet
    ? LazyActionSheet?.openLazy(new Promise(r => r({ default: component })), "ActionSheet", props)
    : showToast("You cannot open ActionSheets on this version! Upgrade to 163+");
};
const { BottomSheetScrollView } = findByProps("BottomSheetScrollView");

let WebView = findByName("WebView");
let wv = (link)=>{ 
    const bgcolor = resolveSemanticColor(ThemeStore.theme, semanticColors.MODAL_BACKGROUND);
    return (
        <WebView
          source={{ uri: link }}
          style={{ marginTop: 20, backgroundColor: bgcolor, height: 100, width: "100%" }}
        />
      );
};

function as({'0': link}) {
    return (
        <ActionSheet>
            <BottomSheetScrollView contentContainerStyle={{ marginBottom: 100 }}>
            {wv(link.replace('https://open.spotify.com', 'https://open.spotify.com/embed'))}
            </BottomSheetScrollView>
        </ActionSheet>
        );
}

const handleClick = findByProps("handleClick");

export default function patch() {
    return instead("handleClick", handleClick, async function (this: any, args, orig) {
        const { href: url } = args[0];

        const isSpotify = url.startsWith("https://open.spotify.com/");
        if (!isSpotify) return orig.apply(this, args);
      
		renderActionSheet(as, [url]);
    })
};