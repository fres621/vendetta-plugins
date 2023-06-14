import patchTypingWrapper from "./patches/TypingWrapper";
import patchDCDChatManager from "./patches/DCDChatManager";
import Settings from "./Settings";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

let patches = [];

export default {
    onLoad: () => {
        console.log("s0");

        console.log("s1");

        console.log("s2");
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