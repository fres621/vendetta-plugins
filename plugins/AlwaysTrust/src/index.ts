import { before } from "@vendetta/patcher";
import { findByStoreName } from "@vendetta/metro";

const MaskedLink = findByStoreName("MaskedLinkStore");
let patches = [];

export default {
    onLoad: () => {
        patches.push( before("isTrustedDomain", MaskedLink, ()=>{
            return true;
        }) );
    },
    onUnload: () => {
        for (const unpatch of patches) unpatch();
    }
};
