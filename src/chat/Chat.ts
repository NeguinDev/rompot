import { ChatStatus } from "../chat/ChatStatus";
import { injectJSON } from "../utils/Generic";
import { ChatType } from "../chat/ChatType";
import Message from "../messages/Message";
import Client from "../client/Client";
import User from "../user/User";

export default class Chat {
  /** ID do bot associado a este chat */
  public botId: string = "";
  /** ID do chat */
  public id: string = "";
  /** Tipo do chat */
  public type: ChatType = ChatType.PV;
  /** Nome do chat */
  public name: string = "";
  /** Admins do chat */
  public admins: string[] = [];
  /** Líder do chat */
  public leader: string = "";
  /** Usuários do chat */
  public users: string[] = [];

  /**
   * Cria uma instância de Chat.
   * @param id - O ID do chat.
   * @param type - O tipo do chat (opcional, padrão é ChatType.PV).
   * @param name - O nome do chat (opcional, padrão é uma string vazia).
   */
  constructor(id: string, type: ChatType = ChatType.PV, name: string = "") {
    this.id = id;
    this.type = type;
    this.name = name;
  }

  /**
   * Obtém o nome do chat.
   * @returns Uma string representando o nome do chat.
   */
  public async getName(): Promise<string> {
    return Client.getClient(this.botId).getChatName(this);
  }

  /**
   * Define o nome do chat.
   * @param name - O novo nome para definir.
   * @returns Uma Promise que resolve quando o nome do chat é definido com sucesso.
   */
  public async setName(name: string): Promise<void> {
    await Client.getClient(this.botId).setChatName(this, name);
  }

  /**
   * Obtém a descrição do chat.
   * @returns Uma string representando a descrição do chat.
   */
  public async getDescription(): Promise<string> {
    return Client.getClient(this.botId).getChatDescription(this);
  }

  /**
   * Define a descrição do chat.
   * @param description - A nova descrição para definir.
   * @returns Uma Promise que resolve quando a descrição do chat é definida com sucesso.
   */
  public async setDescription(description: string): Promise<void> {
    return Client.getClient(this.botId).setChatDescription(this, description);
  }

  /**
   * Obtém o perfil do chat.
   * @returns Um Buffer representando o perfil do chat.
   */
  public async getProfile(): Promise<Buffer> {
    return Client.getClient(this.botId).getChatProfile(this);
  }

  /**
   * Define o perfil do chat.
   * @param image - O novo perfil para definir como um Buffer.
   * @returns Uma Promise que resolve quando o perfil do chat é definido com sucesso.
   */
  public async setProfile(image: Buffer): Promise<void> {
    return Client.getClient(this.botId).setChatProfile(this, image);
  }

  /**
   * Verifica se um usuário é um administrador deste chat.
   * @param user - O usuário ou ID do usuário a ser verificado.
   * @returns Verdadeiro se o usuário é um administrador, caso contrário, falso.
   */
  public async isAdmin(user: User | string): Promise<boolean> {
    return (await Client.getClient(this.botId).getChatAdmins(this)).includes(User.getId(user));
  }

  /**
   * Verifica se um usuário é o líder deste chat.
   * @param user - O usuário ou ID do usuário a ser verificado.
   * @returns verdadeiro se o usuário é o líder, caso contrário, falso.
   */
  public async isLeader(user: User | string): Promise<boolean> {
    return (await Client.getClient(this.botId).getChatLeader(this))?.id == User.getId(user);
  }

  /**
   * Obtém os administradores deste chat.
   * @returns Um objeto contendo os administradores por ID.
   */
  public async getAdmins(): Promise<string[]> {
    return Client.getClient(this.botId).getChatAdmins(this);
  }

  /**
   * Obtém os usuários deste chat.
   * @returns Um objeto contendo os usuários por ID.
   */
  public async getUsers(): Promise<string[]> {
    return await Client.getClient(this.botId).getChatUsers(this);
  }

  /**
   * Adiciona um usuário a este chat.
   * @param user - O usuário ou ID do usuário a ser adicionado.
   * @returns Uma Promise que resolve quando o usuário é adicionado com sucesso.
   */
  public async addUser(user: User | string): Promise<void> {
    return Client.getClient(this.botId).addUserInChat(this, user);
  }

