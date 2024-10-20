import { ReactNative, constants } from "@vendetta/metro/common";
import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { General } from "@vendetta/ui/components";
import { semanticColors } from "@vendetta/ui";

const { View, TouchableOpacity } = General;
const { Image } = ReactNative;

const reactions = findByProps("addReaction", "getReactors");
const privileges = findByProps("canUseEmojisEverywhere", "canUseAnimatedEmojis");
const { getCustomEmojiById } = findByProps("getCustomEmojiById");
const { convertNameToSurrogate } = findByProps("convertNameToSurrogate");
const PermissionsStore = findByProps("can", "_dispatcher");
const GuildStore = findByProps("getGuilds");
const UserSettingsProtoStore = findByStoreName("UserSettingsProtoStore");
const MessageStore = findByStoreName("MessageStore");

const ThemeStore = findByStoreName("ThemeStore");
const {
    meta: { resolveSemanticColor },
} = findByProps("colors", "meta");

const Colors = (e) => {
    const map = {
        background: "BACKGROUND_SECONDARY",
        separator: "BACKGROUND_TERTIARY",
    };
    return map[e] ? resolveSemanticColor(ThemeStore.theme, semanticColors[map[e]]) : "#FFFFFF";
};

interface EmojiFrecency {
    totalUses: number;
    recentUses: string[];
    frecency: number;
    score: number;
}

interface Emoji {
    roles: string[];
    require_colons: boolean;
    name: string;
    managed: boolean;
    id: string;
    available: boolean;
    animated: boolean;
    allNamesString: string;
    guildId: string;
    type: number;
    url?: string;
}

function sortEmojisByScore(emojis: Record<string, EmojiFrecency>) {
    return Object.entries(emojis).sort((a, b) => b[1].score - a[1].score);
}

/**
 * Returns an array of frequent emojis sorted by score.
 * @param {Object} emojis - The emojis object to be sorted.
 * @returns {string[]} - An array of emoji keys.
 */
let frequentEmojis = sortEmojisByScore(UserSettingsProtoStore.frecencyWithoutFetchingLatest.emojiFrecency.emojis).map(
    ([k, _v]) => k
);

const canReact = (guildId: string) =>
    PermissionsStore.can(constants.Permissions.ADD_REACTIONS, GuildStore.getGuild(guildId));

var saved = [];

function save(value) {
    saved.push(value);
    saved.splice(0, saved.length - 4);
    return saved;
}

function toggleReaction(channelId: string, messageId: string, reaction: Partial<Emoji>) {
    let message = MessageStore.getMessage(channelId, messageId);
    if (!message) return; // in the case the user reacts right when a message is deleted
    let userReactions = message.reactions.filter((r) => r.me);
    if (userReactions.find((e: any) => e.emoji.name === reaction.name && e.emoji.id === reaction.id)) {
        // Remove reaction
        const removeReaction = reactions.removeReactionWithConfirmation || reactions.removeReaction;
        removeReaction({
            channelId: channelId,
            messageId: messageId,
            emoji: { id: reaction.id, name: reaction.name },
            location: "Message",
            reactionType: 0,
            isMe: true,
        });
    } else {
        // Add reaction
        reactions.addReaction(channelId, messageId, reaction, "Message", {
            burst: false,
        });
    }
}

export default function () {
    return after("default", findByName("ChatInputContextBar", false), ([a], b) => {
        if (!a.pendingReply) return;

        const guildId = a.pendingReply.channel.guild_id;
        const channelId = a.pendingReply.channel.id;
        const messageId = a.pendingReply.message.id;

        if (guildId && !canReact(guildId)) return; // what about per channel permissions?
        // Don't add the reaction bar if the user can't react.

        const savedRES = saved.find((o) => o.id === guildId);

        const emojis = savedRES
            ? savedRES.emojis
            : frequentEmojis
                  .filter((emoji) => {
                      // First check: Is it a custom emoji? If not, we don't need these external emoji checks.
                      const customEmoji = getCustomEmojiById(emoji);
                      if (!customEmoji) return true;

                      // Second check: Can use animated emojis? If not, is the emoji animated?
                      if (!privileges.canUseAnimatedEmojis() && customEmoji.animated) return false;

                      // Third check: Can use external emojis?
                      if (customEmoji.guildId != guildId) {
                          if (
                              !PermissionsStore.can(
                                  constants.Permissions.USE_EXTERNAL_EMOJIS,
                                  GuildStore.getGuild(guildId)
                              )
                          )
                              return false; // Server
                          if (!privileges.canUseEmojisEverywhere()) return false; // Discord
                      }
                      return true;
                  })
                  .map((emoji) => {
                      let s = convertNameToSurrogate(emoji);
                      if (s)
                          return {
                              uri:
                                  "asset:/emoji-" +
                                  Array.from(s)
                                      .map((c: string) => c.codePointAt(0).toString(16))
                                      .join("-") +
                                  ".png",
                              name: s,
                              id: null,
                              animated: false,
                          };
                      let c = getCustomEmojiById(emoji);
                      if (c)
                          return {
                              uri:
                                  c.url || // url is no longer a property in newer RN app versions
                                  `https://cdn.discordapp.com/emojis/${c.id}.${c.animated ? "gif" : "png"}?size=48`,
                              name: c.name,
                              id: c.id,
                              animated: c.animated,
                          };
                      return undefined;
                  })
                  .filter((e) => e !== undefined);

        if (!savedRES) save({ id: guildId, emojis });

        if (!emojis.length) return;

        b.props.children.unshift(
            <View
                style={{
                    backgroundColor: Colors("background"),
                    width: "100%",
                    padding: 5,
                    borderBottomColor: Colors("separator"),
                    borderBottomWidth: 1,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {emojis.map((emoji) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                toggleReaction(channelId, messageId, {
                                    id: emoji.id,
                                    name: emoji.name,
                                    animated: emoji.animated,
                                })
                            }
                        >
                            <Image
                                source={{ uri: emoji.uri }}
                                style={{
                                    width: 24,
                                    height: 24,
                                    marginLeft: 5,
                                    marginRight: 5,
                                }}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    });
}
