import { ReactNative } from "@vendetta/metro/common";
import { FormSwitchRow, FormIcon, FormSection } from "@vendetta/ui/components/Forms";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";

const Icons = { 
    Typing: getAssetIDByName('ic_messages'),
    Mention: getAssetIDByName('ic_mention_user')
  };

export default () => {
    useProxy(storage);

    return (
        <ReactNative.ScrollView style={{flex: 1}}>
            <FormSection title="Where to show the top role color?" titleStyleType="no_border" >
                <FormSwitchRow label="Show in typing" subLabel="Display the top role color in the typing bar." 
                leading={<FormIcon source={Icons.Typing} />} value={!storage.hideTyping} onValueChange={(v) => storage.hideTyping = !v} >
                </FormSwitchRow>

                <FormSwitchRow label="Show in mentions" subLabel="Display the top role color in mentions in the chat." 
                leading={<FormIcon source={Icons.Mention} />} value={!storage.noMention} onValueChange={(v) => storage.noMention = !v} >
                </FormSwitchRow>
            </FormSection>
        </ReactNative.ScrollView>
    );
};