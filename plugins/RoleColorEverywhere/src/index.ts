import patchTypingWrapper from "./patches/TypingWrapper";
import Settings from "./Settings";

let patches = [];

export default {
    onLoad: () => {
        patches.push(patchTypingWrapper());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings
}