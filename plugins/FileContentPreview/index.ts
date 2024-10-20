import patchChat from "./patches/Chat";
import patchRM from "./patches/RowManager";
import Settings from "./Settings";

let patches = [];

export default {
    onLoad: () => {
        patches.push(patchChat());
        patches.push(patchRM());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        }
    },
    settings: Settings,
};
