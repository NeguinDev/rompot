"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MediaMessage_1 = __importDefault(require("./MediaMessage"));
class VideoMessage extends MediaMessage_1.default {
    constructor(chat, text, file, mention, id, user, fromMe, selected, mentions, timestamp) {
        super(chat, text, file, mention, id, user, fromMe, selected, mentions, timestamp);
    }
    getVideo() {
        return this.getStream(this.file);
    }
}
exports.default = VideoMessage;
//# sourceMappingURL=VideoMessage.js.map