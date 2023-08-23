import patchChat from "./patches/Chat";
import patchRM from "./patches/RowManager";

let patches = [];

export default {
    onLoad: () => {
        patches.push(patchChat());
        patches.push(patchRM());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    }
}