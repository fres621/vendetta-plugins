import { after } from "@vendetta/patcher";
import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { semanticColors } from "@vendetta/ui";

const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

export default function patchVoiceUserConnected() {
    return () => { };
    return after("default", findByName("VoiceUserConnected", false),([args],res)=>{
        if (storage.noVoice) return;
        const unpatchRender = after("render", res.type.prototype, (a, res) => {
            unpatchRender();
            let text = (res.props?.children?.[1]?.props);
            if (!text) return;
            text.style.color = args?.member?.colorString || resolveSemanticColor(ThemeStore.theme, semanticColors.CHANNELS_DEFAULT);
        });
    });
};