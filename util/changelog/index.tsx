import { Forms, General, HelpMessage as _HelpMessage } from "@vendetta/ui/components";
import { React, constants, i18n } from "@vendetta/metro/common";
import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { semanticColors } from "@vendetta/ui";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { use } from "./translations";

const { FormText, FormSection, FormIcon } = Forms;

const HelpMessage = _HelpMessage as typeof _HelpMessage & any;
const { View, Pressable } = General;

const Navigator = findByName("Navigator") ?? findByProps("Navigator")?.Navigator;
const { getHeaderCloseButton } = findByProps('getHeaderCloseButton');
let modals = findByProps('pushModal');
const Svg = findByName("Svg", false).default;
const Path = findByName("Svg", false).Path;

const modal_key = "fres-plugin-changelog";

function MinusSign({ color }): any {
    return <Svg height="24" width="24" viewBox="0 0 24 24" fill="none">
        <Path d="M 4 12 H 20" stroke={color} strokeWidth={2} />
    </Svg>
}

const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

// Thanks vee :3
export function compare(a: Version, b: Version) {
    let aParts = a.split(".").map(Number);
    let bParts = b.split(".").map(Number);
    for (let i = 0; i < bParts.length; i++) {
        if (aParts[i] > bParts[i]) return -1
        if (bParts[i] > aParts[i]) return 1
    }
    return 0
}

type Version = `${number}.${number}.${number}`;

interface ChangelogEntry {
    '+': string[];
    '=': string[];
    '-': string[];
}

interface ChangelogOptions {
    title?: string;
}

class Changelog {
    declare versions: { [key: Version]: ChangelogEntry };
    declare title?: string;
    constructor(props: ChangelogOptions = {}) {
        this.versions = {};
        this.title = props["title"];
    }
    add(version: Version, entry: Partial<ChangelogEntry>) {
        const v: ChangelogEntry = this.versions[version] ??= { "+": [], "=": [], "-": [] };
        Object.keys(entry).map(sign => v[sign].push(...entry[sign]));
    }
    showModal(title?: string) {
        modals.pushModal({
            key: modal_key,
            modal: {
                key: modal_key,
                modal: getModal(this, title),
                animation: 'slide-up',
                shouldPersistUnderModals: false,
                closable: true
            }
        });
    }
}


function Title({ leading, title, style = {} }): any {
    return (
        <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", ...style }}>
            {leading}<FormText style={{
                textTransform: "uppercase",
                color: resolveSemanticColor(ThemeStore.theme, semanticColors.HEADER_SECONDARY),
                fontFamily: constants.Fonts.PRIMARY_MEDIUM,
                fontSize: 16,
            }}>{title}</FormText>
        </View>
    )
}


const getModal = (changelog: Changelog, title?: string) => function () {
    const TEXT_NORMAL = resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_NORMAL);
    const TEXT_MUTED = resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_MUTED);
    return (
        <Navigator
            initialRouteName={"CHANGELOG"}
            screens={{
                CHANGELOG: {
                    headerTitle: () => <>
                        <FormText numberOfLines={1} style={{ color: TEXT_NORMAL, fontSize: 18 }}>
                            {i18n.Messages.WHATS_NEW}
                        </FormText>
                        <FormText numberOfLines={1} style={{ color: TEXT_MUTED, fontSize: 12 }}>
                            {changelog.title || title || "Plugin"}
                        </FormText>
                    </>,
                    headerLeft: getHeaderCloseButton(() => modals.popModal(modal_key)),
                    render: function () {
                        return Object.entries(changelog.versions).sort(([a]: any, [b]: any) => compare(a, b)).map(([version, entry]) => {
                            return <>
                                <FormSection title={version} titleStyleType="no_border">
                                    {([
                                        ["+", use.ADDED, <FormIcon source={getAssetIDByName("ic_add_24px")} />],
                                        ["=", use.CHANGED, <FormIcon source={getAssetIDByName("ic_more_24px")} />],
                                        ["-", use.REMOVED, <MinusSign color={TEXT_MUTED} />]
                                    ] as [string, string, JSX.Element][]).map(([sign, title, icon]) => {
                                        return entry[sign].length ?
                                            <>
                                                <Title leading={icon} title={title} style={{ marginLeft: 12 }} />
                                                {entry[sign].map(line => (
                                                    <FormText style={{ marginLeft: 56, lineHeight: 32 }}>{line}</FormText>
                                                ))}
                                            </> : null
                                    })}
                                </FormSection>
                            </>
                        })
                    }
                }
            }}
        />
    )
}

export function ViewChangelogMessage({ changelog }: { changelog: Changelog }) {
    const ripple = {
        color: "rgba(0, 0, 0, 0.25)",
        foreground: true,
        borderless: false
    }
    function onPress() {
        changelog.showModal();
    }

    return (
        <>
            <Pressable onPress={onPress} android_ripple={ripple}>
                <HelpMessage messageType={1}>{use.VIEW_CHANGELOG}</HelpMessage>
            </Pressable>
        </>
    );
}


export default Changelog;