  /**
   * Remove um usuário deste chat.
   * @param user - O usuário ou ID do usuário a ser removido.
   * @returns Uma Promise que resolve quando o usuário é removido com sucesso.
   */
  public async removeUser(user: User | string): Promise<void> {
    return Client.getClient(this.botId).removeUserInChat(this, user);
  }

  /**
   * Promove um usuário a administrador deste chat.
   * @param user - O usuário ou ID do usuário a ser promovido.
   * @returns Uma Promise que resolve quando o usuário é promovido com sucesso.
   */
  public async promote(user: User | string): Promise<void> {
    return Client.getClient(this.botId).promoteUserInChat(this, user);
  }

  /**
   * Rebaixa um administrador a membro deste chat.
   * @param user - O usuário ou ID do usuário a ser rebaixado.
   * @returns Uma Promise que resolve quando o usuário é rebaixado com sucesso.
   */
  public async demote(user: User | string): Promise<void> {
    return Client.getClient(this.botId).demoteUserInChat(this, user);
  }

  /**
   * Sai deste chat.
   * @returns Uma Promise que resolve quando o usuário sai do chat com sucesso.
   */
  public async leave(): Promise<void> {
    return Client.getClient(this.botId).leaveChat(this);
  }

  /**
   * Envia uma mensagem para este chat.
   * @param message - A mensagem ou objeto IMessage a ser enviado.
   * @returns Uma Promise que resolve para a mensagem enviada.
   */
  public async send(message: Message | string): Promise<Message> {
    const msg = Message.get(message);

    if (!msg.chat.id) msg.chat.id = msg.chat.id || this.id;
    if (!msg.user.id) msg.user.id = msg.user.id || this.botId;

    return Client.getClient(this.botId).send(msg);
  }

  /**
   * Altera o status deste chat.
   * @param status - O novo status a ser definido.
   * @returns Uma Promise que resolve quando o status do chat é alterado com sucesso.
   */
  public async changeStatus(status: ChatStatus): Promise<void> {
    return Client.getClient(this.botId).changeChatStatus(this, status);
  }

  /**
   * Converte o objeto atual para uma representação em formato JSON.
   * @returns Um objeto JSON que representa o estado atual do objeto.
   */
  public toJSON(): any {
    return JSON.parse(JSON.stringify(this));
  }

  /**
   * Cria uma instância de Chat a partir de uma representação em formato JSON.
   * @param data - Os dados JSON a serem usados para criar a instância.
   * @returns Uma instância de Chat criada a partir dos dados JSON.
   */
  public static fromJSON(data: any): Chat {
    if (!data || typeof data != "object") {
      return new Chat("");
    }

    return injectJSON(data, new Chat(""));
  }

  /**
   * Obtém uma instância de Chat com base em um ID ou retorna uma nova instância vazia se o parâmetro for uma string vazia.
   * @param chat - O ID do chat ou uma instância existente de Chat.
   * @param botId - O ID do bot associado ao chat.
   * @returns Uma instância de Chat com base no ID fornecido ou uma nova instância vazia se o ID for uma string vazia.
   */
  public static get<T extends Chat>(chat: T | string, botId?: string): T | Chat {
    if (typeof chat == "string") {
      const c = new Chat(chat);

      if (botId) c.botId = botId;

      return c;
    }

    if (botId) chat.botId = botId;

    return chat;
  }

  /**
   * Obtém o ID de um chat.
   * @param chat - O chat ou ID do chat de onde obter o ID.
   * @returns O ID do chat como uma string, ou uma string vazia se o chat for inválido.
   */
  public static getId(chat: Chat | string): string {
    return typeof chat == "object" ? chat?.id || "" : typeof chat == "string" ? chat : "";
  }

  /**
   * Verifica se um objeto é uma instância válida de Chat.
   * @param chat - O objeto a ser verificado.
   * @returns Verdadeiro se o objeto for uma instância válida de Chat, caso contrário, falso.
   */
  public static isValid(chat: any): chat is Chat {
    return typeof chat != "object" ? false : Object.keys(new Chat("")).every((key) => chat?.hasOwnProperty(key));
  }
}