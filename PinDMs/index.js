(function(N,s,r,e,D,l,W,H,X,J,T){"use strict";const{Pressable:Q}=l.General,{getPrivateChannelRowHeight:Z}=r.findByProps("getPrivateChannelRowHeightWithoutPadding"),V=r.findByName("CategoryChannel"),j=r.findByStoreName("UserGuildSettingsStore"),z=r.findByStoreName("ReadStateStore"),{getChannelId:ee}=r.findByStoreName("SelectedChannelStore"),te=r.findByName("FastList"),{getPrivateChannelIds:ne}=r.findByProps("getPrivateChannelIds"),{shouldShowMessageRequests:M}=r.findByProps("shouldShowMessageRequests");function G(t){if(!(t.addChangeListener||t.addChangeListener))throw new Error("Invalid store provided.");const[,i]=e.React.useReducer(function(n){return~n},0);return e.React.useEffect(function(){const n=function(){return i()};return t.addChangeListener(n),function(){return void t.removeChangeListener(n)}},[]),null}function re(){let t=[],i=!1;return t.push(D.after("default",r.findByName("ConnectedPrivateChannels",!1),function(n,f){if(i)return;i=!0;function g(u){let{id:a,selected:c}=u;const R=z.hasUnread(a),y=j.isChannelMuted(null,a);return!(c||R&&!y)}t.push(D.after("render",f.type.prototype,function(u,a){if(!a.props?.children?.props?.children)return;const c=a.props.children.props.children;function R(y){let{comp:I}=y;W.useProxy(s.storage),G(z),G(j);const P=I,v=s.storage.pinnedDMs;function Be(){const d={categories:1+v.length,channels:0,collapsedChannels:0},p=Object.fromEntries(Object.values(v).map(function(o){return[o.id,{channels:[],collapsed:s.storage.collapsedPinnedDMs.includes(o.id)}]}));return ne().forEach(function(o,w){let b=v.find(function(S){return S.ids.includes(o)});if(!b)return;d.channels+=1;let E=p[b.id];const L=g({id:o,selected:ee()===o});E.collapsed&&L&&(d.collapsedChannels+=1),E.channels.push({id:o,shouldHideIfCategoryIsCollapsed:L,index:w+ +M()})}),{counts:d,categories:p}}const{counts:F,categories:_}=Be();function Ie(d,p){p?s.storage.collapsedPinnedDMs.includes(d)||(s.storage.collapsedPinnedDMs=[...s.storage.collapsedPinnedDMs,d]):s.storage.collapsedPinnedDMs=s.storage.collapsedPinnedDMs.filter(function(o){return o!=d})}function De(d,p){return d===0?e.React.createElement(l.ErrorBoundary,null,e.React.createElement(e.React.Fragment,null,M()&&P.props.renderItem(0,0),Object.entries(_).map(function(o){let[w,{channels:b,collapsed:E}]=o;const L=v.find(function(S){return S.id===w});return e.React.createElement(e.React.Fragment,null,e.React.createElement(Q,{onPress:function(){return Ie(w,!E)}},e.React.createElement(V,{name:L.name,collapsed:E})),b.map(function(S){const k=P.props.renderItem(0,S.index);if(!E)return k;const{selected:ve}=k.props;return g({id:S.id,selected:ve})?null:k}))}),e.React.createElement(V,{name:"Direct Messages",renderChevron:!1}))):Object.values(_).map(function(o){return o.channels}).flat().some(function(o){return o.index===p})?null:P.props.renderItem(d,p+ +M())}function Ae(d,p){return d===0?32*F.categories+Z(1)*(F.channels-F.collapsedChannels+ +M()):Object.values(_).map(function(o){return o.channels}).flat().some(function(o){return o.index===p})?0:P.props.itemSize(d,p+ +M())}return e.React.createElement(te,{...P.props,sections:[1,P.props.sections[0]],renderItem:De,itemSize:Ae,onScroll:function(){}})}c[2]=e.React.createElement(R,{comp:c[2]})}))})),function(){return t.forEach(function(n){return n()})}}const{fromTimestamp:ie}=r.findByProps("extractTimestamp"),h={pin:function(t,i){if(h.isPinned(t))return;const n=s.storage.pinnedDMs.findIndex(function(f){return f.id===i});s.storage.pinnedDMs[n].ids=[...s.storage.pinnedDMs[n].ids,t]},unpin:function(t){const i=s.storage.pinnedDMs.findIndex(function(n){return n.ids.includes(t)});s.storage.pinnedDMs[i]={...s.storage.pinnedDMs[i],ids:s.storage.pinnedDMs[i].ids.filter(function(n){return n!=t})}},isPinned:function(t){return s.storage.pinnedDMs.some(function(i){return i.ids.includes(t)})},getPinnedDMs:function(){return s.storage.pinnedDMs},createCategory:function(t){s.storage.pinnedDMs.push({ids:[],id:ie(+Date.now()),name:t})},deleteCategory:function(t){s.storage.pinnedDMs=s.storage.pinnedDMs.filter(function(i){return i.id!=t})}},{ClearButtonVisibility:ae,default:se}=r.findByProps("ClearButtonVisibility"),{TextStyleSheet:we,Text:oe}=r.findByProps("TextStyleSheet"),B=r.findByProps("openLazy","hideActionSheet"),$=r.findByProps("ActionSheet")?.ActionSheet??r.find(function(t){return t.render?.name==="ActionSheet"}),{BottomSheetScrollView:be,BottomSheetFlatList:ce}=r.findByProps("BottomSheetScrollView"),{ActionSheetTitleHeader:de,ActionSheetCloseButton:le,ActionSheetRow:ue}=r.findByProps("ActionSheetTitleHeader"),C=ue??l.Forms.FormRow;function Y(t,i){$?B?.openLazy(new Promise(function(n){return n({default:t})}),"ActionSheet",i):J.showToast("You cannot open ActionSheets on this version! Upgrade to 163+")}const{View:x}=l.General,m=r.findByStoreName("ThemeStore"),fe=r.findByName("ConnectedKeyboardAwareView"),{meta:{resolveSemanticColor:O}}=r.findByProps("colors","meta"),{useOrientationSettling:pe}=r.findByProps("useOrientation"),K=r.findByProps("pushModal");function he(t){let{onExit:i}=t;K.pushModal({key:"pin-dms-new",modal:{key:"pin-dms-new",modal:ge,animation:"slide-up",props:{onExit:i},shouldPersistUnderModals:!1,closable:!0}})}function ge(t){let{onExit:i}=t;pe();const n=e.ReactNative.Dimensions?.get("window").width,[f,g]=e.React.useState(""),[u,a]=e.React.useState("");function c(){K.popModal("pin-dms-new"),i()}function R(){if(!f.length||h.getPinnedDMs().find(function(I){return I.name===f}))return a("Invalid category name.");h.createCategory(f),c()}function y(I){g(I),u.length&&a("")}return e.React.createElement(x,{style:{flex:1,backgroundColor:"#000000b3",justifyContent:"center",alignItems:"center"}},e.React.createElement(fe,null,e.React.createElement(x,{style:{borderRadius:8,padding:16,backgroundColor:O(m.theme,T.semanticColors.BACKGROUND_PRIMARY),width:n*.9}},e.React.createElement(oe,{variant:"heading-lg/extrabold",style:{textAlign:"center"}},e.i18n.Messages.CATEGORY_NAME_PLACEHOLDER),e.React.createElement(se,{value:"",error:u,onChangeText:y,placeholder:e.i18n.Messages.CATEGORY_NAME,inputTextColor:O(m.theme,T.semanticColors.TEXT_NORMAL),placeholderTextColor:O(m.theme,T.semanticColors.INPUT_PLACEHOLDER_TEXT),clearButtonVisibility:ae.NEVER,showBorder:!0,showTopContainer:!0,disabled:!1,autoFocus:!0,numberOfLines:1,returnKeyType:"done",style:{paddingHorizontal:8,paddingVertical:0}}),e.React.createElement(x,{style:{marginTop:24}},e.React.createElement(l.Button,{text:"Save",color:"brand",look:l.Button.Looks.FILLED,onPress:R}),e.React.createElement(l.Button,{text:"Cancel",look:l.Button.Looks.OUTLINED,style:{marginTop:8},onPress:c})))))}const ye=r.findByStoreName("ChannelStore"),{getUserAvatarURL:Re,getChannelIconURL:Ce}=r.findByProps("getUserAvatarURL","getChannelIconURL"),Pe=r.findByStoreName("RelationshipStore"),{computeChannelName:Ee}=r.findByProps("computeChannelName");function q(t){let{channelId:i}=t;const n=ye.getChannel(i),f=n.type==3?Ee(n):Pe.getNickname(n.recipients[0])??n.rawRecipients[0].global_name??n.rawRecipients[0].globalName;if(n.type!=1&&n.type!=3)return;function g(){if(n.type==1){const a=n.rawRecipients[0],c=Re(a,!1,50);return a.avatar?{uri:c}:c}else{const{id:a,icon:c,applicationId:R}=n,y=Ce({id:a,icon:c,applicationId:R,size:32});return c?{uri:y}:y}}const u=[...h.getPinnedDMs().map(function(a){return{id:a.id,label:a.name,icon:null,onPress:function(){return B.hideActionSheet(),h.pin(i,a.id)}}}),{id:"add",label:e.i18n.Messages.CATEGORY_NAME_PLACEHOLDER,icon:H.getAssetIDByName("ic_add_24px"),onPress:function(){return B.hideActionSheet(),he({onExit:function(){return Y(q,{channelId:i})}})}}];return e.React.createElement($,null,e.React.createElement(de,{title:`Pinning ${f}`,leading:e.React.createElement(e.ReactNative.Image,{source:g(),style:{width:24,height:24,borderRadius:12,marginRight:12}}),trailing:e.React.createElement(le,{onPress:function(){return B.hideActionSheet()}})}),e.React.createElement(l.Forms.FormTitle,{title:"Add to category"}),e.React.createElement(ce,{style:{flex:1},contentContainerStyle:{paddingBottom:48,marginBottom:8},data:u,renderItem:function(a){let{item:c}=a;return e.React.createElement(C,{label:c.label,onPress:c.onPress,icon:e.React.createElement(C.Icon,{source:c.icon,IconComponent:function(){return e.React.createElement(l.Forms.FormIcon,{source:c.icon})}})})},ItemSeparatorComponent:null,keyExtractor:function(a){return a.id}}))}const A=H.getAssetIDByName("icon-pins");function Se(){return D.after("default",r.findByName("ChannelLongPressActionSheet",!1),function(t,i){let[n]=t;D.after("type",i,function(f,g){const u=X.findInReactTree(g,function(a){return a.key==="dm"})?.props?.children;u&&(h.isPinned(n.channelId)?u.push(e.React.createElement(C,{label:"Unpin DM",icon:e.React.createElement(C.Icon,{source:A,IconComponent:function(){return e.React.createElement(l.Forms.FormIcon,{source:A})}}),onPress:function(){return B.hideActionSheet(),h.unpin(n.channelId)}})):u.push(e.React.createElement(C,{label:"Pin DM",icon:e.React.createElement(C.Icon,{source:A,IconComponent:function(){return e.React.createElement(l.Forms.FormIcon,{source:A})}}),onPress:function(){return Y(q,{channelId:n.channelId})}})))})})}let U=[];var Me={onLoad:function(){s.storage.pinnedDMs??=[{id:"default",name:"Pinned DMs",ids:[]}],s.storage.collapsedPinnedDMs??=[],U.push(re()),U.push(Se()),Object.defineProperty(window,"PinDMsDevApi",{configurable:!0,value:h})},onUnload:function(){for(const t of U)t(),delete window.PinDMsDevApi}};return N.default=Me,Object.defineProperty(N,"__esModule",{value:!0}),N})({},vendetta.plugin,vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.ui.components,vendetta.storage,vendetta.ui.assets,vendetta.utils,vendetta.ui.toasts,vendetta.ui);
