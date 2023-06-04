import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

import { Forms } from "@vendetta/ui/components";
const { FormText } = Forms;

export default () => (
    (useProxy(storage) && false) ||
    storage.code ? eval(storage.code) : console.log("No code found in plugin's storage.")
)