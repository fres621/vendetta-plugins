import patchTypingWrapper from "./patches/TypingWrapper";
import patchRows from "./patches/Rows";
import patchVoiceUserConnected from "./patches/VoiceUserConnected";
import patchMemberList from "./patches/MemberList";
import Settings from "./Settings";

let patches = [];

export default {
    onLoad: () => {
        patches.push(patchTypingWrapper());
        patches.push(patchRows());
        //patches.push(patchVoiceUserConnected()); TODO -- fix Show in VC option
        patches.push(patchMemberList());
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    },
    settings: Settings
}