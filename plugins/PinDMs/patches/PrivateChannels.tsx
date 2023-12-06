import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { ErrorBoundary, General } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { PinnedDMsCategory, IndexedCategories } from "../types";

const { Pressable } = General;

const { getPrivateChannelRowHeight } = findByProps("getPrivateChannelRowHeightWithoutPadding");
const CategoryChannel = findByName("CategoryChannel");

const UserGuildSettingsStore = findByStoreName("UserGuildSettingsStore");
const ReadStateStore = findByStoreName("ReadStateStore");
const { getChannelId: getSelectedChannelId } = findByStoreName("SelectedChannelStore");



const FastList = findByName("FastList");

const { getPrivateChannelIds } = findByProps("getPrivateChannelIds");
const { shouldShowMessageRequests } = findByProps("shouldShowMessageRequests");


/** React hook for reacting to store updates */
function useStore(store): null {
    if (!(store.addChangeListener || store.addChangeListener)) throw new Error("Invalid store provided.");
    const [, forceUpdate] = React.useReducer((n) => ~n, 0);

    React.useEffect(() => {
        const listener = () => forceUpdate();

        store.addChangeListener(listener);

        return () => void store.removeChangeListener(listener);
    }, []);

    return null;
}

export default function patch() {
    let patches: any[] = [];
    let isNestedPatched = false;

    patches.push(after("default", findByName("ConnectedPrivateChannels", false), (_, b) => {
        if (isNestedPatched) return;
        isNestedPatched = true;

        /** Returns whether a channel should be hidden if it's category is collapsed */
        function hideIfCollapsed({ id, selected }): boolean {
            /** Boolean, true if there are unread messages and false otherwise. */
            const unread = ReadStateStore.hasUnread(id);
            const muted = UserGuildSettingsStore.isChannelMuted(null, id);

            if (selected) return false;
            if (unread && !muted) return false; // broken (?)
            return true;
        }

        patches.push(after("render", b.type.prototype, (_, res) => {
            if (!res.props?.children?.props?.children) return;
            const children = res.props.children.props.children;

            // Component function to be able to use hooks here
            function Test({ comp }) {
                useProxy(storage);                  // storage (obvious use case)
                useStore(ReadStateStore);           // channel unreads
                useStore(UserGuildSettingsStore);   // channel muted

                const originalList = comp;
                const pinnedDMs: PinnedDMsCategory[] = storage.pinnedDMs;

                function getCountsAndCategories() {
                    const counts = { categories: 1 + pinnedDMs.length, channels: 0, collapsedChannels: 0 }; // convenience
                    const categories: IndexedCategories = Object.fromEntries(Object.values(pinnedDMs).map(e => [e.id, { channels: [], collapsed: storage.collapsedPinnedDMs.includes(e.id) }]));
                    getPrivateChannelIds().forEach((id: string, index: number) => {
                        let category = pinnedDMs.find(category => category.ids.includes(id));
                        if (!category) return;

                        counts.channels += 1;
                        let renderCategory = categories[category.id];

                        const shouldHideIfCategoryIsCollapsed = hideIfCollapsed({ id, selected: getSelectedChannelId() === id });
                        if (renderCategory.collapsed && shouldHideIfCategoryIsCollapsed) counts.collapsedChannels += 1;
                        renderCategory.channels.push({ id, shouldHideIfCategoryIsCollapsed, index: (index + +shouldShowMessageRequests()) });
                    });
                    return { counts, categories };
                }

                const { counts, categories } = getCountsAndCategories();

                /** Sets whether categoryId is collapsed. */
                function setCollapsed(categoryId, collapsed) {
                    if (collapsed) {
                        if (!storage.collapsedPinnedDMs.includes(categoryId)) storage.collapsedPinnedDMs = [...storage.collapsedPinnedDMs, categoryId];
                    } else {
                        storage.collapsedPinnedDMs = storage.collapsedPinnedDMs.filter(id => id != categoryId);
                    }
                }

                function renderItem(sectionIndex, itemIndex) {
                    if (sectionIndex === 0) {
                        return (
                            <ErrorBoundary>
                                <>
                                    {shouldShowMessageRequests() && originalList.props.renderItem(0, 0)}
                                    {Object.entries(categories).map(([categoryId, { channels, collapsed }]) => {
                                        const category = pinnedDMs.find(c => c.id === categoryId)!;
                                        return (
                                            <>
                                                <Pressable onPress={() => setCollapsed(categoryId, !collapsed)}>
                                                    <CategoryChannel name={category.name} collapsed={collapsed} />
                                                </Pressable>
                                                {channels.map(dm => {
                                                    const channel = originalList.props.renderItem(0, dm.index);
                                                    if (!collapsed) return channel;

                                                    const { selected } = channel.props;
                                                    if (hideIfCollapsed({ id: dm.id, selected })) return null;
                                                    return channel;
                                                })}
                                            </>
                                        )
                                    })}
                                    <CategoryChannel name={"Direct Messages"} renderChevron={false} />
                                </>
                            </ErrorBoundary>
                        );
                    }

                    if (Object.values(categories).map(c => c.channels).flat().some(e => e.index === itemIndex)) return null;
                    return originalList.props.renderItem(sectionIndex, (itemIndex + +shouldShowMessageRequests()));
                }

                function itemSize(sectionIndex, itemIndex) {
                    if (sectionIndex === 0) {
                        return 32 * counts.categories + getPrivateChannelRowHeight(1) * ((counts.channels - counts.collapsedChannels) + +shouldShowMessageRequests());
                    }
                    if (Object.values(categories).map(c => c.channels).flat().some(e => e.index === itemIndex)) return 0;
                    return originalList.props.itemSize(sectionIndex, (itemIndex + +shouldShowMessageRequests()));
                }


                return (
                    <FastList
                        {...originalList.props}
                        sections={[1, originalList.props.sections[0]]}
                        renderItem={renderItem}
                        itemSize={itemSize}
                        onScroll={() => undefined} // original onScroll will uh cause rerender a lot uh uh
                    />
                );
            };

            // I forgot what I put this for but if i put it here there must be a reason (?)
            //const PatchComponent = React.memo(Test);

            children[2] = <Test comp={children[2]} />;

            return;

        }));

    }));

    return () => patches.forEach(unpatch => unpatch());
};