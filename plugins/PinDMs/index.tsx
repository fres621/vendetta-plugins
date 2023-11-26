import { storage } from "@vendetta/plugin";
import patch from "./patches/PrivateChannels";

const PinDMsDevApi = {
    pin: (channelId) => {
        storage.pinnedDMs.push(channelId);
    },
    unpin: (channelId) => {
        storage.pinnedDMs = storage.pinnedDMs.filter(e => e != channelId);
    },
    getPinnedDMs: () => storage.pinnedDMs
};

let patches = [];

export default {
    onLoad: () => {
        storage.pinnedDMs ??= [];
        patches.push(patch());
        // Temporary, proper Settings will be added later on
        Object.defineProperty(window, "PinDMsDevApi", {
            configurable: true,
            value: PinDMsDevApi
        });
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
            delete window["PinDMsDevApi"];
        };
    }
}
