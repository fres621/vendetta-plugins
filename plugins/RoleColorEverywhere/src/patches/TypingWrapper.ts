import { React, constants } from '@vendetta/metro/common';
import { after } from "@vendetta/patcher";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { General } from "@vendetta/ui/components";
import { semanticColors } from "@vendetta/ui";
import { storage } from "@vendetta/plugin";

const { Text } = General;

const ThemeStore = findByStoreName("ThemeStore");
const { meta: { resolveSemanticColor } } = findByProps("colors", "meta");

const UserStore = findByStoreName("UserStore");
const RelationshipStore = findByStoreName("RelationshipStore");
const GuildMemberStore = findByStoreName("GuildMemberStore");
const TypingWrapper = findByProps("TYPING_WRAPPER_HEIGHT");

export default function patchTypingWrapper() {
    return after("default", TypingWrapper, ([{ channel }], res) => {
        if (!res) return;
        if (!storage.show.showTyping) return;
        const Typing = res.props?.children;
        const defaultTypingColor = resolveSemanticColor(ThemeStore.theme, semanticColors.HEADER_SECONDARY);

        const unpatchTyping = after("type", Typing, (_, res) => {
            React.useEffect(() => () => { unpatchTyping() }, []);
            const typingThing = res?.props?.children?.[0]?.props?.children?.[1]?.props;

            if (!typingThing || !typingThing.children || typingThing.children === "Several people are typing...") return;

            const users = TypingWrapper.useTypingUserIds(channel.id).map(user => {
                const member = GuildMemberStore.getMember(channel.guild_id, user);
                const userobj = UserStore.getUser(user);
                const name = (member?.nick || RelationshipStore.getNickname(user) || userobj.globalName || userobj.username);
                const color = (member?.colorString || defaultTypingColor);
                
                return {displayName: name, displayColor: color};
            });
            
            function userElem(user) {
                return React.createElement( Text, { style: { color: user.displayColor, fontFamily: constants.Fonts.DISPLAY_BOLD } }, user.displayName );
            };

            if (!users || users.length < 1) return;

            typingThing.children = (users.length === 1 ? [userElem(users[0]), " is typing..."] :
                [...users.slice(0, users.length - 1).flatMap((el, i)=>[userElem(el), i < (users.length-2) ? ", " : " and "]), userElem(users[users.length - 1]), " are typing..."])

        });
    });
};