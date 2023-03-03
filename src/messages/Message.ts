import { IMessage } from "@interfaces/IMessage";
import IChat from "@interfaces/IChat";

import BotBase from "@modules/BotBase";
import Chat from "@modules/Chat";
import User from "@modules/User";

import { setBotProperty } from "@utils/bot";

import { Bot } from "../types/Bot";

import MediaMessage from "./MediaMessage";

export default class Message implements IMessage {
  public id: string;
  public chat: Chat;
  public user: User;
  public text: string;
  public fromMe: boolean;
  public selected: string;
  public mentions: string[];
  public mention?: Message;
  public timestamp: Number | Long;

  get bot(): Bot {
    return new BotBase();
  }

  constructor(chat: IChat | string, text: string, mention?: IMessage, id?: string) {
    this.chat = Chat.Inject(this.bot, Chat.getChat(chat));

    this.id = id || String(Date.now());
    this.user = new User(this.bot.id);
    this.text = text;
    this.fromMe = true;
    this.selected = "";
    this.mentions = [];

    if (mention) {
      this.mention = Message.Inject(this.bot, mention);
    } else {
      this.mention = mention;
    }

    this.timestamp = Date.now();
  }

  public async addReaction(reaction: string): Promise<void> {
    return this.bot.addReaction(this, reaction);
  }

  public async reply(message: IMessage | string, mention: boolean = true): Promise<Message> {
    const msg = Message.getMessage(message);

    if (mention) msg.mention = this;

    return this.bot.send(msg);
  }

  public async read(): Promise<void> {
    return this.bot.readMessage(this);
  }

  public inject<MessageIn extends IMessage>(bot: Bot, msg: MessageIn): void {
    this.id = msg.id;
    this.text = msg.text;
    this.fromMe = msg.fromMe;
    this.mentions = msg.mentions;
    this.timestamp = msg.timestamp;

    this.chat = Chat.Inject(bot, msg.chat);
    this.user = User.Inject(bot, msg.user);

    if (msg.mention) {
      this.mention = Message.Inject(bot, msg.mention);
    }

    if (msg instanceof MediaMessage && this instanceof MediaMessage) {
      this.getStream = msg.getStream;
    }

    setBotProperty(bot, this);
    setBotProperty(bot, this.chat);
    setBotProperty(bot, this.user);
  }

  /**
   * @param message Mensagem que será obtida
   * @returns Retorna a mensagem
   */
  public static getMessage<MessageIn extends IMessage>(message: MessageIn | string): MessageIn | IMessage {
    if (typeof message == "string") {
      return new Message(new Chat(""), message);
    }

    return message;
  }

  /**
   * @param message Mensagem
   * @returns Retorna o ID da mensagem
   */
  public static getMessageId(message: IMessage | string): string {
    if (typeof message == "string") {
      return String(message || "");
    }

    if (typeof message == "object" && !Array.isArray(message) && message?.id) {
      return String(message.id);
    }

    return String(message || "");
  }

  /**
   * * Injeta a interface no modulo
   * @param bot Bot que irá executar os métodos
   * @param message Interface da mensagem
   */
  public static Inject<MessageIn extends IMessage>(bot: Bot, msg: MessageIn): MessageIn & Message {
    const module: Message = new Message(msg.chat, msg.text);

    module.inject(bot, msg);

    return { ...msg, ...module };
  }
}
