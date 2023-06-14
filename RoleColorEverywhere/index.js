(function(v,u,C,s,b,S,l,p,D,E){"use strict";const{Text:A}=b.General,G=s.findByStoreName("ThemeStore"),{meta:{resolveSemanticColor:L}}=s.findByProps("colors","meta"),U=s.findByStoreName("UserStore"),$=s.findByStoreName("RelationshipStore"),F=s.findByStoreName("GuildMemberStore"),x=s.findByProps("TYPING_WRAPPER_HEIGHT");function j(){return C.after("default",x,function(e,a){let[{channel:r}]=e;if(!a||l.storage.hideTyping)return;const i=a.props?.children,h=L(G.theme,S.semanticColors.HEADER_SECONDARY),g=C.after("type",i,function(d,f){u.React.useEffect(function(){return function(){g()}},[]);const c=f?.props?.children?.[0]?.props?.children?.[1]?.props;if(!c||!c.children||c.children==="Several people are typing...")return;const n=x.useTypingUserIds(r.id).map(function(t){const m=F.getMember(r.guild_id,t),y=U.getUser(t),O=m?.nick||$.getNickname(t)||y.globalName||y.username,R=m?.colorString||h;return{displayName:O,displayColor:R}});function o(t){return u.React.createElement(A,{style:{color:t.displayColor,fontFamily:u.constants.Fonts.DISPLAY_BOLD}},t.displayName)}!n||n.length<1||(c.children=n.length===1?[o(n[0])," is typing..."]:[...n.slice(0,n.length-1).flatMap(function(t,m){return[o(t),m<n.length-2?", ":" and "]}),o(n[n.length-1])," are typing..."])})})}const{DCDChatManager:k}=u.ReactNative.NativeModules,H=s.findByStoreName("GuildMemberStore"),V=s.findByStoreName("SelectedChannelStore"),Y=s.findByStoreName("ChannelStore");function N(e,a){if(e)return Array.isArray(e.content)&&e.content.forEach(function(r,i){return e.content[i]=N(r,a)}),e.type&&(e=a(e)||e),e}function W(){return C.before("updateRows",k,function(e){if(l.storage.noMention)return;let a=JSON.parse(e[1]);a.forEach(function(r){if(r.type!=1||!r.message?.content)return;const i=V.getChannelId();if(!i)return;const h=Y.getChannel(i);if(!h.guild_id)return;const g=function(d){if(d.type!="mention"||!d.userId)return;const f=H.getMember(h.guild_id,d.userId)?.colorString;if(!f)return;const c=parseInt(f.slice(1),16);return{...d,roleColor:c,color:c,colorString:f}};N({content:r.message.content},g),r.message.referencedMessage?.message?.content&&N({content:r.message.referencedMessage.message.content},g)}),e[1]=JSON.stringify(a)})}function I(){return I=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var r=arguments[a];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},I.apply(this,arguments)}function K(){return I.apply(this,arguments)}var J=void 0;const{StyleSheet:X,PanResponder:q}=u.ReactNative,M=s.findByStoreName("ThemeStore"),{meta:{resolveSemanticColor:T}}=s.findByProps("colors","meta"),{View:P}=b.General,{useState:z,useCallback:Q}=u.React,_={sliderOff:T(M.theme,S.semanticColors.DEPRECATED_QUICKSWITCHER_INPUT_BACKGROUND),sliderOn:T(M.theme,S.semanticColors.REDESIGN_BUTTON_PRIMARY_BACKGROUND),thumb:T(M.theme,S.semanticColors.MENTION_FOREGROUND)};var Z=Q(function(e){let{onSlide:a,value:r}=e;const i=r||0,[h,g]=z(0);function d(o){this.container.measure(function(t,m,y,O,R,ue){let ce=(o-R)/(y-R)*100;const se=Math.min(Math.max(0,ce),100);a&&a(se)})}const f=u.React.useRef(q.create({onStartShouldSetPanResponder:function(o,t){return!0},onStartShouldSetPanResponderCapture:function(o,t){return!0},onMoveShouldSetPanResponder:function(o,t){return!0},onMoveShouldSetPanResponderCapture:function(o,t){return!0},onPanResponderGrant:function(o,t){d(t.x0)},onPanResponderMove:function(o,t){d(t.moveX)},onPanResponderTerminationRequest:function(o,t){return!0},onPanResponderRelease:function(o,t){},onPanResponderTerminate:function(o,t){},onShouldBlockNativeResponder:function(o,t){return!0}})).current;function c(o){g(o.nativeEvent.layout.width)}const n=X.create({container:{marginLeft:"5%",width:"90%",height:20,borderRadius:25,backgroundColor:_.sliderOff,marginBottom:25},slid:{width:i+"%",height:"100%",borderTopLeftRadius:25,borderBottomLeftRadius:25,borderRadius:i===100?25:0,backgroundColor:_.sliderOn,justifyContent:"center"},thumb:{height:"150%",aspectRatio:1,alignSelf:"flex-end",right:-(h/2),borderRadius:100,backgroundColor:_.thumb}});return u.React.createElement(P,K({style:n.container},f.panHandlers,{ref:function(o){J.container=o}}),u.React.createElement(P,{style:n.slid},u.React.createElement(P,{style:n.thumb,onLayout:c})))},[]);const{Text:ee}=b.General,te=s.findByStoreName("ThemeStore"),{meta:{resolveSemanticColor:ne}}=s.findByProps("colors","meta"),B={Typing:E.getAssetIDByName("ic_messages"),Mention:E.getAssetIDByName("ic_mention_user"),Text:E.getAssetIDByName("ic_add_text")},oe={text:ne(te.theme,semanticColors.TEXT_NORMAL)};function re(e,a,r){const i=function(c){return c.match(/\w\w/g).map(function(n){return parseInt(n,16)})},h=function(c){return"#"+c.map(function(n){return n.toString(16).padStart(2,"0")}).join("")},g=i(e),d=i(a),f=g.map(function(c,n){return Math.round(c+(d[n]-c)*r)});return h(f)}function ae(){return D.useProxy(l.storage),React.createElement(u.ReactNative.ScrollView,{style:{flex:1}},React.createElement(p.FormSection,{title:"Where to show the top role color?",titleStyleType:"no_border"},React.createElement(p.FormSwitchRow,{label:"Show in typing",subLabel:"Display the top role color in the typing bar.",leading:React.createElement(p.FormIcon,{source:B.Typing}),value:!l.storage.hideTyping,onValueChange:function(e){return l.storage.hideTyping=!e}}),React.createElement(p.FormSwitchRow,{label:"Show in mentions",subLabel:"Display the top role color in mentions in the chat.",leading:React.createElement(p.FormIcon,{source:B.Mention}),value:!l.storage.noMention,onValueChange:function(e){return l.storage.noMention=!e}}),React.createElement(p.FormSwitchRow,{label:"Show in chat text",subLabel:"Display the top role color in the chat text... Why would you want this?",leading:React.createElement(p.FormIcon,{source:B.Typing}),value:l.storage.chatInterpolation>0,onValueChange:function(e){l.storage.chatInterpolation=e?100:0}}),React.createElement(ee,{style:{marginLeft:"5%",color:re(oe.text,"#ff0000",uwu/100),fontFamily:u.constants.Fonts.DISPLAY_MEDIUM,fontSize:16,marginBottom:5,marginTop:-5}},"Color interpolation (for chat text):"),React.createElement(Z,{onSlide:function(e){l.storage.chatInterpolation=e},value:l.storage.chatInterpolation})))}let w=[];var ie={onLoad:function(){D.useProxy(l.storage),l.storage.chatInterpolation??=0,w.push(j()),w.push(W())},onUnload:function(){for(const e of w)e()},settings:ae};return v.default=ie,Object.defineProperty(v,"__esModule",{value:!0}),v})({},vendetta.metro.common,vendetta.patcher,vendetta.metro,vendetta.ui.components,vendetta.ui,vendetta.plugin,vendetta.ui.components.Forms,vendetta.storage,vendetta.ui.assets);
