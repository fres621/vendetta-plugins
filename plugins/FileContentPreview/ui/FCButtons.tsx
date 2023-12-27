import { React, ReactNative, clipboard } from "@vendetta/metro/common";
import { findByName } from "@vendetta/metro";
import { Forms, General } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";

const { View, Text, TouchableOpacity } = General;
const { FormIcon } = Forms;

const Svg = findByName("Svg", false).default;
const Path = findByName("Svg", false).Path;

export const WordWrapSvg: any = ({ color }) => (
    <Svg height="24" width="24" viewBox="0 0 24 24" fill={color}>
        <Path d="m2.75 5c-0.41421 0-0.75 0.33579-0.75 0.75s0.33579 0.75 0.75 0.75h18.5c0.4142 0 0.75-0.33579 0.75-0.75s-0.3358-0.75-0.75-0.75h-18.5z" />
        <Path d="m2.75 11.5c-0.41421 0-0.75 0.3358-0.75 0.75s0.33579 0.75 0.75 0.75h16.25c1.3807 0 2.5 1.1193 2.5 2.5s-1.1193 2.5-2.5 2.5h-4.4393l0.7196-0.7197c0.2929-0.2929 0.2929-0.7677 0-1.0606s-0.7677-0.2929-1.0606 0l-2 2c-0.2929 0.2929-0.2929 0.7677 0 1.0606l2 2c0.2929 0.2929 0.7677 0.2929 1.0606 0s0.2929-0.7677 0-1.0606l-0.7196-0.7197h4.4393c2.2091 0 4-1.7909 4-4s-1.7909-4-4-4h-16.25z" />
        <Path d="m2 18.75c0-0.4142 0.33579-0.75 0.75-0.75h6.5c0.41421 0 0.75 0.3358 0.75 0.75s-0.33579 0.75-0.75 0.75h-6.5c-0.41421 0-0.75-0.3358-0.75-0.75z" />
    </Svg>
);

export const MonospaceSvg: any = ({ color }) => (
    <Svg height="24" width="24" viewBox="0 0 24 24">
        <Path
            d="m12.98 18.5 3.315-9.84h1.41l3.315 9.84h-1.32l-1.71-5.505c-0.17-0.55-0.34-1.095-0.51-1.635-0.16-0.55-0.315-1.11-0.465-1.68h-0.06c-0.16 0.56999-0.32 1.13-0.48 1.68-0.16 0.54-0.325 1.085-0.495 1.635l-1.725 5.505h-1.275zm1.74-3v-1.005h4.515v1.005h-4.515z"
            fill={color}
        />
        <Path
            d="m12.966 15.411c-0.0877-0.2469-0.1828-0.5106-0.2853-0.7912h-6.1c-0.57333 1.6933-0.86 2.76-0.86 3.2 0 0.4267 0.10667 0.6933 0.32 0.8 0.22667 0.0933 0.62667 0.14 1.2 0.14l0.04 0.24h-4.5l0.04-0.24c0.38667 0 0.68667-0.0333 0.9-0.1 0.22667-0.0667 0.46667-0.24 0.72-0.52 0.26667-0.2933 0.52-0.7133 0.76-1.26s0.52667-1.3133 0.86-2.3l1.78-5.14c0.62667-1.8133 0.94-2.9133 0.94-3.3s-0.09333-0.63333-0.28-0.74c-0.18666-0.12-0.54666-0.18-1.08-0.18l-0.04-0.22h3.3l3.0301 8.2003-0.7448 2.2109zm2.558 2.3854c0.1749 0.3152 0.3405 0.523 0.4967 0.6234 0.3333 0.2267 0.7533 0.34 1.26 0.34l0.04 0.24h-2.1738l0.3771-1.2034zm-1.2607-3.1039c0.2553 0.674 0.4732 1.2396 0.6537 1.6968l-0.6613 2.1104h-0.6426c0.085-0.1095 0.1276-0.2694 0.1276-0.4799 0-0.161-0.0824-0.5084-0.2472-1.0424l0.7698-2.2849zm-7.5226-0.5527 2.82-8.06 2.96 8.06h-5.78z"
            clipRule="evenodd"
            fill={color}
            fillRule="evenodd"
        />
    </Svg>
);

interface FCButtonProps {
    onPress: () => any;
    info: string;
    colors: {
        background: {
            active: any;
            inactive: any;
        },
        border: {
            active: any;
            inactive: any;
        }
    };
    active: boolean;
    content: any;
}

export const FCButton: any = ({ onPress, info, colors, active, content }: FCButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={() => { showToast(info, getAssetIDByName("ic_information_filled_24px")) }}
            style={{
                backgroundColor: active ? colors.background.active : colors.background.inactive,
                padding: 4,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: active ? colors.border.active : colors.border.inactive,
            }}>
            {content}
        </TouchableOpacity>
    )
}

export const FCButtonBar: any = ({ children }) => {
    return (
        <View style={{
            padding: 15,
            paddingBottom: 0,
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between"
        }}>
            {/* nested view because it was planned to have buttons both in the left and the right side, might still be used at some point */}
            <View style={{
                display: "flex",
                flexDirection: "row",
                gap: 8
            }}>
                {children}
            </View>
        </View>
    )
}

const download = ReactNative.NativeModules.MediaManager.downloadMediaAsset;

export const DownloadButton: any = ({ url, saveText, failText, copyText }) => {
    function onPress() {
        download(url, 0).then(saved => {
            if (saved) {
                showToast(saveText, getAssetIDByName("ic_selection_checked_24px"));
            } else {
                showToast(failText, getAssetIDByName("ic_close_circle"));
            };
        });
    }
    function onLongPress() {
        clipboard.setString(url);
        showToast(copyText, getAssetIDByName("toast_copy_link"));
    }

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
            <FormIcon source={getAssetIDByName("ic_download_24px")} style={{ marginRight: 8, marginLeft: -8, opacity: 1 }} />
        </TouchableOpacity>
    );
};