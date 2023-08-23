import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
const RowManager = findByName("RowManager");

function makeRPL(filename = "unknown", size = "? bytes") {
    return { borderColor: -251658241,
           backgroundColor: -13947599,
           thumbnailCornerRadius: 15,
           headerColor: -4867391,
           headerText: '',
           acceptLabelBackgroundColor: -14441126,
           titleText: 'FILE — ' + size,
           type: null,
           extendedType: 4,
           participantAvatarUris: [],
           acceptLabelText: 'Preview',
           noParticipantsText: '\n' + filename,
           ctaEnabled: true }
    };

export default function() {
    return after("generate", RowManager.prototype, ([row], {message}) => {
        if (row.rowType != 1) return;
        if (!message.attachments) return;
        let rpls = [];
        let attachs = [];
        message.attachments.forEach(attachment => {
            if (attachment.filename.toLowerCase().endsWith(".txt")) {
            rpls.push(makeRPL(attachment.filename, attachment.size));
        } else {
            attachs.push(attachment);
        };
        });
        if (rpls.length) {message.codedLinks.push(...rpls); message.attachments = attachs};
  })
};