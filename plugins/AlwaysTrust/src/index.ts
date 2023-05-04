import { findByStoreName } from "@vendetta/metro";

const store = findByStoreName("MaskedLinkStore");
let oldfunc = ()=>{return false};

export default {
    onLoad: () => {
        oldfunc = store.isTrustedDomain;
        store.isTrustedDomain = ()=>{return true};
    },
    onUnload: () => {
        store.isTrustedDomain = oldfunc;
    }
};
