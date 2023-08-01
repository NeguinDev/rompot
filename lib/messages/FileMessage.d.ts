/// <reference types="node" />
import { IChat, IFileMessage, Media, MessageType } from "rompot-base";
import MediaMessage from "./MediaMessage";
export default class FileMessage extends MediaMessage implements IFileMessage {
    readonly type = MessageType.File;
    constructor(chat: IChat | string, text: string, file: Media | Buffer | string, others?: Partial<FileMessage>);
    /**
     * @returns Obter arquivo
     */
    getFile(): Promise<Buffer>;
}
