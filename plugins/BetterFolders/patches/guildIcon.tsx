import { storage } from "@vendetta/plugin";
import { findByPropsAll, findByStoreName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { after } from "@vendetta/patcher";
import { General } from "@vendetta/ui/components";
import updateFolderIcons from "../updateFolderIcons";

const { View, Image } = General;


export default function() {
    let patch = after("GuildContainer", findByPropsAll("GuildContainer").at(-1), ([props], b) =>{
      if (!storage.hideIcons) return;
      let GuildFolderPreview = props?.children?.type;
  
      if (!GuildFolderPreview?.type) { // Makes the plugin work for some older Discord versions
        if (props.expanded) return;
  
        let p = props?.children?.props;
        if (!p?.children?.[1]) return;
  
        let folderColor = p?.children?.[0]?.props?.style?.[1]?.backgroundColor;
        if (!folderColor) return;
  
        p.children[1] = (
          <View style={
            {
              "overflow": "hidden",
              "borderRadius": 16,
              "justifyContent": "center",
              "alignItems": "center",
              "height": 48,
              "width": 48
            }
          }>
            <Image source={getAssetIDByName("img_guild_folder")} style={{ tintColor: folderColor }} />
          </View>
        );
        return;
      };
  
      let p = after("type", GuildFolderPreview, ([folderProps], g) => {
        p();
        if (props.expanded) return;
        g.props.children[1] = (
          <View style={
            {
              "overflow": "hidden",
              "borderRadius": 16,
              "justifyContent": "center",
              "alignItems": "center",
              "height": 48,
              "width": 48
            }
          }>
            <Image source={getAssetIDByName("img_guild_folder")} style={folderProps.folderColor ? {tintColor: `#${folderProps.folderColor.toString(16)}`} : {}} />
          </View>
        );
      });
    });

    updateFolderIcons();

    return () => {
        updateFolderIcons();
        patch();
    };
  }