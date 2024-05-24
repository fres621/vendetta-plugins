import { findByProps } from "@vendetta/metro";
import { ViewStyle } from "react-native";

type ButtonColor = "brand" | "red" | "green" | "primary" | "transparent" | "grey" | "lightgrey" | "white" | "link";

interface _AlertProps {
    title: string | JSX.Element,
    body: string | JSX.Element,
    /** Takes a ButtonColor. If unset it will use `ButtonColors.BRAND` */
    confirmColor: ButtonColor,
    /** If unset will use `i18n.Messages.OKAY` */
    confirmText: string,
    /** If unset there won't be a secondary Confirm button. This is shown at the bottom of the alert */
    secondaryConfirmText: string,
    /** If unset there won't be a Cancel button */
    cancelText: string,
    /** It's called **before** onClose */
    onCancel: () => any,
    /** If set, overrides the original onClose, which means you must call `Alert.close()` manually in order for the alert to be closable.
     * Will be called any time the alert would normally close. */
    onClose: () => any,
    /** It's called **after** onClose upon the user tapping the Confirm button */
    onConfirm: () => any,
    /** It's called **after** onClose upon the user tapping the secondary Confirm button */
    onConfirmSecondary: () => any,
    /** If set will be at the left of the Confirm button. */
    renderConfirmLeftIcon: () => JSX.Element,
    /** If set will be at the right of the Confirm button. */
    renderConfirmRightIcon: () => JSX.Element,
    /** If true, the Confirm button will be greyed out and the user will be unable to interact with it. */
    isConfirmButtonDisabled: boolean,
    /** Defaults to true, if false then pressing the Confirm button will not close the alert. */
    autoCloseOnConfirm: boolean,
    /** If true then there won't be a Confirm nor a Cancel button. */
    noDefaultButtons: boolean,
    /** I don't notice any difference depending on whether or not this is unset, true or false. */
    fillCancelText: boolean,
    /** If true, tapping the background will close the alert. It will not call onClose. */
    isDismissable: boolean,
    /** Defaults to true, if false then the current ActionSheet won't be hidden upon opening the alert.
     * Note that the ActionSheet will be above the alert if this is set to false. */
    hideActionSheet: boolean,
    style: ViewStyle,
    /** If set, will replace the `body` property, except it will not be wrapped in a \<Text> component in case it's a string. */
    children: JSX.Element | JSX.Element[],
    /** If set it will be shown at the bottom of the Alert. */
    footer: JSX.Element,
};
export type AlertProps = Partial<_AlertProps>;

export interface AlertModule {
    /** Shows an Alert */
    show(alert: AlertProps): void;
    /** Shows an Alert from a Promise */
    openLazy(data: {
        /** Return a Promise to a React Element which will be an overlay, 
         * it should have a Button or some way of calling Alert.close() or a new alert otherwise the alert will be unclosable. */
        importer: () => Promise<JSX.Element>,
        /** Defaults to false, if true then tapping the background will close the alert. */
        isDismissable?: boolean,
        /** Defaults to true, if false then the current ActionSheet won't be hidden upon opening the alert.
         * Note that the ActionSheet will be above the alert if this is set to false. */
        hideActionSheet?: boolean,
    }): Promise<void>;
    /** Closes the open alert. */
    close: () => void;
}

export const Alert: AlertModule = findByProps("show", "openLazy", "close");