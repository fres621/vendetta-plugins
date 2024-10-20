import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { PinnedDMsCategory } from "./types";
const { fromTimestamp } = findByProps("extractTimestamp");

// TODO maybe add storage.collapsedPinnedDMs in the api
const PinDMsApi = {
    pin: (channelId: string, categoryId: string): void => {
        // v Not sure if it's a good idea to add the appropiate restrictions here instead of before calling these functions (?)
        if (PinDMsApi.isPinned(channelId)) return;
        const category = storage.pinnedDMs.findIndex((c) => c.id === categoryId);
        storage.pinnedDMs[category].ids = [...storage.pinnedDMs[category].ids, channelId];
    },
    unpin: (channelId: string): void => {
        const category = storage.pinnedDMs.findIndex((c) => c.ids.includes(channelId));
        storage.pinnedDMs[category] = {
            ...storage.pinnedDMs[category],
            ids: storage.pinnedDMs[category].ids.filter((id) => id != channelId),
        };
    },
    isPinned: (channelId: string): boolean => {
        return storage.pinnedDMs.some((dm) => dm.ids.includes(channelId));
    },
    getPinnedDMs: (): PinnedDMsCategory[] => storage.pinnedDMs,
    createCategory: (name: string): void => {
        storage.pinnedDMs.push({
            ids: [],
            id: fromTimestamp(+Date.now()), // Generate snowflake for category ID
            name,
        });
    },
    deleteCategory: (id: string): void => {
        storage.pinnedDMs = storage.pinnedDMs.filter((category) => category.id != id);
    },
};

export default PinDMsApi;
