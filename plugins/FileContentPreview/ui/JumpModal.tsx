import { React, constants } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms, General } from "@vendetta/ui/components";

const { View, TouchableOpacity } = General;
const { FormText, FormIcon } = Forms;

const JumpButton: any = ({ icon, buttonColor, textColor, text, onPress }) => (
    <TouchableOpacity
        style={{
            backgroundColor: buttonColor,
            borderRadius: 5,
            padding: 10,
            marginBottom: 15,
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }}
        onPress={onPress}
    >
        {icon}
        <Forms.FormText
            style={{
                color: textColor,
                fontSize: 16,
                fontFamily: constants.Fonts.PRIMARY_BOLD,
                textTransform: "uppercase",
            }}
        >
            {text}
        </Forms.FormText>
        <View />
    </TouchableOpacity>
);

const JumpModal: any = ({ onJumpToBottom, onJumpToTop, onClose, textColor, buttonColor, texts }) => (
    <>
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
            }}
        >
            <FormText style={{ fontSize: 20, fontFamily: constants.Fonts.PRIMARY_BOLD }}>{texts.JUMP}</FormText>
            <TouchableOpacity onPress={onClose}>
                <FormIcon source={getAssetIDByName("ic_close_16px")} style={{ opacity: 1 }} />
            </TouchableOpacity>
        </View>
        <JumpButton
            icon={<FormIcon source={getAssetIDByName("ic_jump_to_bottom_24px")} style={{ opacity: 1 }} />}
            text={texts.JUMP_BOTTOM}
            onPress={onJumpToBottom}
            {...{ buttonColor, textColor }}
        />
        <JumpButton
            icon={
                <FormIcon
                    source={getAssetIDByName("ic_jump_to_bottom_24px")}
                    style={{ opacity: 1, transform: [{ scaleY: -1 }] }}
                />
            }
            text={texts.JUMP_TOP}
            onPress={onJumpToTop}
            {...{ buttonColor, textColor }}
        />
    </>
);

export default JumpModal;
