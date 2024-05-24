import { findByProps } from "@vendetta/metro";
import { beforeStartCall } from "./components";
import { before } from "@vendetta/patcher";
import Settings from './components/Settings';

const voice = findByProps("call", "ring");
const channelModule = findByProps("selectVoiceChannel");

const patch = ([channel, hasVideo]: any) => {
    beforeStartCall((silent: boolean) => {
        channelModule.selectVoiceChannel(channel.id, hasVideo, true);
        if (!silent) voice.ring(channel.id);
    }, hasVideo);
    return [];
};

const callModule = findByProps("handleStartCall");

const patches: any[] = [];

export default {
    onLoad: () => {
        patches.push(before("handleRedesignGroupDMCall", callModule, patch));
        patches.push(before("handleStartCall", callModule, patch));
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings,
}