import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

import { Forms } from "@vendetta/ui/components";
const { FormText } = Forms;

export default () => {
    fetch('http://192.168.0.22:3621/file')
        .then(response => response.text())
        .then(data => {
            return eval(data);
        })
        .catch(error => {
            return <FormText>Error fetching the file</FormText> 
        });
}