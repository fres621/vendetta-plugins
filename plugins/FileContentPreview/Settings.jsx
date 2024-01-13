import { find, findByProps, findByStoreName } from "@vendetta/metro";
import { FormRow } from "@vendetta/ui/components/Forms";
import { ReactNative, constants } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { semanticColors } from "@vendetta/ui";
import { General } from "@vendetta/ui/components";
import Swidew from "./ui/Swidew";

const { ScrollView } = ReactNative;
const { Text } = General;

const ThemeStore = findByStoreName("ThemeStore");
const resolveSemanticColor = find(m => m.default?.internal?.resolveSemanticColor)?.default.internal.resolveSemanticColor
    ?? find(m => m.meta?.resolveSemanticColor)?.meta.resolveSemanticColor ?? (() => {});

const Colors = {
    text: resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_NORMAL)
};

const humanize = findByProps("intword");

export default () => {
    useProxy(storage);
    storage.chunkSize ??= 60928;
    let max = 1024000, min = 10240;
    let ptBytes = (v)=>(v / 100) * (max - min) + min;
    let unpt = (ptBytes) => ((ptBytes - min) / (max - min)) * 100;
    let hm = (v)=> humanize.intword(v, [ 'bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ], 1024, undefined, undefined, undefined, ' ');
    return (
        <ScrollView style={{flex: 1, marginTop: 10}}>
            <FormRow label="Load chunk size" subLabel="How many bytes to load at a time"></FormRow>
            <Swidew onSlide={(v)=>{ storage.chunkSize = ptBytes(v) }} value={ unpt(storage.chunkSize) } style={{marginBottom: 0}} />
            <Text 
            style={{
                marginLeft: '5%', color: Colors.text, 
                fontFamily: constants.Fonts.DISPLAY_MEDIUM, fontSize: 16, 
                marginBottom: 5, marginTop: -5
                }}>
                    Current value: {`${ hm(storage.chunkSize) } (${ Math.round(unpt(storage.chunkSize)) }%)`}
            </Text>
        </ScrollView>
    )
}
