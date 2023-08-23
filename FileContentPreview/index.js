(function(d,r,f,y,o,p){"use strict";const{Text:v,TouchableOpacity:E}=p.General,{FormIcon:b}=p.Forms,k=r.findByName("WebView"),{default:R,getRenderCloseButton:N}=r.findByProps("getRenderCloseButton"),m=r.findByProps("pushModal"),x=y.getAssetIDByName("ic_download_24px");function C(e){return function(){return o.createElement(E,{onPress:e},o.createElement(b,{source:x,style:{marginRight:8,marginLeft:-8,opacity:1}}))}}let T=1024*100;function B(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"unknown",s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"https://cdn.discordapp.com/attachments/593084706593964043/1143675462376239236/SPOILER_a.txt",l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1*1024*1024;return function(){const[t,n]=o.useState("");let i=`
        let url = "${s}";
        let maxBytes = 1;
        (async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const reader = response.body.getReader();
                let bytesRead = 0;
                let chunks = [];
                while (bytesRead < maxBytes) {
                    const {
                        done,
                        value
                    } = await reader.read();
                    if (done) {
                        break;
                    }
                    chunks.push(value);
                    bytesRead += value.length;
                }
                reader.cancel("Download size limit reached.");

                const result = new Uint8Array(bytesRead);
                let offset = 0;

                for (const chunk of chunks) {
                    result.set(chunk, offset);
                    offset += chunk.length;
                }

                let str = (new TextDecoder().decode(result));
                window.ReactNativeWebView.postMessage(str);
            } catch (error) {
                window.ReactNativeWebView.postMessage("Error reading file content: " + error.message);
            }
        })();
        `,a=o.createElement(k,{source:{uri:"https://cdn.discordapp.com/robots.txt"},style:{display:"none"},injectedJavaScript:i,onMessage:function(u){n(u.nativeEvent.data)}}),c=l>T;return!t&&c&&fetch(s).then(function(u){u.ok?u.text().then(function(h){n(h)}):n("Error reading file content: Network response was not ok")}),o.createElement(R,{initialRouteName:"FILE_CONTENT_PREVIEW",screens:{FILE_CONTENT_PREVIEW:{headerLeft:N(function(){return m.popModal("file-content-preview")}),headerRight:C(function(){console.log("uwu")}),render:function(){return o.createElement(o.Fragment,null,o.createElement(v,null,t||"Loading file content..."),c?null:a)},title:e.toUpperCase()}}})}}const L=r.findByStoreName("MessageStore"),I=r.findByStoreName("SelectedChannelStore");function M(){return f.after("render",r.findByName("Chat").prototype,function(e,s){f.before("onTapInviteEmbed",s.props,function(l){let[{nativeEvent:{index:t,messageId:n}}]=l,i=I.getChannelId(),a=L.getMessage(i,n),c=a.codedLinks,u=a.attachments;if(t>=c.length){let h=t-c.length,w=u[h];m.pushModal({key:"file-content-preview",modal:{key:"file-content-preview",modal:B("uwu",w.url,w.size),animation:"slide-up",shouldPersistUnderModals:!1,closable:!0}})}})})}const P=r.findByName("RowManager");function S(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"unknown";return{borderColor:-251658241,backgroundColor:-13947599,thumbnailCornerRadius:15,headerColor:-4867391,headerText:"",acceptLabelBackgroundColor:-14441126,titleText:"FILE \u2014 "+(arguments.length>1&&arguments[1]!==void 0?arguments[1]:"? bytes"),type:null,extendedType:4,participantAvatarUris:[],acceptLabelText:"Preview",noParticipantsText:`
`+e,ctaEnabled:!0}}function _(){return f.after("generate",P.prototype,function(e,s){let[l]=e,{message:t}=s;if(l.rowType!=1||!t.attachments)return;let n=[],i=[];t.attachments.forEach(function(a){a.filename.toLowerCase().endsWith(".txt")?n.push(S(a.filename,a.size)):i.push(a)}),n.length&&(t.codedLinks.push(...n),t.attachments=i)})}let g=[];var F={onLoad:function(){g.push(M()),g.push(_())},onUnload:function(){for(const e of g)e()}};return d.default=F,Object.defineProperty(d,"__esModule",{value:!0}),d})({},vendetta.metro,vendetta.patcher,vendetta.ui.assets,window.React,vendetta.ui.components);
