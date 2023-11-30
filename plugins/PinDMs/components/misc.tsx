import { find, findByProps } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";

export const LazyActionSheet = findByProps("openLazy", "hideActionSheet");
export const ActionSheet = findByProps("ActionSheet")?.ActionSheet ?? find((x) => x.render?.name === "ActionSheet");
export const { BottomSheetScrollView } = findByProps("BottomSheetScrollView");

// https://discord.com/channels/1015931589865246730/1062531774187573308/1117197626648039494
export function renderActionSheet(component: any, props: { [key: string]: any }) {
    ActionSheet
        ? LazyActionSheet?.openLazy(new Promise(r => r({ default: component })), "ActionSheet", props)
        : showToast("You cannot open ActionSheets on this version! Upgrade to 163+");
};