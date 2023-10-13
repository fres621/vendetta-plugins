import { storage } from "@vendetta/plugin";
import patch from "./patches/patch";
import Settings from "./Settings";

let patches = [];

export default {
    onLoad: () => {
        storage.everyone ??= false;
        storage.showWhenNone ??= false;
        patches.push(patch());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings
}