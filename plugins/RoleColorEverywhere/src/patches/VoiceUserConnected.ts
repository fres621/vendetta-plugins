import { after } from "@vendetta/patcher";
import { find, findByName, findByStoreName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { semanticColors } from "@vendetta/ui";

const ThemeStore = findByStoreName("ThemeStore");
const resolveSemanticColor = find(m => m.default?.internal?.resolveSemanticColor)?.default.internal.resolveSemanticColor
    ?? find(m => m.meta?.resolveSemanticColor)?.meta.resolveSemanticColor ?? (() => {});

export default function patchVoiceUserConnected() {
    return after("default", findByName("VoiceUserConnected", false),([args],res)=>{
        if (storage.noVoice) return;

        try {
            let p = res.type.prototype ? ["render", res.type.prototype] : ["type", res.type];
            const unpatchRender = after(p[0], p[1], (a, res) => {
                unpatchRender();
                let text = (res.props?.children?.[1]?.props);
                if (!text) return;
                text.style.color = args?.member?.colorString || resolveSemanticColor(ThemeStore.theme, semanticColors.CHANNELS_DEFAULT);
            });
        } catch { };
    });
};
