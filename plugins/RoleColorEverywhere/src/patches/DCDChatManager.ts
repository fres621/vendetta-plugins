import { ReactNative } from '@vendetta/metro/common';
import { before } from "@vendetta/patcher";
import { findByStoreName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";

const { DCDChatManager } = ReactNative.NativeModules;
const GuildMemberStore = findByStoreName("GuildMemberStore");
const SelectedChannelStore = findByStoreName("SelectedChannelStore");
const ChannelStore = findByStoreName("ChannelStore");

// Function to easily do stuff with components including getting to formatted text
function patchComponents(component, func) {
  if (!component) return;
  if (Array.isArray(component.content)) {
    component.content.forEach((subcomp, index) => component.content[index] = patchComponents(subcomp, func));
  }
  if (component.type) component = func(component) || component;
  return component;
};

export default function patchDCDChatManager() {
    return before("updateRows", DCDChatManager, (r)=>{
        if (storage.noMention) return;
        let rows = JSON.parse(r[1]);
        rows.forEach(row => {
            if (row.type != 1) return;
            if (!row.message?.content) return;

            // Get current channel ID — https://discord.com/channels/1015931589865246730/1094699841239650334/1106211737734238238
            const channelId = SelectedChannelStore.getChannelId()
            if (!channelId) return;
            // Get channel object from ID — https://discord.com/channels/1015931589865246730/1062531774187573308/1085578628206694440
            const channel = ChannelStore.getChannel(channelId);
            if (!channel.guild_id) return;

            // Function that will be ran in every component of the message content
            const mentionPatch = (component)=>{
              if (component.type != 'mention') return;  // If the component is a mention
              if (!component.userId) return;            // If it's an User mention (exclude roles)

              let member = GuildMemberStore.getMember(channel.guild_id, component.userId);
              const hexc = member?.colorString;
              if (!hexc) return;                          // Stop here if the user doesn't have a custom role color
              const dec = parseInt(hexc.slice(1), 16);    // Get the decimal value for the role color
              return {
                ...component, 
                roleColor: dec, 
                color: dec, 
                colorString: hexc
              };
            };
            patchComponents({content: row.message.content}, mentionPatch);
            if (row.message.referencedMessage?.message?.content) patchComponents({content: row.message.referencedMessage.message.content}, mentionPatch);
        });

        r[1] = JSON.stringify(rows);
    });
};
