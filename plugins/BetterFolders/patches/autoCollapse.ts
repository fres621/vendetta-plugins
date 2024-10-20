import { storage } from "@vendetta/plugin";
import { findByStoreName } from "@vendetta/metro";
import { FluxDispatcher } from "@vendetta/metro/common";

const { getGuildFolders } = findByStoreName("UserSettingsProtoStore");
const { isFolderExpanded } = findByStoreName("ExpandedGuildFolderStore");

export default function () {
    let fn = ({ folderId: thisId }) => {
        if (!storage.autoCollapse) return;
        if (!isFolderExpanded(thisId)) return;
        getGuildFolders()
            .filter((f) => f.folderId && isFolderExpanded(f.folderId))
            .forEach(({ folderId }) => {
                if (folderId === thisId) return;
                FluxDispatcher.dispatch({ type: "TOGGLE_GUILD_FOLDER_EXPAND", folderId });
            });
    };

    FluxDispatcher.subscribe("TOGGLE_GUILD_FOLDER_EXPAND", fn);
    return () => FluxDispatcher.unsubscribe("TOGGLE_GUILD_FOLDER_EXPAND", fn);
}
