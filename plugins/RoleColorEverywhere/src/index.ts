import patchTypingWrapper from "./patches/TypingWrapper";
import patchDCDChatManager from "./patches/DCDChatManager";
import Settings from "./Settings";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';

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