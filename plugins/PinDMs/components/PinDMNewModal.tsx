import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui"
import { Forms, General } from "@vendetta/ui/components";

const { View } = General;

const ThemeStore = findByStoreName("ThemeStore");
const ConnectedKeyboardAwareView = findByName("ConnectedKeyboardAwareView");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");
const { useOrientationSettling } = findByProps("useOrientation");
const modals = findByProps('pushModal');

export function openNewCategoryModal() {
    modals.pushModal({
        key: 'pin-dms-new',
        modal: {
            key: 'pin-dms-new',
            modal: PinDMNewModal,
            animation: 'slide-up',
            // props: {},
            shouldPersistUnderModals: false,
            closable: true
        }
    });
}

export default function PinDMNewModal() {
    // useOrientation() can go off before the window width is updated, this issue doesn't happen with useOrientationSettling
    useOrientationSettling();
    const windowWidth = ReactNative.Dimensions?.get("window").width;

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
                            backgroundColor: resolveSemanticColor(ThemeStore.theme, semanticColors.BACKGROUND_ACCENT),
                            width: windowWidth * 0.9
                        }
                    }
                >
                    <Forms.FormTitle title="aaaaaa" />
                </View>
            </ConnectedKeyboardAwareView>
        </View>
    )
}