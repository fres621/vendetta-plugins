import { findByStoreName } from "@vendetta/metro";
import { ReactNative } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import { storage } from "@vendetta/plugin";

const { View } = ReactNative
const GuildStore = findByStoreName("GuildStore");

export default function patchMemberList() {
    return after("render", View, (_, b) => {
        if (storage.noRole) return;
        const aaa = findInReactTree(b, r => r?.props?.roleId);
        if (!aaa) return;
        if (isNaN(aaa.props.roleId)) return;
        if (aaa.props.excludedApplications) return;
        if (!aaa.type) return; // i should figure out when the crash actually happens but for now this should stop crashes
        let uwu = {type: Object.assign({}, aaa.type)};
        after("type", uwu.type, (_, res) => {
            if (!res?.props?.children?.[1]?.type) return; // same as last comment, all I know is that people are getting a "type is not a function in Object" crash
            let owo = {type: Object.assign({}, res.props.children[1].type)};

            after("render", owo.type, (_, d)=>{
                let role = GuildStore.getGuild(aaa.props.guildId)?.roles?.[aaa.props.roleId];
                if (!role?.colorString) return;
                d.props.style.push({color: role.colorString});
            });

            res.props.children[1].type = owo.type; // is this a good idea?
        });

        aaa.type = uwu.type; // is this a good idea?
    });
};


