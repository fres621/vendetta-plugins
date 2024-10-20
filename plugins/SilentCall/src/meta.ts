import Changelog from "@util/changelog";

export const plugin = {
    name: "SilentCall",
    version: "1.0.0",
};

export const changelog = new Changelog({ title: plugin.name });

changelog.add("1.0.0", {
    "+": ["Initial release"],
});
