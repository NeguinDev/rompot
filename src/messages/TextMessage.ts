import Message, { MessageType } from "@messages/Message";
import Chat from "@src/chat/Chat";

import { injectJSON } from "@utils/Generic";

/**
 * Representa uma mensagem de texto.
 */
export default class TextMessage extends Message {
  /** O tipo da mensagem é sempre MessageType.Text. */
  public readonly type: MessageType.Text = MessageType.Text;

  /**
   * Cria uma nova instância de TextMessage.
   * @param chat - O chat associado à mensagem de texto (opcional).
   * @param text - O texto da mensagem (opcional).
   * @param others - Outras propriedades da mensagem de texto (opcional).
   */
  constructor(chat?: Chat | string, text?: string, others: Partial<TextMessage> = {}) {
    super(chat, text, others);
  }

  /**
   * Converte o objeto atual para uma representação em formato JSON.
   * @returns Um objeto JSON que representa o estado atual do objeto.
   */
  public toJSON(): any {
    return JSON.parse(JSON.stringify(this));
  }

  /**
   * Cria uma instância de TextMessage a partir de uma representação em formato JSON.
   * @param data - Os dados JSON a serem usados para criar a instância.
   * @returns Uma instância de TextMessage criada a partir dos dados JSON.
   */
  public static fromJSON(data: any): TextMessage {
    return !data || typeof data != "object" ? new TextMessage() : injectJSON(data, new TextMessage());
  }

  /**
   * Verifica se um objeto é uma instância válida de TextMessage.
   * @param message - O objeto a ser verificado.
   * @returns Verdadeiro se o objeto for uma instância válida de TextMessage, caso contrário, falso.
   */
  public static isValid(message: any): message is TextMessage {
    return typeof message === "object" && Object.keys(new TextMessage()).every((key) => message?.hasOwnProperty(key));
  }
}
