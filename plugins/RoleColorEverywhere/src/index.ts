import patchTypingWrapper from "./patches/TypingWrapper";
import patchDCDChatManager from "./patches/DCDChatManager";
import Settings from "./Settings";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

let patches = [];

export default {
    onLoad: () => {
        useProxy(storage);
        storage.chatInterpolation ??= 0;
        patches.push(patchTypingWrapper());
        patches.push(patchDCDChatManager());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings
}