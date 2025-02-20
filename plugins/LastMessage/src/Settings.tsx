import { findByProps, findByStoreName } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { semanticColors } from "@vendetta/ui";
import { Forms } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";

const { FormSwitch, FormRow, FormIcon } = Forms;
const { ScrollView } = ReactNative;

const ThemeStore = findByStoreName("ThemeStore");
const {
    meta: { resolveSemanticColor },
} = findByProps("colors", "meta");

const Colors = {
    text: resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_NORMAL),
};

const humanize = findByProps("intword");

export default () => {
    useProxy(storage);

    const [everyone, setEveryone] = React.useState(storage.everyone);
    const [showWhenNone, shouldShowWhenNone] = React.useState(storage.everyone);
    function toggleEveryone() {
        storage.everyone = !storage.everyone;
        setEveryone(storage.everyone);
    }
    function toggleShowWhenNone() {
        storage.showWhenNone = !storage.showWhenNone;
        shouldShowWhenNone(storage.showWhenNone);
    }

    return (
        <ScrollView style={{ flex: 1, marginTop: 10 }}>
            <FormRow
                label="Log everyone"
                subLabel="Log every user instead of only friends. This might make the app slower and use more memory."
                leading={<FormIcon source={getAssetIDByName("ic_header_members_add_24px")} />}
                trailing={<FormSwitch value={everyone} onValueChange={toggleEveryone} />}
                onPress={toggleEveryone}
            />
            <FormRow
                label="Show when unknown"
                subLabel="Show the last message text when there is none logged."
                leading={<FormIcon source={getAssetIDByName("ic_text_in_voice_24px")} />}
                trailing={
                    <FormSwitch
                        value={showWhenNone}
                        onValueChange={() => {
                            toggleShowWhenNone;
                        }}
                    />
                }
                onPress={() => {
                    toggleShowWhenNone;
                }}
            />
        </ScrollView>
    );
};
