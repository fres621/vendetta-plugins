import patchSendMessage from "./patches/sendMessage";
import { constants } from "@vendetta/metro/common";
//import Settings from "./Settings";
let patches = [];
let oldVals: any = {};

export default {
    onLoad: () => {
        oldVals.MAX_MESSAGE_LENGTH = constants.MAX_MESSAGE_LENGTH;
        oldVals.MAX_MESSAGE_LENGTH_PREMIUM = constants.MAX_MESSAGE_LENGTH_PREMIUM;
        constants.MAX_MESSAGE_LENGTH = 10000;
        constants.MAX_MESSAGE_LENGTH_PREMIUM = 10000;
        patches.push(patchSendMessage(oldVals));
    },
    onUnload: () => {
        if (oldVals.MAX_MESSAGE_LENGTH) constants.MAX_MESSAGE_LENGTH = oldVals.MAX_MESSAGE_LENGTH;
        if (oldVals.MAX_MESSAGE_LENGTH_PREMIUM) constants.MAX_MESSAGE_LENGTH_PREMIUM = oldVals.MAX_MESSAGE_LENGTH_PREMIUM;
        for (const unpatch of patches) {
            unpatch();
        };
    }
}