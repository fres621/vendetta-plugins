import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { after, instead } from "@vendetta/patcher";
import { Forms, General } from "@vendetta/ui/components";

const { View } = General;
const { FormTitle } = Forms;

const ChannelStore = findByStoreName("ChannelStore");
const UserStore = findByStoreName("UserStore");
const SelectedChannelStore = findByStoreName("SelectedChannelStore");

const { getPrivateChannelRowHeightWithoutPadding, getPrivateChannelRowHeight } = findByProps("getPrivateChannelRowHeightWithoutPadding");

let pinnedDMs = ["1019548303265902603", "1104067103948013721"]

const patch = () => {
    let patches: any[] = [];
    let isNestedPatched = false;

    patches.push(after("default", findByName("ConnectedPrivateChannels", false), (_, b) => {

        if (isNestedPatched) return;
        isNestedPatched = true;

        patches.push(after("render", b.type.prototype, (_, res) => {
            if (!res.props?.children?.props?.children) return;
            const uwu = res.props.children.props.children;

            uwu[2].props.sections = [1, uwu[2].props.sections[0]];


            instead("renderItem", uwu[2].props, (args, orig) => {
                const [sectionIndex, _itemIndex] = args;
                if (sectionIndex === 0) {

                    function PrivateChannel(props) {
                        let pc = orig(0, 5);
                        pc.props = props;
                        return pc;
                    };

                    //console.log(orig(0, 5));

                    return (
                        <>
                            <FormTitle title="Pinned DMs" />
                            {pinnedDMs.map(channelId => {
                                const channel = ChannelStore.getChannel(channelId);
                                if (!channel) return null; // The channel might've been closed.
                                return (
                                    <PrivateChannel
                                        channel={channel}
                                        {...channel.type === 1 ? { user: UserStore.getUser(channel.recipients[0]) } : {}}
                                        channelName={channel.name}
                                        hasUnreadMessages={false}
                                        isInMainTabsExperiment={false}
                                        muted={false}
                                        selected={SelectedChannelStore.getChannelId() === channelId}
                                        useReducedMotion={false}
                                        rowHeight={getPrivateChannelRowHeightWithoutPadding(1)}
                                    />
                                );
                            })}

                            <FormTitle title="Direct Messages" />
                        </>
                    );
                };

                return orig(...args);
            });

            instead("itemSize", uwu[2].props, (args, orig) => {
                const [sectionIndex, _itemIndex] = args;
                if (sectionIndex === 0) {
                    // form title: 32 + 13, channel: getPrivateChannelRowHeight(1) (50)
                    return (32 + 13) * 2 + getPrivateChannelRowHeight(1) * pinnedDMs.length;
                };
                return orig(...args);
            });

        }));

    }));

    return () => patches.forEach(unpatch => unpatch());
};

// #region Patch and unpatch
if (1) {
    let patches = [patch()];
    console.log("Patched");

    setTimeout(() => {
        console.log("Unpatched");
        patches.forEach((unpatch) => unpatch());
    }, 17500);
}

// #endregion