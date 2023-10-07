(function(A,s,U,E,p,m,e,C,B,Z,$){"use strict";var v={PREVIEW:{"en-US":"Preview","en-GB":"Preview","zh-CN":"\u9884\u89C8","zh-TW":"\u9810\u89BD",cs:"N\xE1hled",da:"L\xE6s fil",nl:"Voorbeeld",fr:"Aper\xE7u",de:"Vorschau",el:"\u03B4\u03B9\u03B1\u03B2\u03AC\u03C3\u03B5\u03C4\u03B5","es-ES":"Leer",uk:"\u0447\u0438\u0442\u0430\u0442\u0438"},FILE_SAVED:{"en-US":"File saved","en-GB":"File saved","es-ES":"Archivo guardado",cs:"Soubor ulo\u017Een",uk:"\u0424\u0430\u0439\u043B \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E"},FILE_SAVE_ERROR:{"en-US":"Error saving file","en-GB":"Error saving file","es-ES":"Error guardando archivo",cs:"Chyba p\u0159i \xFAkl\xE1d\xE1n\xED souboru",uk:"\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0444\u0430\u0439\u043B\u0443"},TOGGLE_WORD_WRAP:{"en-US":"Toggle Word Wrap","en-GB":"Toggle Word Wrap","es-ES":"Salto de l\xEDnea",cs:"P\u0159epnout obt\xE9k\xE1n\xED slov",uk:"\u041F\u0435\u0440\u0435\u043C\u0438\u043A\u0430\u0447 \u0430\u0432\u0442\u043E\u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0443 \u0441\u043B\u043E\u0432"},JUMP_BOTTOM:{"en-US":"Jump to the bottom","en-GB":"Jump to the bottom","es-ES":"Saltar al final",cs:"Sko\u010Dit na konec",uk:"\u041F\u0440\u043E\u043A\u0440\u0443\u0442\u0456\u0442\u044C \u0434\u043E \u043D\u0438\u0437\u0443"},JUMP_TOP:{"en-US":"Jump to the top","en-GB":"Jump to the top","es-ES":"Saltar al principio",cs:"Sko\u010Dit na za\u010D\xE1tek",uk:"\u041F\u0440\u043E\u043A\u0440\u0443\u0442\u0456\u0442\u044C \u0434\u043E \u0432\u0435\u0440\u0445\u0443"},MONOSPACE:{"en-US":"Toggle Monospace Font","en-GB":"Toggle Monospace Font","es-ES":"Alternar fuente monoespaciada",cs:"P\u0159epnout pevn\xE9 p\xEDsmo",uk:"\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0438 \u043C\u043E\u043D\u043E\u0448\u0438\u0440\u0438\u043D\u043D\u0438\u0439 \u0448\u0440\u0438\u0444\u0442"}};const S=s.findByStoreName("ThemeStore"),{meta:{resolveSemanticColor:_}}=s.findByProps("colors","meta"),{View:f,Text:T,TouchableOpacity:R}=C.General,{FormIcon:w}=C.Forms,{ActivityIndicator:X,ScrollView:G,Image:Q,Modal:ee}=e.ReactNative,te=e.ReactNative.NativeModules.MediaManager.downloadMediaAsset,ae=s.findByName("Navigator")??s.findByProps("Navigator")?.Navigator,ne=s.findByProps("getRenderCloseButton")?.getRenderCloseButton??s.findByProps("getHeaderCloseButton")?.getHeaderCloseButton,W=s.findByProps("pushModal"),V=s.findByProps("intword"),J=s.findByName("Svg",!1).default,P=s.findByName("Svg",!1).Path,re=s.findByProps("useSafeAreaInsets");function se(a,n){return function(){return e.React.createElement(R,{onPress:a,onLongPress:n},e.React.createElement(w,{source:p.getAssetIDByName("ic_download_24px"),style:{marginRight:8,marginLeft:-8,opacity:1}}))}}function oe(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"unknown",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"https://cdn.discordapp.com/attachments/1068304660269641738/1144843403151020122/file.txt",i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1;return function(){let o=B.storage.chunkSize||60928;const[r,l]=e.React.useState({content:"",loadedBytes:o,firstTime:!0});r.firstTime&&fetch(n,{headers:{Range:"bytes=0-"+String(o)}}).then(function(c){c.ok?c.text().then(function(k){l({content:k,loadedBytes:r.loadedBytes,firstTime:!1})}):l({content:"",loadedBytes:0,firstTime:!1})});let g=e.React.createElement(f,{style:{margin:32}},e.React.createElement(X,{size:"large"}));const[h,D]=e.React.useState(!1),[y,b]=e.React.useState(!0),[u,d]=e.React.useState([]),t={header:_(S.theme,E.semanticColors.HEADER_PRIMARY),test:_(S.theme,E.semanticColors.TEXT_MUTED),bgDark:_(S.theme,E.semanticColors.BACKGROUND_SECONDARY_ALT),bgBright:_(S.theme,E.semanticColors.BACKGROUND_SECONDARY),bgBrighter:_(S.theme,E.semanticColors.BACKGROUND_ACCENT)},z=e.React.createElement(J,{height:"24",width:"24",viewBox:"0 0 24 24",fill:h?t.header:t.test},e.React.createElement(P,{d:"M2.75 5C2.33579 5 2 5.33579 2 5.75C2 6.16421 2.33579 6.5 2.75 6.5H21.25C21.6642 6.5 22 6.16421 22 5.75C22 5.33579 21.6642 5 21.25 5H2.75Z"}),e.React.createElement(P,{d:"M2.75 11.5C2.33579 11.5 2 11.8358 2 12.25C2 12.6642 2.33579 13 2.75 13H19C20.3807 13 21.5 14.1193 21.5 15.5C21.5 16.8807 20.3807 18 19 18H14.5607L15.2803 17.2803C15.5732 16.9874 15.5732 16.5126 15.2803 16.2197C14.9874 15.9268 14.5126 15.9268 14.2197 16.2197L12.2197 18.2197C11.9268 18.5126 11.9268 18.9874 12.2197 19.2803L14.2197 21.2803C14.5126 21.5732 14.9874 21.5732 15.2803 21.2803C15.5732 20.9874 15.5732 20.5126 15.2803 20.2197L14.5607 19.5H19C21.2091 19.5 23 17.7091 23 15.5C23 13.2909 21.2091 11.5 19 11.5H2.75Z"}),e.React.createElement(P,{d:"M2 18.75C2 18.3358 2.33579 18 2.75 18H9.25C9.66421 18 10 18.3358 10 18.75C10 19.1642 9.66421 19.5 9.25 19.5H2.75C2.33579 19.5 2 19.1642 2 18.75Z"})),q=e.React.createElement(J,{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"none"},e.React.createElement(P,{d:"M12.9805 18.4999L16.2955 8.65991H17.7055L21.0205 18.4999H19.7005L17.9905 12.9949C17.8205 12.4449 17.6505 11.8999 17.4805 11.3599C17.3205 10.8099 17.1655 10.2499 17.0155 9.67991H16.9555C16.7955 10.2499 16.6355 10.8099 16.4755 11.3599C16.3155 11.8999 16.1505 12.4449 15.9805 12.9949L14.2555 18.4999H12.9805ZM14.7205 15.4999V14.4949H19.2355V15.4999H14.7205Z",fill:y?t.header:t.test}),e.React.createElement(P,{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M12.9656 15.4112C12.8779 15.1643 12.7828 14.9006 12.6803 14.62H6.58027C6.00694 16.3133 5.72027 17.38 5.72027 17.82C5.72027 18.2467 5.82694 18.5133 6.04027 18.62C6.26694 18.7133 6.66694 18.76 7.24027 18.76L7.28027 19H2.78027L2.82027 18.76C3.20694 18.76 3.50694 18.7267 3.72027 18.66C3.94694 18.5933 4.18694 18.42 4.44027 18.14C4.70694 17.8467 4.96027 17.4267 5.20027 16.88C5.44027 16.3333 5.72694 15.5667 6.06027 14.58L7.84027 9.44C8.46694 7.62667 8.78027 6.52667 8.78027 6.14C8.78027 5.75333 8.68694 5.50667 8.50027 5.4C8.31361 5.28 7.95361 5.22 7.42027 5.22L7.38027 5H10.6803L13.7104 13.2003L12.9656 15.4112ZM15.5236 17.7966C15.6985 18.1118 15.8641 18.3196 16.0203 18.42C16.3536 18.6467 16.7736 18.76 17.2803 18.76L17.3203 19H15.1465L15.5236 17.7966ZM14.2629 14.6927C14.5182 15.3667 14.7361 15.9323 14.9166 16.3895L14.2553 18.4999H13.6127C13.6977 18.3904 13.7403 18.2305 13.7403 18.02C13.7403 17.859 13.6579 17.5116 13.4931 16.9776L14.2629 14.6927ZM6.74027 14.14L9.56027 6.08L12.5203 14.14H6.74027Z",fill:y?t.header:t.test}));let M=e.React.createElement(e.React.Fragment,null,e.React.createElement(T,{style:{color:t.test,marginTop:7}},"+ ",V.intword(i-r.loadedBytes,["bytes","KB","MB","GB","TB","PB"],1024,void 0,void 0,void 0," ")," not loaded."),e.React.createElement(R,{style:{backgroundColor:t.bgBright,borderRadius:5,padding:10,marginBottom:20,marginTop:5},onPress:function(){fetch(n,{headers:{Range:"bytes="+String(r.loadedBytes+1)+"-"+String(r.loadedBytes+o)}}).then(function(c){c.ok?c.text().then(function(k){l({content:r.content+k,loadedBytes:r.loadedBytes+o,firstTime:!1})}):m.showToast("Error: Network response was not ok",p.getAssetIDByName("ic_close_circle"))})}},e.React.createElement(T,{style:{color:t.header,textTransform:"uppercase",fontWeight:"bold",textAlign:"center",fontSize:20}},e.i18n.Messages.VOICE_PANEL_LOAD_MORE)));const[K,x]=e.React.useState(!1),L=e.React.useRef(null),De=re.useSafeAreaInsets();let Le=0,we=e.React.createElement(f,{style:{marginTop:0}},e.React.createElement(f,{style:{padding:15,paddingBottom:0,display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"space-between"}},e.React.createElement(f,{style:{display:"flex",flexDirection:"row",gap:8}},e.React.createElement(R,{onPress:function(){D(!h)},onLongPress:function(){m.showToast(v.TOGGLE_WORD_WRAP[e.i18n.getLocale()]??"Toggle Word Wrap",p.getAssetIDByName("ic_information_filled_24px"))},style:{backgroundColor:h?t.bgBrighter:t.bgDark,padding:4,borderRadius:5,borderWidth:2,borderColor:h?t.bgBright:t.bgDark}},z),e.React.createElement(R,{onPress:function(){b(!y)},onLongPress:function(){m.showToast(v.MONOSPACE[e.i18n.getLocale()]??"Toggle Monospace Font",p.getAssetIDByName("ic_information_filled_24px"))},style:{backgroundColor:y?t.bgBrighter:t.bgDark,padding:4,borderRadius:5,borderWidth:2,borderColor:y?t.bgBright:t.bgDark}},q),e.React.createElement(R,{onPress:function(){x(!0)},onLongPress:function(){m.showToast(e.i18n.Messages.JUMP,p.getAssetIDByName("ic_information_filled_24px"))},style:{marginLeft:10,backgroundColor:t.bgDark,padding:4,borderRadius:5,borderWidth:2,borderColor:t.bgDark}},e.React.createElement(Q,{source:p.getAssetIDByName("ic_reply_24px"),style:{height:24,width:24,transform:[{scaleX:-1},{rotate:"-90deg"}]}})))),e.React.createElement(G,{ref:L,style:{margin:15,marginBottom:50+De.bottom}},e.React.createElement(G,{horizontal:!h},e.React.createElement(f,{style:{flexDirection:"row"}},e.React.createElement(f,{style:{borderTopLeftRadius:4,borderBottomLeftRadius:4,backgroundColor:t.bgDark,marginRight:5,paddingRight:2,paddingLeft:2,alignSelf:"flex-start"}},e.React.createElement(T,{style:{textAlign:"right",color:t.test,lineHeight:20}},u.map(function(c){return c?++Le:" "}).join(`
`))),e.React.createElement(T,{selectable:!0,style:[{color:t.header,lineHeight:20,flex:1},y&&{fontFamily:e.constants.Fonts.CODE_SEMIBOLD}],onTextLayout:function(c){let k=c.nativeEvent.lines;d(k.map(function(Me,Y){return Y>0?k[Y-1].text.indexOf(`
`)>-1:!0}))}},r.content))),r.loadedBytes<i&&M),e.React.createElement(ee,{transparent:!0,animationType:"none",visible:K,onRequestClose:function(){return x(!1)}},e.React.createElement(f,{style:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.5)"}},e.React.createElement(f,{style:{backgroundColor:t.bgBright,padding:20,borderRadius:10,width:"90%"}},e.React.createElement(f,{style:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:15}},e.React.createElement(C.Forms.FormText,{style:{fontSize:20,fontFamily:e.constants.Fonts.PRIMARY_BOLD}},e.i18n.Messages.JUMP),e.React.createElement(R,{onPress:function(){return x(!1)}},e.React.createElement(w,{source:p.getAssetIDByName("ic_close_16px"),style:{opacity:1}}))),e.React.createElement(R,{style:{backgroundColor:t.bgDark,borderRadius:5,padding:10,marginBottom:15,marginTop:5,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},onPress:function(){let c=L?.current;x(!1),c?.scrollToEnd?.({animated:!0})}},e.React.createElement(w,{source:p.getAssetIDByName("ic_jump_to_bottom_24px"),style:{opacity:1}}),e.React.createElement(C.Forms.FormText,{style:{color:t.test,fontSize:16,fontFamily:e.constants.Fonts.PRIMARY_BOLD,textTransform:"uppercase"}},v.JUMP_BOTTOM[e.i18n.getLocale()]??"Jump to the bottom"),e.React.createElement(f,null)),e.React.createElement(R,{style:{backgroundColor:t.bgDark,borderRadius:5,padding:10,marginBottom:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},onPress:function(){let c=L?.current;x(!1),c?.scrollTo?.({y:0,animated:!0})}},e.React.createElement(w,{source:p.getAssetIDByName("ic_jump_to_bottom_24px"),style:{opacity:1,transform:[{scaleY:-1}]}}),e.React.createElement(C.Forms.FormText,{style:{color:t.test,fontSize:16,fontFamily:e.constants.Fonts.PRIMARY_BOLD,textTransform:"uppercase"}},v.JUMP_TOP[e.i18n.getLocale()]??"Jump to the top"),e.React.createElement(f,null))))));return e.React.createElement(ae,{initialRouteName:"FILE_CONTENT_PREVIEW",screens:{FILE_CONTENT_PREVIEW:{headerLeft:ne(function(){return W.popModal("file-content-preview")}),headerRight:se(function(){te(n,0).then(function(c){c?m.showToast(v.FILE_SAVED[e.i18n.getLocale()]??"File saved",p.getAssetIDByName("ic_selection_checked_24px")):m.showToast(v.FILE_SAVE_ERROR[e.i18n.getLocale()]??"Error saving file",p.getAssetIDByName("ic_close_circle"))})},function(){e.clipboard.setString(n),m.showToast(e.i18n.Messages.COPIED+" "+e.i18n.Messages.SEARCH_ANSWER_HAS_LINK,p.getAssetIDByName("toast_copy_link"))}),render:function(){return r.content?we:g},headerTitle:function(){let c=_(S.theme,E.semanticColors.HEADER_PRIMARY);return e.React.createElement(R,{onPress:function(){e.clipboard.setString(a),m.showToast(e.i18n.Messages.COPIED_TEXT,p.getAssetIDByName("toast_copy_message"))}},e.React.createElement(T,{numberOfLines:1,style:{color:c}},a),e.React.createElement(T,{numberOfLines:1,style:{color:c,fontSize:12}},V.intword(i,["bytes","KB","MB","GB","TB","PB"],1024,void 0,void 0,void 0," ")))}}}})}}const ie=s.findByStoreName("MessageStore"),le=s.findByStoreName("SelectedChannelStore"),{MessagesHandlers:N}=s.findByProps("MessagesHandlers");let ce=function(a){if(a.__fcp_patched)return;a.__fcp_patched=!0;let n=[];return a.hasOwnProperty("handleTapInviteEmbed")&&n.push(U.before("handleTapInviteEmbed",a,function(i){let[{nativeEvent:{index:o,messageId:r}}]=i,l=le.getChannelId(),g=ie.getMessage(l,r),h=g.codedLinks,D=g.attachments;if(o>=h.length){let y=o-h.length,b=D[y];W.pushModal({key:"file-content-preview",modal:{key:"file-content-preview",modal:oe(b.filename,b.url,b.size),animation:"slide-up",shouldPersistUnderModals:!1,closable:!0}})}})),function(){a.__fcp_patched=!1,n.forEach(function(i){return i()})}};function ue(){let a=[],n=function(o){let r=ce(o);r&&a.push(r)};const i=Object.getOwnPropertyDescriptor(N.prototype,"params").get;return i&&Object.defineProperty(N.prototype,"params",{configurable:!0,get(){return this&&n(this),i.call(this)}}),function(){i&&Object.defineProperty(N.prototype,"params",{configurable:!0,get:i}),a.forEach(function(o){return o()})}}const de=new Set(["1c","4d","abnf","accesslog","ada","arduino","ino","armasm","arm","avrasm","actionscript","as","alan","ansi","i","log","ln","angelscript","asc","apache","apacheconf","applescript","osascript","arcade","asciidoc","adoc","aspectj","autohotkey","autoit","awk","mawk","nawk","gawk","bash","sh","zsh","basic","bbcode","blade","bnf","brainfuck","bf","csharp","cs","c","h","cpp","hpp","cc","hh","c++","h++","cxx","hxx","cal","cos","cls","cmake","cmake.in","coq","csp","css","csv","capnproto","capnp","chaos","kaos","chapel","chpl","cisco","clojure","clj","coffeescript","coffee","cson","iced","cpc","crmsh","crm","pcmk","crystal","cr","cypher","d","dns","zone","bind","dos","bat","cmd","dart","delphi","dpr","dfm","pas","pascal","freepascal","lazarus","lpr","lfm","diff","patch","django","jinja","dockerfile","docker","dsconfig","dts","dust","dst","dylan","ebnf","elixir","ex","elm","erlang","erl","extempore","xtlang","xtm","fsharp","fs","fix","fortran","f90","f95","gcode","nc","gams","gms","gauss","gss","godot","gdscript","gherkin","gn","gni","go","golang","gf","golo","gololang","gradle","groovy","xml","html","xhtml","rss","atom","xjb","xsd","xsl","plist","svg","http","https","haml","handlebars","hbs","html.hbs","html.handlebars","haskell","hs","haxe","hx","hy","hylang","ini","toml","inform7","i7","irpf90","json","java","jsp","javascript","js","jsx","jolie","iol","ol","julia","julia-repl","kotlin","kt","tex","leaf","lean","lasso","ls","lassoscript","less","ldif","lisp","livecodeserver","livescript","lock","ls","lua","makefile","mk","mak","make","markdown","md","mkdown","mkd","mathematica","mma","wl","matlab","maxima","mel","mercury","mirc","mrc","mizar","mojolicious","monkey","moonscript","moon","n1ql","nsis","never","nginx","nginxconf","nim","nimrod","nix","ocl","ocaml","ml","objectivec","mm","objc","obj-c","obj-c++","objective-c++","glsl","openscad","scad","ruleslanguage","oxygene","pf","pf.conf","php","php3","php4","php5","php6","php7","parser3","perl","pl","pm","plaintext","txt","text","pony","pgsql","postgres","postgresql","powershell","ps","ps1","processing","prolog","properties","protobuf","puppet","pp","python","py","gyp","profile","python-repl","pycon","k","kdb","qml","r","cshtml","razor","razor-cshtml","reasonml","re","redbol","rebol","red","red-system","rib","rsl","graph","instances","robot","rf","rpm-specfile","rpm","spec","rpm-spec","specfile","ruby","rb","gemspec","podspec","thor","irb","rust","rs","SAS","sas","scss","sql","p21","step","stp","scala","scheme","scilab","sci","shexc","shell","console","smali","smalltalk","st","sml","ml","solidity","sol","stan","stanfuncs","stata","iecst","scl","structured-text","stylus","styl","subunit","supercollider","sc","svelte","swift","tcl","tk","terraform","tf","hcl","tap","thrift","tp","tsql","twig","craftcms","typescript","ts","tsx","unicorn-rails-log","vbnet","vb","vba","vbscript","vbs","vhdl","vala","verilog","v","vim","axapta","x++","x86asm","xl","tao","xquery","xpath","xq","yml","yaml","zephir","zep"]),pe=s.findByName("RowManager"),ge=s.findByProps("Messages"),{getLocale:fe}=s.findByProps("getLocale");function he(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"unknown",n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"? bytes";return{borderColor:-251658241,backgroundColor:-13947599,thumbnailCornerRadius:15,headerColor:-4867391,headerText:"",acceptLabelBackgroundColor:-14441126,titleText:ge.Messages.SEARCH_ANSWER_HAS_ATTACHMENT.toUpperCase()+" \u2014 "+n,type:null,extendedType:4,participantAvatarUris:[],acceptLabelText:v.PREVIEW[fe()]??"Preview",noParticipantsText:`
`+a,ctaEnabled:!0}}function Ee(){return U.after("generate",pe.prototype,function(a,n){let[i]=a,{message:o}=n;if(i.rowType!=1||!o.attachments)return;let r=[],l=[];o.attachments.forEach(function(g){de.has(g.filename.toLowerCase().split(".").pop())?r.push(he(g.filename,g.size)):l.push(g)}),r.length&&(o.codedLinks.push(...r),o.attachments=l)})}const{StyleSheet:ye,PanResponder:Re}=e.ReactNative,I=s.findByStoreName("ThemeStore"),{meta:{resolveSemanticColor:O}}=s.findByProps("colors","meta"),{View:F}=C.General,{useState:be,useRef:me}=e.React,j={sliderOff:O(I.theme,E.semanticColors.DEPRECATED_QUICKSWITCHER_INPUT_BACKGROUND),sliderOn:O(I.theme,E.semanticColors.REDESIGN_BUTTON_PRIMARY_BACKGROUND),thumb:O(I.theme,E.semanticColors.MENTION_FOREGROUND)},Ce=function(a){let{onSlide:n,value:i}=a;const o=i||0,[r,l]=be(0),g=me(null);function h(u){g.current&&g.current.measure(function(d,t,z,q,M,K){let x=(u-M)/(z-M)*100;const L=Math.min(Math.max(0,Math.round(x/5)*5),100);n&&n(L)})}const D=e.React.useRef(Re.create({onStartShouldSetPanResponder:function(u,d){return!0},onStartShouldSetPanResponderCapture:function(u,d){return!0},onMoveShouldSetPanResponder:function(u,d){return!0},onMoveShouldSetPanResponderCapture:function(u,d){return!0},onPanResponderGrant:function(u,d){h(d.x0)},onPanResponderMove:function(u,d){h(d.moveX)},onPanResponderTerminationRequest:function(u,d){return!0},onPanResponderRelease:function(u,d){},onPanResponderTerminate:function(u,d){},onShouldBlockNativeResponder:function(u,d){return!0}})).current;function y(u){l(u.nativeEvent.layout.width)}const b=ye.create({container:{marginLeft:"5%",width:"90%",height:20,borderRadius:25,backgroundColor:j.sliderOff,marginBottom:25},slid:{width:o+"%",height:"100%",borderTopLeftRadius:25,borderBottomLeftRadius:25,borderRadius:o===100?25:0,backgroundColor:j.sliderOn,justifyContent:"center"},thumb:{height:"150%",aspectRatio:1,alignSelf:"flex-end",right:-(r/2),borderRadius:100,backgroundColor:j.thumb}});return e.React.createElement(F,{style:b.container,...D.panHandlers,ref:g},e.React.createElement(F,{style:b.slid},e.React.createElement(F,{style:b.thumb,onLayout:y})))},{ScrollView:Be}=e.ReactNative,{Text:ve}=C.General,xe=s.findByStoreName("ThemeStore"),{meta:{resolveSemanticColor:Se}}=s.findByProps("colors","meta"),_e={text:Se(xe.theme,E.semanticColors.TEXT_NORMAL)},Te=s.findByProps("intword");function ke(){$.useProxy(B.storage),B.storage.chunkSize??=60928;let a=1024e3,n=10240,i=function(l){return l/100*(a-n)+n},o=function(l){return(l-n)/(a-n)*100},r=function(l){return Te.intword(l,["bytes","KB","MB","GB","TB","PB"],1024,void 0,void 0,void 0," ")};return React.createElement(Be,{style:{flex:1,marginTop:10}},React.createElement(Z.FormRow,{label:"Load chunk size",subLabel:"How many bytes to load at a time"}),React.createElement(Ce,{onSlide:function(l){B.storage.chunkSize=i(l)},value:o(B.storage.chunkSize),style:{marginBottom:0}}),React.createElement(ve,{style:{marginLeft:"5%",color:_e.text,fontFamily:e.constants.Fonts.DISPLAY_MEDIUM,fontSize:16,marginBottom:5,marginTop:-5}},"Current value: ",`${r(B.storage.chunkSize)} (${Math.round(o(B.storage.chunkSize))}%)`))}let H=[];var Pe={onLoad:function(){H.push(ue()),H.push(Ee())},onUnload:function(){for(const a of H)a()},settings:ke};return A.default=Pe,Object.defineProperty(A,"__esModule",{value:!0}),A})({},vendetta.metro,vendetta.patcher,vendetta.ui,vendetta.ui.assets,vendetta.ui.toasts,vendetta.metro.common,vendetta.ui.components,vendetta.plugin,vendetta.ui.components.Forms,vendetta.storage);
