import { findByName, findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { findInReactTree } from "@vendetta/utils";
import PinDMActionSheet from "../components/PinDMActionSheet";
import { renderActionSheet } from "../components/misc";

// hug https://github.com/aeongdesu/vdplugins/blob/cac02834c69663d76b713db3a325366c4a337702/plugins/Dislate/src/patches/ActionSheet.tsx#L15
const ActionSheetRow = findByProps("ActionSheetRow")?.ActionSheetRow ?? Forms.FormRow;
const PinIcon = getAssetIDByName("icon-pins");

export default function patch() {
    return after("default", findByName("ChannelLongPressActionSheet", false), ([props], b) => {
        after("type", b, (_, d) => {
            const buttons = findInReactTree(d, e => e.key === "dm")?.props?.children;
            if (!buttons) return;
            buttons.push((
                <ActionSheetRow
                    label={`Pin DM`}
                    icon={
                        <ActionSheetRow.Icon
                            source={PinIcon}
                            IconComponent={() => (
                                <Forms.FormIcon source={PinIcon} />
                            )}
                        />
                    }
                    onPress={() => renderActionSheet(PinDMActionSheet, { channelId: props.channelId })}
                />
            ));

        })

    });
};