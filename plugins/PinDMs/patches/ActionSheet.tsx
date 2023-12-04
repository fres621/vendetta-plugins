import { findByName, findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { findInReactTree } from "@vendetta/utils";
import PinDMActionSheet from "../components/PinDMActionSheet";
import { Row, renderActionSheet } from "../components/misc";

const PinIcon = getAssetIDByName("icon-pins");

export default function patch() {
    return after("default", findByName("ChannelLongPressActionSheet", false), ([props], b) => {
        after("type", b, (_, d) => {
            const buttons = findInReactTree(d, e => e.key === "dm")?.props?.children;
            if (!buttons) return;
            buttons.push((
                <Row
                    label="Pin DM"
                    icon={
                        <Row.Icon
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