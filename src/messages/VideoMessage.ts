import { IVideoMessage, IMessage } from "@interfaces/Messages";
import { IUser } from "@interfaces/User";
import { IChat } from "@interfaces/Chat";

import MediaMessage from "@messages/MediaMessage";

export default class VideoMessage extends MediaMessage implements IVideoMessage {
  constructor(
    chat: IChat | string,
    text: string,
    file: any,
    mention?: IMessage,
    id?: string,
    user?: IUser | string,
    fromMe?: boolean,
    selected?: string,
    mentions?: string[],
    timestamp?: Number | Long
  ) {
    super(chat, text, file, mention, id, user, fromMe, selected, mentions, timestamp);
  }

  public getVideo() {
    return this.getStream(this.file);
  }
}
