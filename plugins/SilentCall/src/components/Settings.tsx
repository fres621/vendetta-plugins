import { React, stylesheet } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";
import { semanticColors } from "@vendetta/ui";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { ViewChangelogMessage } from "@util/changelog";
import { plugin, changelog } from "../meta";
import { PatchErrorMessage } from "@util/bugReporter";

const { View } = General;
const styles = stylesheet.createThemedStyleSheet({
    title: {
        color: semanticColors.TEXT_PRIMARY,
        fontSize: 18,
        textAlign: "center",
    },
    sub: {
        color: semanticColors.TEXT_MUTED,
        fontSize: 14,
        textAlign: "center",
    },
});

export default function Settings() {
    return (
        <View style={{ margin: 12, gap: 12, flex: 1, justifyContent: "space-around" }}>
            <View style={{ gap: 12, alignItems: "center" }}>
                <Forms.FormIcon source={getAssetIDByName("ic_notif_off")} style={{ height: 48, width: 48 }} />
                <Forms.FormText style={styles.title}>{plugin.name} is running!</Forms.FormText>
                <Forms.FormText style={styles.sub}>{plugin.version}</Forms.FormText>
            </View>
            <Forms.FormSection title="Info...">
                <View style={{ gap: 8 }}>
                    <ViewChangelogMessage changelog={changelog} />
                    <PatchErrorMessage pluginName={plugin.name} pluginVersion={plugin.version} error={false} />
                </View>
            </Forms.FormSection>
        </View>
    );
}
