import { storage } from "@vendetta/plugin";
import patch from "./patches/PrivateChannels";

let patches = [];

export default {
    onLoad: () => {
        storage.pinnedDMs ??= [];
        patches.push(patch());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    }
}
