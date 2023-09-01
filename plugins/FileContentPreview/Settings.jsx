import { FormRow } from "@vendetta/ui/components/Forms";
import { ReactNative, constants } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { General } from "@vendetta/ui/components";
import Swidew from "./ui/Swidew";

const { ScrollView } = ReactNative;
const { Text } = General;

const Colors = {
    text: resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_NORMAL)
};

export default () => {
    useProxy(storage);
    storage.chunkSize ??= 2569728;
    return (
        <ScrollView style={{flex: 1, marginTop: 10}}>
            <FormRow label="Load chunk size" subLabel="How many bytes to load at a time"></FormRow>
            <Swidew onSlide={(v)=>{setAsd(v)}} value={asd} style={{marginBottom: 0}} />
            <Text style={{marginLeft: '5%', color: Colors.text, fontFamily: constants.Fonts.DISPLAY_MEDIUM, fontSize: 16, marginBottom: 5, marginTop: -5}}>Current value: {`${formatted} (${asd}%)`}</Text>
        </ScrollView>
    )
}