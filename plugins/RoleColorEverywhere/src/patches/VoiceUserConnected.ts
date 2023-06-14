import { after } from "@vendetta/patcher";
import { findByName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";

export default function patchVoiceUserConnected() {
    return after("default", findByName("VoiceUserConnected", false),([args],res)=>{
        if (storage.noVoice) return;
        if (!args?.member?.colorString) return;
        const unpatchRender = after("render", res.type.prototype, (a, res) => {
            unpatchRender();
            let text = (res.props?.children?.[1]?.props);
            if (!text) return;
            text.style.color = args.member.colorString;
        });
    });
};