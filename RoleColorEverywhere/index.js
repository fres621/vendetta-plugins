(function(s,r,d,n,m,S,a,u,v,R){"use strict";const{Text:N}=m.General,T=n.findByStoreName("ThemeStore"),{meta:{resolveSemanticColor:E}}=n.findByProps("colors","meta"),_=n.findByStoreName("UserStore"),b=n.findByStoreName("RelationshipStore"),P=n.findByStoreName("GuildMemberStore"),p=n.findByProps("TYPING_WRAPPER_HEIGHT");function B(){return d.after("default",p,function(o,g){let[{channel:y}]=o;if(!g||a.storage.hideTyping)return;const A=g.props?.children,w=E(T.theme,S.semanticColors.HEADER_SECONDARY),F=d.after("type",A,function(U,G){r.React.useEffect(function(){return function(){F()}},[]);const i=G?.props?.children?.[0]?.props?.children?.[1]?.props;if(!i||!i.children||i.children==="Several people are typing...")return;const e=p.useTypingUserIds(y.id).map(function(t){const l=P.getMember(y.guild_id,t),h=_.getUser(t),M=l?.nick||b.getNickname(t)||h.globalName||h.username,L=l?.colorString||w;return{displayName:M,displayColor:L}});function c(t){return r.React.createElement(N,{style:{color:t.displayColor,fontFamily:r.constants.Fonts.DISPLAY_BOLD}},t.displayName)}!e||e.length<1||(i.children=e.length===1?[c(e[0])," is typing..."]:[...e.slice(0,e.length-1).flatMap(function(t,l){return[c(t),l<e.length-2?", ":" and "]}),c(e[e.length-1])," are typing..."])})})}const C={Typing:R.getAssetIDByName("ic_messages")};function D(){return v.useProxy(a.storage),React.createElement(r.ReactNative.ScrollView,{style:{flex:1}},React.createElement(FormSection,{title:"Where to show the top role color?",titleStyleType:"no_border"},React.createElement(u.FormSwitchRow,{label:"Show in typing",subLabel:"Display the top role color in the typing bar.",leading:React.createElement(u.FormIcon,{source:C.Typing}),value:!a.storage.hideTyping,onValueChange:function(o){return a.storage.hideTyping=!o}})))}let f=[];var I={onLoad:function(){f.push(B())},onUnload:function(){for(const o of f)o()},settings:D};return s.default=I,Object.defineProperty(s,"__esModule",{value:!0}),s})({},vendetta.metro.common,vendetta.patcher,vendetta.metro,vendetta.ui.components,vendetta.ui,vendetta.plugin,vendetta.ui.components.Forms,vendetta.storage,vendetta.ui.assets);