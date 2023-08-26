(function(B,a,b,g,p,y,e,S){"use strict";const f=a.findByStoreName("ThemeStore"),{meta:{resolveSemanticColor:h}}=a.findByProps("colors","meta"),{View:v,Text:C,TouchableOpacity:E}=S.General,{FormIcon:M}=S.Forms,{ActivityIndicator:x,ScrollView:P}=e.ReactNative,A=e.ReactNative.NativeModules.MediaManager.downloadMediaAsset,{default:I,getRenderCloseButton:D}=a.findByProps("getRenderCloseButton"),k=a.findByProps("pushModal"),L=a.findByProps("intword"),O=a.findByName("Svg",!1).default,T=a.findByName("Svg",!1).Path;function H(r){return function(){return e.React.createElement(E,{onPress:r},e.React.createElement(M,{source:p.getAssetIDByName("ic_download_24px"),style:{marginRight:8,marginLeft:-8,opacity:1}}))}}function W(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"unknown",c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"https://cdn.discordapp.com/attachments/1068304660269641738/1144843403151020122/file.txt",d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1;return function(){const[n,o]=e.React.useState("");let l=1e4;const[t,m]=e.React.useState(l);fetch(c,{headers:{Range:"bytes=0-"+String(l)}}).then(function(s){s.ok?s.text().then(function(_){o(_)}):o("Error reading file content: Network response was not ok")});let N=e.React.createElement(v,{style:{margin:32}},e.React.createElement(x,{size:"large"}));const[u,R]=e.React.useState(!1),i={header:h(f.theme,g.semanticColors.HEADER_PRIMARY),test:h(f.theme,g.semanticColors.TEXT_MUTED),bgDark:h(f.theme,g.semanticColors.BACKGROUND_SECONDARY_ALT),bgBright:h(f.theme,g.semanticColors.BACKGROUND_SECONDARY),bgBrighter:h(f.theme,g.semanticColors.BACKGROUND_ACCENT)},Z=e.React.createElement(O,{height:"24",width:"24",viewBox:"0 0 24 24",fill:u?i.header:i.test},e.React.createElement(T,{d:"M2.75 5C2.33579 5 2 5.33579 2 5.75C2 6.16421 2.33579 6.5 2.75 6.5H21.25C21.6642 6.5 22 6.16421 22 5.75C22 5.33579 21.6642 5 21.25 5H2.75Z"}),e.React.createElement(T,{d:"M2.75 11.5C2.33579 11.5 2 11.8358 2 12.25C2 12.6642 2.33579 13 2.75 13H19C20.3807 13 21.5 14.1193 21.5 15.5C21.5 16.8807 20.3807 18 19 18H14.5607L15.2803 17.2803C15.5732 16.9874 15.5732 16.5126 15.2803 16.2197C14.9874 15.9268 14.5126 15.9268 14.2197 16.2197L12.2197 18.2197C11.9268 18.5126 11.9268 18.9874 12.2197 19.2803L14.2197 21.2803C14.5126 21.5732 14.9874 21.5732 15.2803 21.2803C15.5732 20.9874 15.5732 20.5126 15.2803 20.2197L14.5607 19.5H19C21.2091 19.5 23 17.7091 23 15.5C23 13.2909 21.2091 11.5 19 11.5H2.75Z"}),e.React.createElement(T,{d:"M2 18.75C2 18.3358 2.33579 18 2.75 18H9.25C9.66421 18 10 18.3358 10 18.75C10 19.1642 9.66421 19.5 9.25 19.5H2.75C2.33579 19.5 2 19.1642 2 18.75Z"}));let j=e.React.createElement(e.React.Fragment,null,e.React.createElement(C,{style:{color:i.test,marginTop:7}},"+ ",L.intword(d-t,["bytes","KB","MB","GB","TB","PB"],1024,void 0,void 0,void 0," ")," not loaded."),e.React.createElement(E,{style:{backgroundColor:i.bgBright,borderRadius:5,padding:10,marginBottom:20,marginTop:5},onPress:function(){m(t+l),fetch(c,{headers:{Range:"bytes="+String(t-l)+"-"+String(t)}}).then(function(s){s.ok?s.text().then(function(_){o(n+_)}):o(n+`
Error loading more of the file content: Network response was not ok`)})}},e.React.createElement(C,{style:{color:i.header,textTransform:"uppercase",fontWeight:"bold",textAlign:"center",fontSize:20}},"Load more"))),X=e.React.createElement(v,{style:{marginTop:0}},e.React.createElement(v,{style:{padding:15,paddingBottom:0,display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"space-between"}},e.React.createElement(E,{onPress:function(){R(!u)},onLongPress:function(){y.showToast("Toggle Word Wrap",p.getAssetIDByName("ic_information_filled_24px"))},style:{backgroundColor:u?i.bgBrighter:i.bgDark,padding:4,borderRadius:5,borderWidth:2,borderColor:u?i.bgBright:i.bgDark}},Z)),e.React.createElement(P,{style:{margin:15,marginBottom:50}},e.React.createElement(P,{horizontal:!u},e.React.createElement(C,{selectable:!0,style:{color:i.header}},n)),t>=d&&j));return e.React.createElement(I,{initialRouteName:"FILE_CONTENT_PREVIEW",screens:{FILE_CONTENT_PREVIEW:{headerLeft:D(function(){return k.popModal("file-content-preview")}),headerRight:H(function(){A(c,0).then(function(s){s?y.showToast("Saved file",p.getAssetIDByName("ic_selection_checked_24px")):y.showToast("Error saving file",p.getAssetIDByName("ic_close_circle"))})}),render:function(){return n?X:N},headerTitle:function(){let s=h(f.theme,g.semanticColors.HEADER_PRIMARY);return e.React.createElement(E,{onPress:function(){e.clipboard.setString(r),y.showToast("Copied filename to clipboard",p.getAssetIDByName("toast_copy_message"))}},e.React.createElement(C,{numberOfLines:1,style:{color:s}},r),e.React.createElement(C,{numberOfLines:1,style:{color:s,fontSize:12}},L.intword(d,["bytes","KB","MB","GB","TB","PB"],1024,void 0,void 0,void 0," ")))}}}})}}const U=a.findByStoreName("MessageStore"),z=a.findByStoreName("SelectedChannelStore");function F(){return b.after("render",a.findByName("Chat").prototype,function(r,c){c.props.hasOwnProperty("onTapInviteEmbed")&&b.before("onTapInviteEmbed",c.props,function(d){let[{nativeEvent:{index:n,messageId:o}}]=d,l=z.getChannelId(),t=U.getMessage(l,o),m=t.codedLinks,N=t.attachments;if(n>=m.length){let u=n-m.length,R=N[u];k.pushModal({key:"file-content-preview",modal:{key:"file-content-preview",modal:W(R.filename,R.url,R.size),animation:"slide-up",shouldPersistUnderModals:!1,closable:!0}})}})})}const G=a.findByName("RowManager");function K(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"unknown";return{borderColor:-251658241,backgroundColor:-13947599,thumbnailCornerRadius:15,headerColor:-4867391,headerText:"",acceptLabelBackgroundColor:-14441126,titleText:"FILE \u2014 "+(arguments.length>1&&arguments[1]!==void 0?arguments[1]:"? bytes"),type:null,extendedType:4,participantAvatarUris:[],acceptLabelText:"Preview",noParticipantsText:`
`+r,ctaEnabled:!0}}function V(){return b.after("generate",G.prototype,function(r,c){let[d]=r,{message:n}=c;if(d.rowType!=1||!n.attachments)return;let o=[],l=[];n.attachments.forEach(function(t){t.filename.toLowerCase().endsWith(".txt")?o.push(K(t.filename,t.size)):l.push(t)}),o.length&&(n.codedLinks.push(...o),n.attachments=l)})}let w=[];var Y={onLoad:function(){w.push(F()),w.push(V())},onUnload:function(){for(const r of w)r()}};return B.default=Y,Object.defineProperty(B,"__esModule",{value:!0}),B})({},vendetta.metro,vendetta.patcher,vendetta.ui,vendetta.ui.assets,vendetta.ui.toasts,vendetta.metro.common,vendetta.ui.components);
