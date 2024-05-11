let patches = [];

export default {
    onLoad: () => {
        
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch();
        };
    }
}
