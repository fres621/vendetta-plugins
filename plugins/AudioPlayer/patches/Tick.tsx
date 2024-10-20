import { getAudioState, setAudioState, updateMessage } from "../shared";

export default function tick() {
    let i = 0;
    let itick = setInterval(() => {
        //console.log("Ticking...");
        let state = getAudioState();
        if (state.state != "playing") return;
        if (!state.time) return;
        let calculatedCurrentTime = +Date.now() - state.time.l + state.time.t;

        let shouldUpdateTime = false;
        i++;
        if (i > 33) i = 0;
        if (i == 33) shouldUpdateTime = true;

        if (calculatedCurrentTime > state.duration) {
            setAudioState({ state: "untouched", sliderIndex: "0", id: "0" });
            updateMessage(state.channelId, state.messageId);
            return;
        }
        let calculatedSliderIndex = Math.floor((calculatedCurrentTime / state.duration) * 20).toString();
        let shouldUpdateMessage = false;
        if (calculatedSliderIndex != state.sliderIndex) {
            shouldUpdateMessage = true;
            setAudioState({ sliderIndex: calculatedSliderIndex });
        }
        if (shouldUpdateTime || shouldUpdateMessage) {
            shouldUpdateMessage = true;
            setAudioState({ time: { t: calculatedCurrentTime, l: +Date.now() } });
        }
        if (shouldUpdateMessage) updateMessage(state.channelId, state.messageId);
    }, 1000 / 30);

    return () => clearInterval(itick);
}
