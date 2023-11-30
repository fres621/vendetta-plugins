export type PinnedDMsCategory = {
    id: string,
    name: string,
    ids: string[]
};

export type foundDM = {
    id: string,
    shouldHideIfCategoryIsCollapsed: boolean,
    index: number
}

export type IndexedCategories = {
    [key: string]: { collapsed: boolean, channels: foundDM[] };
}