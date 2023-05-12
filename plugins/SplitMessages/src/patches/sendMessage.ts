import { findByProps, findByStoreName } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

const Messages = findByProps("sendMessage", "receiveMessage"),
    SelectedChannelStore = findByStoreName("SelectedChannelStore"),
    UserStore = findByStoreName("UserStore");

export default function patchSendMessage(oldVals) {
    
	return before("sendMessage", Messages, (args) => {
		// Parse the intended message content and get the max message length for the user
		let content = args[1].content as string;
        let limit = UserStore.getCurrentUser().premiumType == 2 ? oldVals.MAX_MESSAGE_LENGTH_PREMIUM : oldVals.MAX_MESSAGE_LENGTH;

        if (content.length <= limit) return; // If the message doesn't need to be split then we can just stop execution

        /**
         * Splits a string into a maximum number of characters, while ensuring that words are not broken across the split by looking for nearby spaces or line breaks.
         *
         * @param {string} str - The input string to split.
         * @param {number} limit - The maximum length of the split string.
         * @param {number} spacedist - The minimum distance between the end of the split string and the nearest space or line break. This is used to avoid breaking words across the split.
         * @returns {{str: string, remaining: string}} An object with two properties: `str` is the split string of the specified length, and `remaining` is the remaining part of the original string that was not included in `str`.
         */
        function getchunk(str, limit, spacedist) {
            let delims = [" ", "\n"];

            /**
             * Returns the index of the last delimiter character in a string for a given set of characters.
             * @param {string[]} chars - An array of characters to search for in the string.
             * @param {string} str - The string to search in.
             * @returns {number} The index of the last delimiter character found in the string.
             */
            function getLast(chars, str) {
                let last = -1;
                chars.forEach(a=>{if (str.lastIndexOf(a)>last) last = str.lastIndexOf(a) });
                return last;
            };
        
            // Return the string if it's shorter than the char limit.
            if (str.length<limit) return ({str: str, remaining: ""}); 

            // Ignore the space distance if it exceeds the limit.
            if (spacedist > limit) spacedist = 0; 
        
            // Create the new string with the maximum allowed characters.
            let newstr = str.substring(0, limit); 

            // Look ahead for a delimiter within the specified distance.
            let sppos = getLast(delims, newstr.slice(( -(spacedist) )) );

            // If found, shorten the text a bit as to not split the word
            if (sppos>-1) {
                newstr = newstr.substring(0, newstr.length-spacedist+sppos+1); 
            };
            
            // Return the split string and the remaining string.
            return {str: newstr, remaining: str.substring(newstr.length, str.length)}
        };

        /**
         * Splits a text into multiple chunks of a maximum length, while accounting for spaces and line breaks to ensure that words are not broken across chunks.
         *
         * @param {string} text - The input text to split into chunks.
         * @param {number} max_size - The maximum length of each chunk.
         * @param {number} space_gap - The maximum distance between the end of a chunk and the nearest space or line break. This is used to avoid breaking words across chunks.
         * @returns {string[]} An array of strings, each representing a chunk of the input text.
         */
        function SplitTextInChunks(text, max_size, space_gap) {
            // Initialize an empty array to hold the resulting chunks
            let arr = [];

            // Call the getchunk function to split the text into chunks
            let res = getchunk(text, max_size, space_gap);

            // Keep calling getchunk on the remaining text until all chunks have been processed
            do {
                arr.push(res.str);
                res = getchunk(res.remaining, max_size, space_gap);
            } while (res.remaining.length != "");

            // Push the final chunk to the array and return it
            if (res.str != "") arr.push(res.str);
            return arr;
        };

        var chunks = SplitTextInChunks(content, limit, 50);

        chunks.slice(1).forEach((str,i)=>{
            // Send each chunk with a delay of 200ms between each to avoid rate limits.
            setTimeout(()=>{
                Messages.sendMessage(
                    SelectedChannelStore.getChannelId(),
                    { content: str }
                );
            }, 200*(i+1));
        });

		// Update message content with the updated content
		args[1].content = chunks[0];
	});
};