import { ReactNative } from '@vendetta/metro/common';
import { after, before } from "@vendetta/patcher";
import { findByProps, findByStoreName, findByName } from "@vendetta/metro";
import { semanticColors } from "@vendetta/ui";
import { storage } from "@vendetta/plugin";

const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

const RowManager = findByName("RowManager");
const GuildMemberStore = findByStoreName("GuildMemberStore");
const SelectedChannelStore = findByStoreName("SelectedChannelStore");
const ChannelStore = findByStoreName("ChannelStore");

// Function to easily do stuff with components including getting to formatted text
function patchComponents(component, funcs, args, tree?) {
  if (!component) return;
  tree = Object.assign([], tree); // don't modify the tree for parent components
  tree ? tree.push(component) : tree = [component];
  if (Array.isArray(component.content)) {
    component.content.forEach((subcomp, index) => component.content[index] = patchComponents(subcomp, funcs, args, tree));
  } else if (component.items) {
    component.items.forEach((subcomp, index) => component.items[index] = patchComponents(subcomp, funcs, args, tree));
  } else if (Array.isArray(component)) {
    component.forEach((subcomp, index) => component[index] = patchComponents(subcomp, funcs, args, tree));
  }
  if (component.type) {
    funcs.forEach(func => {
      component = func(component, args, tree) || component;
    });
  };
  return component;
};

function interpolateColor(color1, color2, percentage) {
  const hexToRgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16));
  const rgbToHex = rgb => '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const interpolatedRgb = rgb1.map((c1, i) => Math.round(c1 + (rgb2[i] - c1) * percentage));

  return rgbToHex(interpolatedRgb);
};

function handleRow(row) {
  const { message } = row;
  if (!message) return;
  if ((!storage.chatInterpolation || storage.chatInterpolation <= 0) && storage.noMention) return;

  const channel = ChannelStore.getChannel(message.channelId);
  if (!channel?.guild_id) return;

  // Function that will be ran in every component of the message content
  const mentionPatch = (component) => {
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

  const defaultTextColor = resolveSemanticColor(ThemeStore.theme, semanticColors.TEXT_NORMAL);

  const colorPatch = (component, [authorId], tree?)=>{
    let t = tree?.map(c=>c.type)
    if (t?.includes("mention") || t?.includes("channelMention") || t?.includes("roleMention") || t?.includes("commandMention") || t?.includes("link")) return;
    if (component.type != 'text') return;
    const authorMember = GuildMemberStore.getMember(message.guildId, authorId);
    if (!authorMember || !authorMember.colorString) return;
    return {
      content: [component],
      target: 'usernameOnClick',
      context: {
        username: 1,
        usernameOnClick: {
          action: '0',
          userId: '0',
          linkColor: ReactNative.processColor(interpolateColor(defaultTextColor, authorMember.colorString, storage.chatInterpolation / 100)),
          messageChannelId: '0'
        },
        medium: true
      },
      type: 'link'
    }
  };

  let patches: any[] = [];

  if (storage.chatInterpolation > 0) {
    patches.push(colorPatch);
  };

  if (!storage.noMention) {
    patches.push(mentionPatch);
    message.shouldShowRoleOnName = true;
    if (message.referencedMessage?.message) message.referencedMessage.message.shouldShowRoleOnName = true;
  };

  if (message.content) patchComponents({content: message.content}, patches, [message.authorId]);
  if (message.embeds) message.embeds.forEach(embed => patchComponents({ content: embed.description }, patches, [message.authorId]));
  if (message.referencedMessage?.message?.content) patchComponents({content: message.referencedMessage.message.content}, patches, [message.referencedMessage.message.authorId]);
}

const { NativeModules: nm } = ReactNative;

const { DCDChatManager, InfoDictionaryManager, RTNClientInfoManager } = nm;
const clientInfo = InfoDictionaryManager ?? RTNClientInfoManager;

export default function patchRows() {
  if (parseInt(clientInfo.Build) > 200013) {

    return before("updateRows", DCDChatManager, (args) => {
      var rows = JSON.parse(args[1]);

      for (const row of rows) {
        handleRow(row);
      }

      args[1] = JSON.stringify(rows);
    });

  } else {

    return after("generate", RowManager.prototype, (_, row) => {
      handleRow(row);
    });

  }
};
