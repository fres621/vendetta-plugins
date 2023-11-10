import { findByStoreName } from "@vendetta/metro";
import { FluxDispatcher } from "@vendetta/metro/common";

const { getGuildFolders } = findByStoreName("UserSettingsProtoStore");
const { isFolderExpanded } = findByStoreName("ExpandedGuildFolderStore");

export default function updateFolderIcons() {
    getGuildFolders().filter(f=>f.folderId && !isFolderExpanded(f.folderId)).forEach(({ folderId }) => {
        FluxDispatcher.dispatch({ type: 'TOGGLE_GUILD_FOLDER_EXPAND', folderId });
        FluxDispatcher.dispatch({ type: 'TOGGLE_GUILD_FOLDER_EXPAND', folderId });
    });
};