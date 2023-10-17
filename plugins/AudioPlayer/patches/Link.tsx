import { findByName } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";
import { audioId, getAudioState, setAudioState, updateMessage } from "../shared";
import { ReactNative } from "@vendetta/metro/common";

let isAudioPrepared = false;
const { DCDSoundManager } = ReactNative.NativeModules;

function prepareAudio(audioUrl) {
    console.log("Preparing", audioUrl);
    console.log({isAudioPrepared});
    if (isAudioPrepared) DCDSoundManager.release(4259920);
    isAudioPrepared = true;
    return new Promise<any[]>((resolve) => DCDSoundManager.prepare(audioUrl, "voice", 4259920, (...args)=>resolve(args)));
};

let isAudioPreparing = false;

export default function patch() {
    const unpatch = instead("default", findByName("safeTransitionTo", false), (a, orig) => {
        let path = a[0].split("/");
        if (path[2] === audioId.toString()) {
            let [,,,index,channelId,messageId,audioId,audioUrl] = path;
            let state = getAudioState();
            if (state.id != audioId) {
                if (isAudioPreparing) return new Promise((res)=>res(undefined));
                isAudioPreparing = true;
                let [oldChannel, oldMessage] = [state.channelId, state.messageId];
                setAudioState({id: audioId, state: 'loading', sliderIndex: "0", duration: 0, messageId, channelId});
                updateMessage(oldChannel, oldMessage);
                prepareAudio(Buffer.from(audioUrl, 'base64').toString('ascii')).then(([, {duration}]) => {
                    setAudioState({state: 'playing', duration, time: {l: +Date.now(), t: 0}});
                    DCDSoundManager.play(4259920);
                    isAudioPreparing = false;
                    updateMessage(channelId, messageId);
                });
            } else {
                if (index === "200") {
                    setAudioState({state: 'paused'});
                    DCDSoundManager.pause(4259920);
                    updateMessage(channelId, messageId);
                } else if (index === "100") {
                    setAudioState({state: 'playing'});
                    DCDSoundManager.play(4259920);
                    updateMessage(channelId, messageId);
                } else {
                    console.log("Index", index);
                    console.log(state.duration/20*parseInt(index));
                    setAudioState({state: 'playing', sliderIndex: index, time: {l: +Date.now(), t: state.duration/20*parseInt(index)}});
                    DCDSoundManager.setCurrentTime(4259920, state.duration/20*parseInt(index));
                    updateMessage(channelId, messageId);
                };
            };
            updateMessage(channelId, messageId);
            return new Promise((res)=>res(undefined));
        };
        return orig(...a);
    });

    return () => {
        unpatch();
        if (isAudioPrepared) DCDSoundManager.release(4259920);
    };
};