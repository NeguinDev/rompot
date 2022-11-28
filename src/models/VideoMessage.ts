import { MediaMessage } from "@models/MediaMessage";
import { Message } from "@models/Message";
import { Chat } from "@models/Chat";

export class VideoMessage extends MediaMessage {
  constructor(chat: Chat, text: string, video: any, mention?: Message, id?: string) {
    super(chat, text, mention, id);

    this.setVideo(video);
  }
}
