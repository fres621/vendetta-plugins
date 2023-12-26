import { findByProps, findByName } from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";
import translations from "../translations";
import filetypes from "../filetypes";
import { ReactNative } from "@vendetta/metro/common";

const RowManager = findByName("RowManager");

const Locale = findByProps("Messages");
const { getLocale } = findByProps("getLocale");

function makeRPL(filename = "unknown", size = "? bytes") {
    return { borderColor: -251658241,
           backgroundColor: -13947599,
           thumbnailCornerRadius: 15,
           headerColor: -4867391,
           headerText: '',
           acceptLabelBackgroundColor: -14441126,
           titleText: Locale.Messages.SEARCH_ANSWER_HAS_ATTACHMENT.toUpperCase() + ' — ' + size,
           type: null,
           extendedType: 4,
           participantAvatarUris: [],
           acceptLabelText: translations.PREVIEW[getLocale()] ?? "Preview",
           noParticipantsText: '\n' + filename,
           ctaEnabled: true }
    };

function handleRow(row) {
    const { message } = row;
    if (!message) return;
    if (!message.attachments) return;
    let rpls: any[] = [];
    let attachs: any[] = [];
    message.attachments.forEach(attachment => {
        if (filetypes.has(attachment.filename.toLowerCase().split(".").pop())) {
            rpls.push(makeRPL(attachment.filename, attachment.size));
        } else {
            attachs.push(attachment);
        };
    });
    if (rpls.length) {
        if (!message.codedLinks?.length) message.codedLinks = [];
        message.codedLinks.push(...rpls); message.attachments = attachs
    };
}


const { NativeModules: nm } = ReactNative;

const { DCDChatManager, InfoDictionaryManager, RTNClientInfoManager } = nm;
const clientInfo = InfoDictionaryManager ?? RTNClientInfoManager;

export default function() {
    if (parseInt(clientInfo.Build) > 200013) {
        return before("updateRows", DCDChatManager, (args) => {
            var rows = JSON.parse(args[1]);

            for (const row of rows) {
                handleRow(row);
            }

            args[1] = JSON.stringify(rows);
        });
    } else {
        return after("generate", RowManager.prototype, (_, row) => {
            handleRow(row);
        });
    }
};
