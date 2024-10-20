import patch from "./patches/Search";
let patches = [];

export default {
    onLoad: () => {
        patches.push(patch());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        }
    },
};
