import patchTypingWrapper from "./patches/TypingWrapper";
import Settings from "./Settings";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

let patches = [];

export default {
    onLoad: () => {
        console.log("ON LOAD WORKS");
        if (!storage.show) { // Set default config values
            console.log("CP inside 1")
            console.log(useProxy(storage));
            console.log("it's here");
            console.log(storage);
            storage.show = {showTyping: true}
            console.log("CP inside 2")
        };
        console.log("CP 1")
        patches.push(patchTypingWrapper());
        console.log("CP 2")
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings
}