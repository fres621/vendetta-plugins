import { ReactNative } from "@vendetta/metro/common";
import { FormSwitchRow, FormIcon } from "@vendetta/ui/components/Forms";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

export default () => {
    useProxy(storage);

    return (
        <ReactNative.ScrollView style={{flex: 1}}>
            <FormSection title="Where to show the top role color?" titleStyleType="no_border" >
                <FormSwitchRow label="Show in typing" subLabel="Display the top role color in the typing bar." 
                leading={<FormIcon source={Icons.Typing} />} value={storage.showTyping} onValueChange={(v) => storage.showTyping = v} >
                </FormSwitchRow>
            </FormSection>
        </ReactNative.ScrollView>
    );
};