import { ActionSheet, BottomSheetScrollView } from "./misc";
import { Forms } from "@vendetta/ui/components";

export default function PinDMActionSheet({ channelId }) {
    return (
        <ActionSheet>
            <BottomSheetScrollView>
                <Forms.FormText>{channelId}</Forms.FormText>
            </BottomSheetScrollView>
        </ActionSheet>
    )
}