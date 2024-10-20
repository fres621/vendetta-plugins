import { findByStoreName, findByProps } from "@vendetta/metro";
import { React, ReactNative, i18n } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import PinDMsApi from "../api";
import {
    ActionSheet,
    ActionSheetCloseButton,
    ActionSheetTitleHeader,
    BottomSheetFlatList,
    LazyActionSheet,
    Row,
    renderActionSheet,
} from "./misc";
import { Forms } from "@vendetta/ui/components";
import { openNewCategoryModal } from "./PinDMNewModal";

const ChannelStore = findByStoreName("ChannelStore");

const { getUserAvatarURL, getChannelIconURL } = findByProps("getUserAvatarURL", "getChannelIconURL");

const RelationshipStore = findByStoreName("RelationshipStore");
const { computeChannelName } = findByProps("computeChannelName");

export default function PinDMActionSheet({ channelId }) {
    const channel = ChannelStore.getChannel(channelId);
    const name =
        channel.type == 3
            ? computeChannelName(channel)
            : (RelationshipStore.getNickname(channel.recipients[0]) ??
              channel.rawRecipients[0].global_name ??
              channel.rawRecipients[0].globalName);
    if (channel.type != 1 && channel.type != 3) return; // no idea what this could be !!!

    function getIcon() {
        if (channel.type == 1) {
            const user = channel.rawRecipients[0];
            const url = getUserAvatarURL(user, false, 50);
            return user.avatar ? { uri: url } : url;
        } else {
            const { id, icon, applicationId } = channel;
            const url = getChannelIconURL({ id, icon, applicationId, size: 32 });
            return icon ? { uri: url } : url;
        }
    }

    const categories = [
        ...PinDMsApi.getPinnedDMs().map((category) => ({
            id: category.id,
            label: category.name,
            icon: null,
            onPress: () => (LazyActionSheet.hideActionSheet(), PinDMsApi.pin(channelId, category.id)),
        })),
        {
            id: "add",
            label: i18n.Messages.CATEGORY_NAME_PLACEHOLDER,
            icon: getAssetIDByName("ic_add_24px"),
            onPress: () => (
                LazyActionSheet.hideActionSheet(),
                openNewCategoryModal({ onExit: () => renderActionSheet(PinDMActionSheet, { channelId }) })
            ),
        },
    ];

    return (
        <ActionSheet>
            <ActionSheetTitleHeader
                title={`Pinning ${name}`}
                leading={
                    <ReactNative.Image
                        source={getIcon()}
                        style={{ width: 24, height: 24, borderRadius: 12, marginRight: 12 }}
                    />
                }
                trailing={<ActionSheetCloseButton onPress={() => LazyActionSheet.hideActionSheet()} />}
            />
            <Forms.FormTitle title="Add to category" />
            <BottomSheetFlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 48, marginBottom: 8 }}
                data={categories}
                renderItem={({ item }) => (
                    <Row
                        label={item.label}
                        onPress={item.onPress}
                        icon={
                            <Row.Icon source={item.icon} IconComponent={() => <Forms.FormIcon source={item.icon} />} />
                        }
                    />
                )}
                ItemSeparatorComponent={null}
                keyExtractor={(x) => x.id}
            />
        </ActionSheet>
    );
}
