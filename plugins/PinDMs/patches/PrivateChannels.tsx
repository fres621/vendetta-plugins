import { findByName, findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { after, instead } from "@vendetta/patcher";
import { Forms, ErrorBoundary } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";

const { FormTitle } = Forms;

const { getPrivateChannelRowHeight } = findByProps("getPrivateChannelRowHeightWithoutPadding");

export default function patch() {
    let patches: any[] = [];
    let isNestedPatched = false;

    patches.push(after("default", findByName("ConnectedPrivateChannels", false), (_, b) => {

        if (isNestedPatched) return;
        isNestedPatched = true;

        // TODO: Maybe find a better way rather than this
        let indices: any[] = [];
        b.props.privateChannelIds.forEach((id, index) => {
            if (storage.pinnedDMs.includes(id)) indices.push(index);
        });

        patches.push(after("render", b.type.prototype, (_, res) => {
            if (!res.props?.children?.props?.children) return;
            const uwu = res.props.children.props.children;

            uwu[2].props.sections = [1, uwu[2].props.sections[0] - indices.length];


            instead("renderItem", uwu[2].props, (args, orig) => {
                const [sectionIndex, itemIndex] = args;
                if (sectionIndex === 0) {

                    /* Errors if orig(0, 0) is a GC and I'm trying to make it a DM
                    function PrivateChannel(props) {
                        let pc = orig(0, 0);
                        pc.props = props;
                        return pc;
                    };
                    */

                    return (
                        <ErrorBoundary>
                            <>
                                <FormTitle title="Pinned DMs" />
                                {indices.map(index => {
                                    return orig(0, index);
                                })}
                                <FormTitle title="Direct Messages" />
                            </>
                        </ErrorBoundary>
                    );
                };

                if (indices.includes(itemIndex)) return null;

                return orig(...args);
            });

            instead("itemSize", uwu[2].props, (args, orig) => {
                const [sectionIndex, itemIndex] = args;
                if (sectionIndex === 0) {
                    // form title: 32 + 13, channel: getPrivateChannelRowHeight(1) (50)
                    return (32 + 13) * 2 + getPrivateChannelRowHeight(1) * indices.length;
                };
                if (indices.includes(itemIndex)) return 0;
                return orig(...args);
            });

        }));

    }));

    return () => patches.forEach(unpatch => unpatch());
};