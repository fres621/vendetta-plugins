import patchTypingWrapper from "./patches/TypingWrapper";
import Settings from "./Settings";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

let patches = [];

export default {
    onLoad: () => {
        console.log("ON LOAD WORKS");
        if (!storage.show) { // Set default config values
            useProxy(storage);
            storage.show = {showTyping: true}
        };
        patches.push(patchTypingWrapper());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings
}