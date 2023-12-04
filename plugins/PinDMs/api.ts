import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
const { fromTimestamp } = findByProps("extractTimestamp");

// TODO maybe add storage.collapsedPinnedDMs in the api
const PinDMsApi = {
    pin: (channelId, categoryId) => {
        const category = storage.pinnedDMs.findIndex(c => c.id === categoryId);
        storage.pinnedDMs[category].ids = [...storage.pinnedDMs[category].ids, channelId];
    },
    unpin: (channelId) => {
        const category = storage.pinnedDMs.findIndex(c => c.ids.includes(channelId));
        storage.pinnedDMs[category] = { ...storage.pinnedDMs[category], ids: storage.pinnedDMs[category].ids.filter(id => id != channelId) };
    },
    isPinned: (channelId) => {
        return storage.pinnedDMs.some(dm => dm.ids.includes(channelId));
    },
    getPinnedDMs: () => storage.pinnedDMs,
    createCategory: (name) => {
        storage.pinnedDMs.push({
            ids: [],
            id: fromTimestamp(+Date.now()), // Generate random snowflake for category ID
            name
        })
    },
    deleteCategory: (id) => {
        storage.pinnedDMs = storage.pinnedDMs.filter(category => category.id != id);
    }
};

export default PinDMsApi;