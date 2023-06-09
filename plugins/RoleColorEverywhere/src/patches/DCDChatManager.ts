import { ReactNative } from '@vendetta/metro/common';
import { before } from "@vendetta/patcher";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { semanticColors } from "@vendetta/ui";
import { storage } from "@vendetta/plugin";

const { DCDChatManager } = ReactNative.NativeModules;
const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");
const GuildMemberStore = findByStoreName("GuildMemberStore");
const ChatInputRef = findByProps("insertText");

// cMention generates an object for a content component, I use the one used in Discord join messages that allows displaying coloured text that opens a member profile on press.
function cMention(text, userId, channelId, hexColor) {
    console.log(text, userId, channelId, hexColor);
    return {
      content: [{
        type: 'text',
        content: text
      }],
      target: 'usernameOnClick',
      context: {
        username: 1,
        usernameOnClick: {
          action: 'bindUserMenu',
          userId: userId,
          linkColor: ReactNative.processColor(hexColor),
          messageChannelId: channelId
        },
        medium: true
      },
      type: 'link'
    }
  };

export default function patchDCDChatManager() {
    return before("updateRows", DCDChatManager, (r)=>{
        if (storage.noMention) return;
        const defaultMentionColor = resolveSemanticColor(ThemeStore.theme, semanticColors.MENTION_FOREGROUND);
        let rows = JSON.parse(r[1]);
        rows.forEach(row => {
            if (row.type != 1) return;
            if (!row.message?.content) return;

            // Get current channel — https://discord.com/channels/1015931589865246730/1015931590741872712/1084205010486820977
            let channel = ChatInputRef.refs[0]?.current?.props?.channel;

            // Iterate through components of the message content
            row.message.content.forEach((component, index) => {
                if (component.type != 'mention') return;
                let member = GuildMemberStore.getMember(channel.guild_id, component.userId);
                const color = (member?.colorString || defaultMentionColor);
                row.message.content[index] = cMention(component.content[0].content, component.userId, component.channelId, color);
            });
        });

        r[1] = JSON.stringify(rows);
    });
};