import { i18n, stylesheet } from "@vendetta/metro/common";
import { Button, General, Forms, HelpMessage as _HelpMessage } from "@vendetta/ui/components";
import { semanticColors } from "@vendetta/ui";
import { Alert } from "@util/alerts";
import { use } from "../translations";

const { View } = General;

const styles = stylesheet.createThemedStyleSheet({
    text: {
        color: semanticColors.TEXT_PRIMARY,
    }
})

export function beforeStartCall(startCall: (silent: boolean) => void, hasVideo: boolean) {
    Alert.show({
        title: hasVideo ? i18n.Messages.START_VIDEO_CALL : i18n.Messages.START_CALL,
        isDismissable: true,
        children: [
            <Forms.FormText style={{ paddingVertical: 12, color: styles.text.color }}>{use.STARTING_CALL}</Forms.FormText>,
            <View
                style={{ gap: 8 }}
            >
                <Button
                    text={i18n.Messages.CALL}
                    color="brand"
                    look={Button.Looks.FILLED}
                    onPress={() => { Alert.close(); startCall(false) }}
                />
                <Button
                    text={use.SILENT_CALL}
                    color="brand"
                    look={Button.Looks.FILLED}
                    onPress={() => { Alert.close(); startCall(true) }}
                />
                <Button
                    text={i18n.Messages.CANCEL}
                    color={Button.Colors["TRANSPARENT"]}
                    look={Button.Looks.FILLED}
                    onPress={() => Alert.close()}
                />
            </View>
        ],
        noDefaultButtons: true,
    });
}