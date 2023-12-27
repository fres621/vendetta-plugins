import { findByProps, findByName, findByStoreName } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { semanticColors } from "@vendetta/ui";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { React, clipboard, ReactNative, i18n } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";
import translations from "../translations";
import { storage } from "@vendetta/plugin";
import { constants } from "@vendetta/metro/common";
import filetypes from "../filetypes";
import { FCModal } from "../ui/FCModal";

const modals = findByProps('pushModal');

const MessageStore = findByStoreName("MessageStore");
const SelectedChannelStore = findByStoreName("SelectedChannelStore");
const { MessagesHandlers } = findByProps("MessagesHandlers");

// thank you https://github.com/acquitelol/better-chat-gestures/blob/master/src/index.tsx
let _patchHandlers = (handlers) => {
  if (handlers.__fcp_patched) return;
  handlers.__fcp_patched = true;
  let patches: any[] = [];

  handlers.hasOwnProperty("handleTapInviteEmbed") && patches.push(before("handleTapInviteEmbed", handlers, ([{ nativeEvent: { index, messageId } }]) => {
    let channel = SelectedChannelStore.getChannelId();
    let message = MessageStore.getMessage(channel, messageId);

    // In case it's a starter thread message
    if (message.messageReference && message.messageReference.channel_id != channel)
      message = MessageStore.getMessage(message.messageReference.channel_id, message.messageReference.message_id);

    let codedLinks = message.codedLinks;
    let textFiles = message.attachments.filter(attachment => filetypes.has(attachment.filename.toLowerCase().split(".").pop()));
    if (index >= codedLinks.length) {
      const attachmentIndex = index - codedLinks.length;
      const attachment = textFiles[attachmentIndex];
      const { filename, url, size } = attachment;
      modals.pushModal({
        key: 'file-content-preview',
        modal: {
          key: 'file-content-preview',
          modal: FCModal,
          props: { filename, url, bytes: size },
          animation: 'slide-up',
          shouldPersistUnderModals: false,
          closable: true
        }
      });
    };
  }));

  return () => {
    handlers.__fcp_patched = false;
    patches.forEach(unpatch => unpatch());
  };
};

export default function () {
  let patches: any[] = [];
  let patchHandlers = (e) => { let s = _patchHandlers(e); s && patches.push(s) };

  const origGetParams = Object.getOwnPropertyDescriptor(MessagesHandlers.prototype, "params")!.get;
  origGetParams && Object.defineProperty(MessagesHandlers.prototype, "params", {
    configurable: true,
    get() {
      this && patchHandlers(this);
      return origGetParams.call(this);
    }
  });

  return () => {
    origGetParams && Object.defineProperty(MessagesHandlers.prototype, "params", {
      configurable: true,
      get: origGetParams
    });
    patches.forEach(unpatch => unpatch());
  };
};