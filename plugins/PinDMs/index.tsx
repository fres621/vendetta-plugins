import { storage } from "@vendetta/plugin";
import patchPrivateChannels from "./patches/PrivateChannels";
import patchActionSheet from "./patches/ActionSheet";
import PinDMsApi from "./api";
import { PinnedDMsCategory } from "./types";

let patches = [];

export default {
    onLoad: () => {
        storage.pinnedDMs ??= [
            { // Temporary default one so I can check it works so far
                id: "default",
                name: "Pinned DMs",
                ids: []
            }
        ] as PinnedDMsCategory[];
        storage.collapsedPinnedDMs ??= [];
        patches.push(patchPrivateChannels());
        patches.push(patchActionSheet());
        // Temporary, proper Settings will be added later on
        Object.defineProperty(window, "PinDMsDevApi", {
            configurable: true,
            value: PinDMsApi
        });
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
            delete window["PinDMsDevApi"];
        };
    }
}
