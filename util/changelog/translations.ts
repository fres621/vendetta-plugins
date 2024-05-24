import { i18n } from "@vendetta/metro/common"

const strings = {
    "ADDED": {
        "en-US": "Added"
    },
    "CHANGED": {
        "en-US": "Changed"
    },
    "REMOVED": {
        "en-US": "Removed"
    },
    "VIEW_CHANGELOG": {
        "en-US": "View Changelog"
    },
}
export default strings

export const use = new Proxy(strings, {
    get(strings, prop) {
        return strings[prop][i18n.getLocale()] ?? Object.values(strings[prop])[0]
    }
}) as any as Record<keyof typeof strings, string>