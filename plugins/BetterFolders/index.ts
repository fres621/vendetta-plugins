import { storage } from "@vendetta/plugin";
import patchIcons from "./patches/guildIcon";
import patchCollapse from "./patches/autoCollapse";
import Settings from "./ui/settings";

let patches = [];

export default {
    onLoad: () => {
        storage.hideIcons ??= false;
        storage.autoCollapse ??= false;
        patches.push(patchIcons());
        patches.push(patchCollapse());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        }
    },
    settings: Settings,
};
