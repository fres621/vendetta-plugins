/// <reference path="D:/uwu/Desktop/432/vendetta-plugins/node_modules/vendetta-types/defs.d.ts" />

import { findByProps, findByStoreName } from "@vendetta/metro";
import { React, constants, i18n, stylesheet } from "@vendetta/metro/common";
import { Button as _Button, Forms, General, HelpMessage as _HelpMessage } from "@vendetta/ui/components";
import { semanticColors } from "@vendetta/ui";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { ActionSheet, ClearButtonVisibility, InputView, renderActionSheet, LazyActionSheet } from "@util/actionSheets";
import { showToast } from "@vendetta/ui/toasts";
import { getDebugInfo } from "@vendetta/debug";
import { use as strings } from "./translations";

const HelpMessage = _HelpMessage as typeof _HelpMessage & any;
const { View, Pressable } = General;
const { FormText } = Forms;
const {
    ActionSheetTitleHeader,
    ActionSheetRow,
    ActionSheetSwitchRow,
    BottomSheetTextInput,
    Button: NewButton,
} = findByProps("ActionSheetTitleHeader");
const build = Number((getDebugInfo() as any).discord.build);
const Row = build < 228000 ? Forms.FormRow : ActionSheetRow;
const SwitchRow = ActionSheetSwitchRow ?? Forms.FormSwitchRow;
const Input = BottomSheetTextInput ?? InputView;
const Button = (NewButton ?? _Button) as typeof _Button & any;

const styles = stylesheet.createThemedStyleSheet({
    title: {
        fontSize: 20,
        textAlign: "center",
        marginVertical: 6,
        fontFamily: constants.Fonts.DISPLAY_BOLD,
    },
    subtext: {
        fontSize: 12,
        marginBottom: 6,
        textAlign: "center",
        color: semanticColors.TEXT_MUTED,
    },
    input: {
        color: semanticColors.TEXT_NORMAL,
    },
    placeholder: {
        color: semanticColors.INPUT_PLACEHOLDER_TEXT,
    },
});

const UserStore = findByStoreName("UserStore");

function Report({ pluginName, pluginVersion }) {
    const [note, setNote] = React.useState("");
    const [sendID, setSendID] = React.useState(true);
    const [sendVer, setSendVer] = React.useState(true);
    // const [sendLogs, setSendLogs] = React.useState(true);

    async function onSubmit() {
        const debugInfo = getDebugInfo();
        const data = {
            pluginName,
            pluginVersion,
            ...(sendID && { id: UserStore.getCurrentUser().id }),
            ...(sendVer && { debug: JSON.stringify(debugInfo, null, 4) }),
            ...(note && { note }),
        };
        const res = await fetch("https://bug-reporter.mypawsaresmall.workers.dev/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "content-type": "application/json" },
        });
        if (res.ok) {
            showToast(strings.REPORT_SEND_SUCCESS, getAssetIDByName("Check"));
        } else {
            showToast(strings.REPORT_SEND_FAILURE, getAssetIDByName("ic_close_circle"));
        }
        LazyActionSheet.hideActionSheet();
    }
    return (
        <ActionSheet>
            <View>
                <ActionSheetTitleHeader title={i18n.Messages.SUBMIT_BUG} />
                <FormText style={styles.subtext}>{strings.SELECT_DATA}</FormText>
                <ActionSheetRow.Group>
                    <SwitchRow
                        label={strings.SEND_ID_TITLE}
                        subLabel={strings.SEND_ID_SUBTITLE}
                        value={sendID}
                        onValueChange={setSendID}
                    />
                    <SwitchRow
                        label={strings.SEND_DEBUG_TITLE}
                        subLabel={strings.SEND_DEBUG_SUBTITLE}
                        value={sendVer}
                        onValueChange={setSendVer}
                    />
                    {/*<SwitchRow label="Send error logs" subLabel="Send the logs gathered from the error" value={sendLogs} onValueChange={setSendLogs} />*/}
                    <Row
                        label={
                            <Input
                                value={note}
                                onChangeText={setNote}
                                placeholder={strings.ADD_CONTEXT}
                                inputTextColor={styles.input.color}
                                placeholderTextColor={styles.placeholder.color}
                                clearButtonVisibility={ClearButtonVisibility.NEVER}
                                showBorder={true}
                                showTopContainer={true}
                                disabled={false}
                                autoFocus={true}
                                numberOfLines={1}
                                returnKeyType="done"
                                maxLength={48}
                                style={{ paddingHorizontal: 8, paddingVertical: 0 }}
                            />
                        }
                    />
                </ActionSheetRow.Group>
                <View style={{ marginTop: 24 }}>
                    <Button
                        text={i18n.Messages.SUBMIT_BUG}
                        color="brand"
                        look={_Button.Looks.FILLED}
                        onPress={onSubmit}
                    />
                </View>
            </View>
        </ActionSheet>
    );
}

export function PatchErrorMessage({ pluginName, pluginVersion, error }) {
    const ripple = {
        color: "rgba(0, 0, 0, 0.25)",
        foreground: true,
        borderless: false,
    };
    function onPress() {
        renderActionSheet(Report, { pluginName, pluginVersion });
    }

    return (
        <>
            <Pressable onPress={onPress} android_ripple={ripple}>
                <HelpMessage messageType={0}>{error ? strings.PATCH_ERROR : strings.NO_ERRORS}</HelpMessage>
            </Pressable>
        </>
    );
}
