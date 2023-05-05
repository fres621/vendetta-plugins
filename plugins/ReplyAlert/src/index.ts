import { FluxDispatcher } from '@vendetta/metro/common';
import { before } from "@vendetta/patcher";
import { findByStoreName } from "@vendetta/metro";

const UserStore = findByStoreName("UserStore"),
	selfId = UserStore.getCurrentUser().id;

var el = ()=>{};

    export default {
        onLoad: () => {
            el = before(
                "dispatch",
                FluxDispatcher,
                (args) => {
                  const [event] = args;
                  if (event.type === "MESSAGE_CREATE") {
                    if (event.message.referenced_message?.author?.id != selfId) return;
                    if (event.message.mentions?.some(e => e.id === selfId )) return;
                    event.message.mentions.push({id: selfId})
                  };
                }
              );              
        },
        onUnload: () => {
            el();
        }
    };
