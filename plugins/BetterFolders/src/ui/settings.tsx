import { getAssetIDByName } from "@vendetta/ui/assets";
import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms } from "@vendetta/ui/components";
import { semanticColors } from "@vendetta/ui";
import { findByStoreName, findByProps } from "@vendetta/metro";
import Colonthree from "./Colonthree";
import updateFolderIcons from "../updateFolderIcons";
import { after } from "@vendetta/patcher";

const { FormSwitch, FormRow, FormIcon } = Forms;
const { ScrollView } = ReactNative;

const ThemeStore = findByStoreName("ThemeStore");
const {
    meta: { resolveSemanticColor },
} = findByProps("colors", "meta");

const Colors = {
    bgBrighter: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_ACCENT),
};

var shouldUpdate = true;

export default () => {
    useProxy(storage);

    const [autoCollapse, setAutoCollapse] = React.useState(storage.autoCollapse);
    const [hideIcons, setHideIcons] = React.useState(storage.hideIcons);

    function toggleAutoCollapse() {
        storage.autoCollapse = !storage.autoCollapse;
        setAutoCollapse(storage.autoCollapse);
    }

    function toggleHideIcons() {
        storage.hideIcons = !storage.hideIcons;
        // setTimeout(()=>updateFolderIcons(), 100);                                can't update the folder icons while in the settings screen
        if (shouldUpdate) {
            let unpatch = after(
                "useIsModalOpen",
                findByProps("useIsModalOpen"), // So instead ill call it once after the user gone to chat
                () => {
                    unpatch();
                    setTimeout(() => updateFolderIcons(), 100);
                    shouldUpdate = true;
                },
            );
            shouldUpdate = false;
        }
        setHideIcons(storage.hideIcons);
    }

    return (
        <ScrollView style={{ flex: 1, marginTop: 10 }}>
            <Colonthree
                onPress={toggleAutoCollapse}
                color={Colors.bgBrighter + "00"}
                pressedColor={Colors.bgBrighter + "FF"}
            >
                <FormRow
                    label="Auto collapse"
                    subLabel="Automatically collapse folders as you expand different ones."
                    leading={<FormIcon source={getAssetIDByName("ic_minus_circle_24px")} />}
                    trailing={<FormSwitch value={autoCollapse} onValueChange={toggleAutoCollapse} />}
                />
            </Colonthree>
            <Colonthree
                onPress={toggleHideIcons}
                color={Colors.bgBrighter + "00"}
                pressedColor={Colors.bgBrighter + "FF"}
            >
                <FormRow
                    label="Hide icons"
                    subLabel="Don't display server icons for collapsed folders."
                    leading={<FormIcon source={getAssetIDByName("ic_hide")} />}
                    trailing={<FormSwitch value={hideIcons} onValueChange={toggleHideIcons} />}
                />
            </Colonthree>
        </ScrollView>
    );
};
