import { findByDisplayName, findByProps, findByStoreName } from "@vendetta/metro";
import { ReactNative } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";

const { NativeModules: nm } = ReactNative;
const SelectedChannelStore = findByStoreName("SelectedChannelStore");

// https://stackoverflow.com/a/58326357
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const FileManager = nm.DCDFileManager ?? nm.RTNFileManager;

function mediapick(channelId) {
    findByProps("openImagePicker").openImagePicker({}).then(image => {
        if (!image) return;
        let id = genRanHex(24)+".png";
        FileManager.writeFile('cache', id, image.split(",")[1], 'base64').then(cacheUri => {
            ReactNative.Image.getSize('file://'+cacheUri, ((w,h)=>{

            findByProps("handleAttachFile").handleSelectKeyboardItem(channelId,  { node: 
                { image: 
                { playableDuration: 0,
                    height: h,
                    filename: id,
                    width: w,
                    mimeType: 'image/png',
                    uri: 'file://'+cacheUri },
                type: 'ALAssetTypePhoto' } }, false, {target:0}, undefined);

            }));
        });
    });
};

const Pressable = findByDisplayName("Pressable",false);

export default function patch() {
    return before("render", Pressable.default.type, (args) => {
        if(!args) return;
        if(!args[0]) return;
        const [ props ] = args;
        
        if (props.accessibilityLabel != "Files") return;
        
        props.onPress = function() {
          mediapick(SelectedChannelStore.getChannelId());
        };
    });
};

