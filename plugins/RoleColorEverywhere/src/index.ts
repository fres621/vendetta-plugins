import patchTypingWrapper from "./patches/TypingWrapper";
import patchDCDChatManager from "./patches/DCDChatManager";
import Settings from "./Settings";
import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';

let patches = [];

export default {
    onLoad: () => {
        console.log("first log");
        useProxy(storage);
        console.log("second");
        storage.chatInterpolation ??= 0;
        console.log("third");
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