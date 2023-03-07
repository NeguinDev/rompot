import EventEmitter from "events";

import { IUser } from "@interfaces/User";
import { IChat } from "@interfaces/Chat";

import { Message } from "@messages/Message";

import { UserModule } from "@modules/User";
import { ChatModule } from "@modules/Chat";

import { ConnectionType } from "../types/Connection";
import { UserAction } from "../types/User";
import { ChatAction } from "../types/Chat";
import { IMessage } from "@interfaces/Messages";

export type BotEventsMap = {
  /**
   * * Conexão alterada
   * @param action Tipo da conexão
   * @param isNewLogin Se é um novo bot
   */
  conn: { action: ConnectionType; isNewLogin?: boolean; qr?: string };

  /**
   * * Client conectou
   * @param isNewLogin Se é um novo login
   */
  open: { isNewLogin: boolean };

  /** * Client reconectando */
  reconnecting: {};

  /** * Client conectando */
  connecting: {};

  /** * Sessão do bot encerrada */
  closed: {};

  /** * Conexão fechada */
  close: {};

  /** * QR code gerado */
  qr: string;

  /**
   * * Novo usuário
   * @param action Ação ocorrida
   * @param chat Sala de bate-papo que recebeu o novo usuário
   * @param user Usuário
   */
  user: { action: UserAction; chat: IChat; user: IUser };

  /**
   * * Sala de bate-papo alterado
   * @param action ação ocorrida
   * @param chat Sala de bate-papo que foi alterada
   */
  chat: { action: ChatAction; chat: IChat };

  /** * Nova mensagem */
  message: IMessage;

  /** * Mensagem enviada pelo bot */
  me: IMessage;

  /** * Erro ocorrido */
  error: Error;
};

export type ClientEventsMap = {
  /**
   * * Conexão alterada
   * @param action Tipo da conexão
   * @param isNewLogin Se é um novo bot
   */
  conn: { action: ConnectionType; isNewLogin?: boolean; qr?: string };

  /**
   * * Client conectou
   * @param isNewLogin Se é um novo login
   */
  open: { isNewLogin: boolean };

  /** * Client reconectando */
  reconnecting: {};

  /** * Client conectando */
  connecting: {};

  /** * Sessão do bot encerrada */
  closed: {};

  /** * Conexão fechada */
  close: {};

  /** * QR code gerado */
  qr: string;

  /**
   * * Novo usuário
   * @param action Ação ocorrida
   * @param chat Sala de bate-papo que recebeu o novo usuário
   * @param user Usuário
   */
  user: { action: UserAction; chat: ChatModule; user: UserModule };

  /**
   * * Sala de bate-papo alterado
   * @param action ação ocorrida
   * @param chat Sala de bate-papo que foi alterada
   */
  chat: { action: ChatAction; chat: ChatModule };

  /** * Nova mensagem */
  message: Message;

  /** * Mensagem enviada pelo bot */
  me: Message;

  /** * Erro ocorrido */
  error: Error;
};

export class ClientEvents {
  public events = new EventEmitter();

  constructor() {
    this.on("close", () => {
      this.emit("conn", { action: "close" });
    });

    this.on("open", (update: { isNewLogin: boolean }) => {
      this.emit("conn", { action: "open", isNewLogin: update.isNewLogin });
    });

    this.on("qr", (qr: string) => {
      this.emit("conn", { action: "qr", qr });
    });

    this.on("closed", () => {
      this.emit("conn", { action: "closed" });
    });

    this.on("reconnecting", () => {
      this.emit("conn", { action: "reconnecting" });
    });

    this.on("connecting", () => {
      this.emit("conn", { action: "qr" });
    });
  }

  on<T extends keyof BotEventsMap>(eventName: T, listener: (arg: BotEventsMap[T]) => void) {
    this.events.on(eventName, listener);
  }

  off<T extends keyof BotEventsMap>(eventName: T, listener: (arg: BotEventsMap[T]) => void): void {
    this.events.off(eventName, listener);
  }

  removeAllListeners<T extends keyof BotEventsMap>(event: T): void {
    this.events.removeAllListeners(event);
  }

  /** * Emite um evento */
  emit<T extends keyof BotEventsMap>(eventName: T, arg: BotEventsMap[T]): boolean {
    return this.events.emit(eventName, arg);
  }
}

export class BotEvents {
  public events = new EventEmitter();

  constructor() {
    this.on("close", () => {
      this.emit("conn", { action: "close" });
    });

    this.on("open", (update: { isNewLogin: boolean }) => {
      this.emit("conn", { action: "open", isNewLogin: update.isNewLogin });
    });

    this.on("qr", (qr: string) => {
      this.emit("conn", { action: "qr", qr });
    });

    this.on("closed", () => {
      this.emit("conn", { action: "closed" });
    });

    this.on("reconnecting", () => {
      this.emit("conn", { action: "reconnecting" });
    });

    this.on("connecting", () => {
      this.emit("conn", { action: "qr" });
    });
  }

  on<T extends keyof BotEventsMap>(eventName: T, listener: (arg: BotEventsMap[T]) => void) {
    this.events.on(eventName, listener);
  }

  off<T extends keyof BotEventsMap>(eventName: T, listener: (arg: BotEventsMap[T]) => void): void {
    this.events.off(eventName, listener);
  }

  removeAllListeners<T extends keyof BotEventsMap>(event: T): void {
    this.events.removeAllListeners(event);
  }

  /** * Emite um evento */
  emit<T extends keyof BotEventsMap>(eventName: T, arg: BotEventsMap[T]): boolean {
    return this.events.emit(eventName, arg);
  }
}
