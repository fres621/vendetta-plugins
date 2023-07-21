import { findByDisplayName, findByProps, findByStoreName } from "@vendetta/metro";
import { before, instead } from "@vendetta/patcher";

const SelectedChannelStore = findByStoreName("SelectedChannelStore");

function mediapick(channelId) {
    findByProps("launchImageLibrary").launchImageLibrary({
        mediaType: 'photo'
      }, ({assets})=>{
          if (!assets) return;
          assets = assets.slice(0, 10);
          assets.forEach(asset => {
                findByProps("handleAttachFile").handleSelectKeyboardItem(
                  channelId,
                  {
                    node: {
                      image: {
                        playableDuration: 0,
                        height: asset.height,
                        filename: asset.fileName,
                        width: asset.width,
                        mimeType: asset.type,
                        uri: asset.uri,
                      },
                      type: "ALAssetTypePhoto",
                    },
                  },
                  false,
                  { target: 0 },
                  undefined
                );
          });
      })
};

export default function patch() {
  return instead("handleAttachFile", findByProps("handleAttachFile"), (args, orig)=>{
    mediapick(SelectedChannelStore.getChannelId());
  });
};

