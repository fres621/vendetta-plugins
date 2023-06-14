import { ReactNative, constants } from "@vendetta/metro/common";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { FormSwitchRow, FormIcon, FormSection } from "@vendetta/ui/components/Forms";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
console.log("d0");
import Swidew from './ui/Swidew.jsx';
console.log("d1");
const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

const Icons = { 
    Typing: getAssetIDByName('ic_messages'),
    Mention: getAssetIDByName('ic_mention_user'),
    Text: getAssetIDByName('ic_add_text')
};

const Colors = {
    text: resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_NORMAL)
};

function interpolateColor(color1, color2, percentage) {
    const hexToRgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16));
    const rgbToHex = rgb => '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const interpolatedRgb = rgb1.map((c1, i) => Math.round(c1 + (rgb2[i] - c1) * percentage));

    return rgbToHex(interpolatedRgb);
};

export default () => {
    useProxy(storage);
    console.log("d2");
    return (
        <ReactNative.ScrollView style={{flex: 1}}>
            <FormSection title="Where to show the top role color?" titleStyleType="no_border" >
                <FormSwitchRow label="Show in typing" subLabel="Display the top role color in the typing bar." 
                leading={<FormIcon source={Icons.Typing} />} value={!storage.hideTyping} onValueChange={(v) => storage.hideTyping = !v} >
                </FormSwitchRow>

                <FormSwitchRow label="Show in mentions" subLabel="Display the top role color in mentions in the chat." 
                leading={<FormIcon source={Icons.Mention} />} value={!storage.noMention} onValueChange={(v) => storage.noMention = !v} >
                </FormSwitchRow>

                <FormSwitchRow label="Show in chat text" subLabel="Display the top role color in the chat text... Why would you want this?" 
                leading={<FormIcon source={Icons.Typing} />} value={storage.chatInterpolation>0} onValueChange={(v) => {storage.chatInterpolation = (v ? 100 : 0)}} >
                </FormSwitchRow>

                <Text style={{marginLeft: '5%', color: interpolateColor(Colors.text, "#ff0000", uwu/100), fontFamily: constants.Fonts.DISPLAY_MEDIUM, fontSize: 16, marginBottom: 5, marginTop: -5}}>Color interpolation (for chat text):</Text>
                <Swidew onSlide={(v)=>{storage.chatInterpolation = v}} value={storage.chatInterpolation} />
            </FormSection>
        </ReactNative.ScrollView>
    );
};