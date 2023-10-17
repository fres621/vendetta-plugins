import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { audioId, getAudioState, msToTime } from "../shared";

const defaultEmbed = { 
    type: "rich",
    spoiler: '',
    provider: undefined, author: undefined, rawTitle: undefined, title: undefined, url: undefined, 
    rawDescription: '', 
    description: [ { content: '', type: 'text' } ],
    thumbnail: undefined, image: undefined, images: undefined, fields: [], footer: undefined, video: undefined,
    borderLeftColor: -14803166,
    providerColor: -3880498,
    headerTextColor: -4867391,
    bodyTextColor: -2367775,
    referenceId: undefined, backgroundColor: undefined 
};

const RowManager = findByName("RowManager");
const filetypes = new Set(["mp3", "m4a", "ogg", "wav"]);

function makeAudioEmbed(messageId: string, channelId: string, id: string, filename: string, audioUrl: string, size) {
    let encodedUrl = Buffer.from(audioUrl).toString('base64');
    let l = ({index, content}) => ({type: "link", target: `https://discord.com/channels/${audioId}/${index}/${channelId}/${messageId}/${id}/${encodedUrl}`, content: [{type: 'inlineCode', content}]});
    let state = getAudioState();
    let isActive = (state.id === id);
    let sliderIndex = isActive ? state.sliderIndex : "0";
    let isPlaying = isActive ? (state.state === 'playing') : false;
    let thisTime = isActive ? state.time?.t : undefined;

    let slider = Array.from({length: 20}).map((_, index)=>{
        let content = '▬';
        if (index.toString() === sliderIndex) content = '▆';
        return l({index, content});
    });

    let firstline = isActive ? [
        {type: "text", content: state.state + " — "}, 
        {type: "strong", content: [{type: "text", content: msToTime(thisTime ?? 0)}]},
        {type: "text", content: " / "},
        {type: "strong", content: [{type: "text", content: msToTime(state.duration)}]},
        {type: "text", content: "\n"}
    ] : [{type: "text", content: "\n"}];

    return {
        ...defaultEmbed, 
        author: {
            name: filename,
            url: audioUrl
        },
        description: [{
            content: [
                ...firstline,
                ...slider,
                {
                    type: "heading",
                    content: [(isPlaying ? l({index: 200, content: "॥"}) : l({index: 100, content: "▶"}))],
                    level: 1
                }
            ],
            type: "paragraph"
        }],
        footer: {
            content: size
        }
    };
}


export default function patch() {
    return after("generate", RowManager.prototype, ([_], {message}: {message}) => {
        if (!message?.embeds) return;
        if (!message?.attachments?.length) return;
        let audioEmbeds: any[] = [];
        let attachs: any[] = [];
        message.attachments.forEach((attachment: any) => {
            if (filetypes.has(attachment.filename.toLowerCase().split(".").pop()!)) {
                audioEmbeds.push(makeAudioEmbed(message.id, message.channelId, attachment.id, attachment.filename, attachment.url, attachment.size));
            } else {
                attachs.push(attachment);
            };
        });
        if (audioEmbeds.length) {message.embeds.push(...audioEmbeds); message.attachments = attachs};
        if (message?.reactions?.length) message.reactions = message.reactions.filter(reaction => reaction.emoji.id != '4259920');
    });
};