import { IMediaMessage, IMessage } from "../interfaces/IMessage";
import { FileMessage, ImageMessage, VideoMessage, StickerMessage, AudioMessage, Message, ButtonMessage, ContactMessage, ListMessage, EmptyMessage, ReactionMessage, LocationMessage, PollMessage, PollUpdateMessage } from "../messages/index";
export declare function isMessage(message: any): message is IMessage;
export declare function isMediaMessage(message: any): message is IMediaMessage;
export declare function isFileMessage(message: any): message is FileMessage;
export declare function isImageMessage(message: any): message is ImageMessage;
export declare function isVideoMessage(message: any): message is VideoMessage;
export declare function isStickerMessage(message: any): message is StickerMessage;
export declare function isAudioMessage(message: any): message is AudioMessage;
export declare function isTextMessage(message: any): message is Message;
export declare function isButtonMessage(message: any): message is ButtonMessage;
export declare function isButtonTemplateMessage(message: any): message is ButtonMessage;
export declare function isContactMessage(message: any): message is ContactMessage;
export declare function isListMessage(message: any): message is ListMessage;
export declare function isLocationMessage(message: any): message is LocationMessage;
export declare function isPollMessage(message: any): message is PollMessage;
export declare function isPollUpdateMessage(message: any): message is PollUpdateMessage;
export declare function isReactionMessage(message: any): message is ReactionMessage;
export declare function isEmptyMessage(message: any): message is EmptyMessage;
