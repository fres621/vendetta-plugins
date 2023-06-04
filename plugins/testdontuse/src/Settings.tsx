import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

import { Forms } from "@vendetta/ui/components";
const { FormText } = Forms;

export default () => (
    eval(`
    <FormText>
        Hello, world!
    </FormText>
    `)
)