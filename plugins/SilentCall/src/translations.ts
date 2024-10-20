import { i18n } from "@vendetta/metro/common";

const strings = {
    STARTING_CALL: {
        "en-US": "You're about to start a call.",
    },
    SILENT_CALL: {
        "en-US": "Silent Call",
    },
};
export default strings;

export const use = new Proxy(strings, {
    get(strings, prop) {
        return strings[prop][i18n.getLocale()] ?? Object.values(strings[prop])[0];
    },
}) as any as Record<keyof typeof strings, string>;
