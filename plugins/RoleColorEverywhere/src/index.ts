import patchTypingWrapper from "./patches/TypingWrapper";
import patchDCDChatManager from "./patches/DCDChatManager";
import patchVoiceUserConnected from "./patches/VoiceUserConnected";
import Settings from "./Settings";

let patches = [];

export default {
    onLoad: () => {
        patches.push(patchTypingWrapper());
        patches.push(patchDCDChatManager());
        patches.push(patchVoiceUserConnected());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings
}