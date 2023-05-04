import { findByProps, findByStoreName } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

const Messages = findByProps("sendMessage", "receiveMessage"),
    SelectedChannelStore = findByStoreName("SelectedChannelStore"),
    UserStore = findByStoreName("UserStore");



export default function patchSendMessage(oldVals) {
    
	return before("sendMessage", Messages, (args) => {
		// The message content
		let content = args[1].content as string;
        console.log(args);
        let limit = UserStore.getCurrentUser().premiumType == 2 ? oldVals.MAX_MESSAGE_LENGTH_PREMIUM : oldVals.MAX_MESSAGE_LENGTH;
        if (content.length <= limit) return;
        var chunks = [];
        for (var i = 0, charsLength = content.slice(limit).length; i < charsLength; i += limit) {
            chunks.push(content.slice(limit).substring(i, i + limit));
        }
        chunks.forEach((str,i)=>{
            setTimeout(()=>{Messages.sendMessage(
                SelectedChannelStore.getChannelId(),
                { content: str }
                )}, 250*(i+1));
        });

		// Update message content with the updated content
		args[1].content = content.substring(0,limit);
	});
};