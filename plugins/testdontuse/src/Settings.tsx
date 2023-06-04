import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

import { Forms } from "@vendetta/ui/components";
const { FormText } = Forms;

let code2eval = "";

async function updateFromUrl() {
    try {
        const response = await fetch('http://192.168.0.22:3621/file');
        if (!response.ok) {
            console.log("response not ok")
        }
        const data = await response.text();
        code2eval = data;
      } catch (error) {
        console.log("oops error!!")
      }
}

export default () => {
    updateFromUrl();
    return code2eval ? eval(code2eval) : <FormText>No code to eval found...</FormText>
}