import Settings from "./Settings";
let patches = [];
let oldVals: any = {};

export default {
    onLoad: () => {
        patches.push(function() {console.log("uwu")});
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings
}