import { ReactNative } from '@vendetta/metro/common';
import { before } from "@vendetta/patcher";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";

const { DCDChatManager } = ReactNative.NativeModules;
const GuildMemberStore = findByStoreName("GuildMemberStore");
const ChatInputRef = findByProps("insertText");

export default function patchDCDChatManager() {
    return before("updateRows", DCDChatManager, (r)=>{
        if (storage.noMention) return;
        let rows = JSON.parse(r[1]);
        rows.forEach(row => {
            if (row.type != 1) return;
            if (!row.message?.content) return;

            // Get current channel — https://discord.com/channels/1015931589865246730/1015931590741872712/1084205010486820977
            let channel = ChatInputRef.refs[0]?.current?.props?.channel;
            if (!channel.guild_id) return;

            // Iterate through components of the message content
            row.message.content.forEach((component, index) => {
              if (component.type != 'mention') return;  // If the component is a mention
              if (!component.userId) return;            // If it's an User mention (exclude roles)

              let member = GuildMemberStore.getMember(channel.guild_id, component.userId);
              const hexc = member?.colorString;
              if (!hexc) return;                          // Stop here if the user doesn't have a custom role color
              const dec = ReactNative.processColor(hexc); // Get the decimal value for the role color
              row.message.content[index] = {
                ...component, 
                roleColor: dec, 
                color: dec, 
                colorString: hexc
              };
            });
        });

        r[1] = JSON.stringify(rows);
    });
};