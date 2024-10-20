import patchRows from "./patches/Rows";
import patchLinks from "./patches/Link";
import tick from "./patches/Tick";

let patches = [];

export default {
    onLoad: () => {
        patches.push(patchRows());
        patches.push(patchLinks());
        patches.push(tick());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        }
    },
};
