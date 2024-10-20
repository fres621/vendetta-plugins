import { FluxDispatcher } from "@vendetta/metro/common";

// audioId is randomly generated every time the plugin is enabled to prevent the way this plugin work from being able to be used maliciously.
const audioId = 4259920 + Math.floor(Math.random() * (4096 - 8 + 1)) + 8;

let audioState: Audio = { id: "0", state: "untouched", sliderIndex: "0", duration: 0, channelId: "0", messageId: "0" };

function getAudioState() {
    return audioState;
}

function setAudioState(props) {
    audioState = { ...audioState, ...props };
}

type Audio = {
    id: string;
    state: "playing" | "untouched" | "loading" | "paused";
    sliderIndex: string;
    duration: number;
    time?: any;
    channelId: string;
    messageId: string;
};

// ChatGPT
function msToTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const remainingSeconds = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
}

function updateMessage(channelId, messageId) {
    /*
    let msg = MessageStore.getMessage(channelId, messageId);
    FluxDispatcher.dispatch({type: 'MESSAGE_UPDATE'});
    */
    let update = {
        channelId: channelId,
        messageId: messageId,
        userId: "4259920",
        emoji: { name: "update", id: "4259920" },
        burst: false,
        colors: undefined,
        messageAuthorId: undefined,
    };
    FluxDispatcher.dispatch({ ...update, type: "MESSAGE_REACTION_ADD" });
    FluxDispatcher.dispatch({ ...update, type: "MESSAGE_REACTION_REMOVE" });
}

export { getAudioState, setAudioState, msToTime, audioId, updateMessage };
