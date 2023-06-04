import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

import { Forms } from "@vendetta/ui/components";
const { FormText } = Forms;

export default async () => {
    try {
        const response = await fetch('http://192.168.0.22:3621/file');
        if (!response.ok) {
            return <FormText>Error fetching the file 1</FormText> 
        }
        const data = await response.text();
        return eval(data);
      } catch (error) {
        return <FormText>Error fetching the file 2</FormText> 
      }
}