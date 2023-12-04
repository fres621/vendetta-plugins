import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { React, ReactNative, i18n } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui"
import { Button, General } from "@vendetta/ui/components";
import PinDMsApi from "../api";
import { ClearButtonVisibility, InputView, Text } from "./misc";

const { View } = General;

const ThemeStore = findByStoreName("ThemeStore");
const ConnectedKeyboardAwareView = findByName("ConnectedKeyboardAwareView");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");
const { useOrientationSettling } = findByProps("useOrientation");
const modals = findByProps('pushModal');

export function openNewCategoryModal({ onExit }) {
    modals.pushModal({
        key: 'pin-dms-new',
        modal: {
            key: 'pin-dms-new',
            modal: PinDMNewModal,
            animation: 'slide-up',
            props: { onExit },
            shouldPersistUnderModals: false,
            closable: true
        }
    });
}

export default function PinDMNewModal({ onExit }) {
    // useOrientation() can go off before the window width is updated, this issue doesn't happen with useOrientationSettling;
    useOrientationSettling();
    const windowWidth = ReactNative.Dimensions?.get("window").width;
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");

    function close() {
        modals.popModal('pin-dms-new');
        onExit();
    }

    function onSave() {
        if (!name.length || PinDMsApi.getPinnedDMs().find(category => category.name === name))
            return setError("Invalid category name.");
        PinDMsApi.createCategory(name);
        close();
    }

    function onChangeText(value) {
        setName(value);
        if (error.length) setError("");
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#000000b3",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <ConnectedKeyboardAwareView>
                <View
                    style={
                        {
                            borderRadius: 8,
                            padding: 16,
                            backgroundColor: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_PRIMARY),
                            width: windowWidth * 0.9
                        }
                    }
                >
                    <Text variant="heading-lg/extrabold" style={{ textAlign: "center" }}>{i18n.Messages.CATEGORY_NAME_PLACEHOLDER}</Text>
                    <InputView
                        value=""
                        error={error}
                        onChangeText={onChangeText}
                        placeholder={i18n.Messages.CATEGORY_NAME}
                        inputTextColor={resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_NORMAL)}
                        placeholderTextColor={resolveSemanticColor(ThemeStore.theme, semanticColors.INPUT_PLACEHOLDER_TEXT)}
                        clearButtonVisibility={ClearButtonVisibility.NEVER}
                        showBorder={true}
                        showTopContainer={true}
                        disabled={false}
                        autoFocus={true}
                        numberOfLines={1}
                        returnKeyType="done"
                        style={{ paddingHorizontal: 8, paddingVertical: 0 }}
                    />
                    <View
                        style={{ marginTop: 24 }}
                    >
                        <Button
                            text={"Save"}
                            color="brand"
                            look={Button.Looks.FILLED}
                            onPress={onSave}
                        />
                        <Button
                            text={"Cancel"}
                            look={Button.Looks.OUTLINED}
                            style={{ marginTop: 8 }}
                            onPress={close}
                        />
                    </View>
                </View>
            </ConnectedKeyboardAwareView>
        </View>
    )
}