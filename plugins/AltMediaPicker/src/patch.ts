import { findByDisplayName, findByProps, findByStoreName } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

const SelectedChannelStore = findByStoreName("SelectedChannelStore");

function mediapick(channelId) {
    findByProps("launchImageLibrary").launchImageLibrary(
        {
          mediaType: "photo",
        },
        ({ assets }) => {
          findByProps("handleAttachFile").handleSelectKeyboardItem(
            channelId,
            {
              node: {
                image: {
                  playableDuration: 0,
                  height: assets[0].height,
                  filename: assets[0].fileName,
                  width: assets[0].width,
                  mimeType: assets[0].type,
                  uri: assets[0].uri,
                },
                type: "ALAssetTypePhoto",
              },
            },
            false,
            { target: 0 },
            undefined
          );
        }
      );
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

