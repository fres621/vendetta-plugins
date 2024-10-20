import { React, clipboard, i18n } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { General } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

const { Text, TouchableOpacity } = General;

export const FCTitle: any = ({ filename, color, subtext }) => (
    <TouchableOpacity
        onPress={() => {
            clipboard.setString(filename);
            showToast(i18n.Messages.COPIED_TEXT, getAssetIDByName("toast_copy_message"));
        }}
    >
        <Text numberOfLines={1} style={{ color }}>
            {filename}
        </Text>
        <Text numberOfLines={1} style={{ color, fontSize: 12 }}>
            {subtext}
        </Text>
    </TouchableOpacity>
);
