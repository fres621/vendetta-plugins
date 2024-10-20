import { i18n } from "@vendetta/metro/common";

const strings = {
    REPORT_SEND_SUCCESS: {
        "en-US": "Your report was sent!",
    },
    REPORT_SEND_FAILURE: {
        "en-US": "Failed to send report",
    },
    SELECT_DATA: {
        "en-US": "Please select what data you would like to send.",
    },
    SEND_ID_TITLE: {
        "en-US": "Send your user ID",
    },
    SEND_ID_SUBTITLE: {
        "en-US": "Uncheck this to send an anonymous report",
    },
    SEND_DEBUG_TITLE: {
        "en-US": "Send debug information",
    },
    SEND_DEBUG_SUBTITLE: {
        "en-US": "Send your client's versions and device model",
    },
    ADD_CONTEXT: {
        "en-US": "Additional context or notes (optional)",
    },
    PATCH_ERROR: {
        "en-US": "There was an error with 1 or more patches.\nTap here to send a crash log.",
    },
    NO_ERRORS: {
        "en-US": "Anything's wrong? Tap here to send a bug report",
    },
};
export default strings;

export const use = new Proxy(strings, {
    get(strings, prop) {
        return strings[prop][i18n.getLocale()] ?? Object.values(strings[prop])[0];
    },
}) as any as Record<keyof typeof strings, string>;
