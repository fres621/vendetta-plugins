import { find, findByProps } from "@vendetta/metro";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";

export const { ClearButtonVisibility, default: InputView } = findByProps("ClearButtonVisibility");
export const { TextStyleSheet, Text } = findByProps('TextStyleSheet');
export const LazyActionSheet = findByProps("openLazy", "hideActionSheet");
export const ActionSheet = findByProps("ActionSheet")?.ActionSheet ?? find((x) => x.render?.name === "ActionSheet");
export const { BottomSheetScrollView, BottomSheetFlatList } = findByProps("BottomSheetScrollView");
export const {
    ActionSheetTitleHeader,
    ActionSheetCloseButton,
    ActionSheetRow
} = findByProps("ActionSheetTitleHeader");

// hug https://github.com/aeongdesu/vdplugins/blob/cac02834c69663d76b713db3a325366c4a337702/plugins/Dislate/src/patches/ActionSheet.tsx#L15
export const Row = ActionSheetRow ?? Forms.FormRow;

// https://discord.com/channels/1015931589865246730/1062531774187573308/1117197626648039494
export function renderActionSheet(component: any, props: { [key: string]: any }) {
    ActionSheet
        ? LazyActionSheet?.openLazy(new Promise(r => r({ default: component })), "ActionSheet", props)
        : showToast("You cannot open ActionSheets on this version! Upgrade to 163+");
};