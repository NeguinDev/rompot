import { ConnectionConfig } from "@config/ConnectionConfig";
import { Commands } from "@models/Commands";
import { Message } from "@messages/Message";
import { Emmiter } from "@utils/Emmiter";
import { Status } from "@models/Status";
import { PubSub } from "@utils/PubSub";
import { Chat } from "@models/Chat";
import { User } from "@models/User";

export class Bot extends Emmiter {
  private pb = new PubSub();

  private _awaitMessages: { [key: string]: [{ ignoreBot: boolean; stopRead: boolean; callback: Function }] } = {};
  private _autoMessages: any = {};
  private _commands?: Commands;

  public status: Status = new Status("offline");
  public config: ConnectionConfig | any = {};
  public id: string = "";

  constructor(commands?: Commands) {
    super();

    if (commands) {
      this.setCommands(commands);
    }

    this.on("message", (message: Message) => {
      if (message.fromMe && !this.config.autoRunBotCommand) return;
      if (!message.fromMe && this.config.disableAutoCommand) return;

      const command = this.getCommand(message.text);

      if (command) command.execute(message);
    });

    this.on("me", (message: Message) => {
      if (!this.config.autoRunBotCommand || this.config.receiveAllMessages) return;

      const command = this.getCommand(message.text);

      if (command) command.execute(message);
    });
  }

  /**
   * * Define a lista de comandos
   * @param commands
   */
  public setCommands(commands: Commands) {
    this._commands = commands;
    this._commands.setBot(this);
  }

  /**
   * * Retorna um comando
   * @param cmd
   * @param commands
   * @returns
   */
  public getCommand(cmd: string | string[], commands: Commands = this.getCommands()) {
    return commands.getCommand(cmd);
  }

  /**
   * * Retorna os comandos do bot
   * @returns
   */
  public getCommands(): Commands {
    if (!this._commands) {
      this._commands = new Commands({});
      this._commands.setBot(this);
    }

    return this._commands;
  }

  /**
   * * Envia um conteúdo
   * @param content
   * @returns
   */
  public async send(content: Message | Status): Promise<any | Message> {
    if (content instanceof Message) {
      return await this.sendMessage(content);
    }

    if (content instanceof Status) {
      return this.sendStatus(content);
    }
  }

  /**
   * * Adiciona uma chamada há uma lista de chamadas para serem chamadas
   * @param fn
   * @returns
   */
  public add(fn: Function): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pb.sub(async () => {
        try {
          resolve(await fn());
        } catch (e: any) {
          this.emit("error", e);
          reject(e);
        }
      });
    });
  }

  /**
   * * Aguarda uma mensagem ser recebida em uma sala de bate-papo
   * @param chat chat que aguardará a mensagem
   * @param ignoreBot ignorar mensagem do bot
   * @param stopRead para de fazer a leitura da mensagem
   * @returns
   */
  public awaitMessage(chat: Chat, stopRead: boolean = true, ignoreBot: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (!this._awaitMessages[chat.id]) {
          this._awaitMessages[chat.id] = [{ ignoreBot, stopRead, callback: resolve }];
        } else {
          this._awaitMessages[chat.id].push({ ignoreBot, stopRead, callback: resolve });
        }
      } catch (e: any) {
        this.emit("error", e);
        reject(e);
      }
    });
  }

  /**
   * * Responde as mensagens que estão em aguarde
   * @param message mensagem do chat que aguarda as mensagens
   * @returns
   */
  protected sendAwaitMessages(message: Message) {
    var stop: boolean = false;

    if (this._awaitMessages[message.chat.id]) {
      this._awaitMessages[message.chat.id].forEach((value, index) => {
        if (!message.fromMe || (message.fromMe && !value.ignoreBot)) {
          value?.callback(message);
          this._awaitMessages[message.chat.id].splice(index, 1);

          if (value.stopRead) stop = true;
        }
      });
    }

    return stop;
  }

  /**
   * * Cria um tempo de espera
   * @param timeout
   * @returns
   */
  public sleep(timeout: number = 1000): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }

  /**
   * * Automotiza uma mensagem
   * @param message
   * @param timeout
   * @param chats
   * @param id
   * @returns
   */
  public async addAutomate(
    message: Message,
    timeout: number,
    chats?: { [key: string]: Chat },
    id: string = String(Date.now())
  ): Promise<any> {
    const now = Date.now();

    // Criar e atualizar dados da mensagem automatizada
    this._autoMessages[id] = { id, chats: chats || (await this.getChats()), updatedAt: now, message };

    // Aguarda o tempo definido
    await this.sleep(timeout - now);

    // Cancelar se estiver desatualizado
    if (this._autoMessages[id].updatedAt !== now) return;

    await Promise.all(
      this._autoMessages[id].chats.map(async (chat: Chat) => {
        const automated: any = this._autoMessages[id];

        if (automated.updatedAt !== now) return;

        automated.message?.setChat(chat);

        // Enviar mensagem
        await this.send(automated.message);

        // Remover sala de bate-papo da mensagem
        const nowChats = automated.chats;
        const index = nowChats.indexOf(automated.chats[chat.id]);
        this._autoMessages[id].chats = nowChats.splice(index + 1, nowChats.length);
      })
    );
  }

  //! ****************** Bot functions ******************

  public async sendMessage(message: Message): Promise<Message> {
    return message;
  }
  public async sendStatus(status: Status): Promise<any> {}

  public async connect(auth: any, config?: any): Promise<any> {}
  public async reconnect(config?: any): Promise<any> {}
  public async stop(reason?: any): Promise<any> {}

  public async getChat(id: string): Promise<any> {}
  public async setChat(chat: Chat) {}

  public async getChats(): Promise<any> {}
  public async setChats(chat: { [key: string]: Chat }) {}

  public async removeChat(id: Chat | string) {}
  public async addMember(chat: Chat, user: User) {}
  public async removeMember(chat: Chat, user: User) {}

  public async deleteMessage(message: Message): Promise<any> {}
  public async removeMessage(message: Message): Promise<any> {}
  public async deleteChat(message: Message): Promise<any> {}

  public async setDescription(desc: string, id?: Chat | string): Promise<any> {}
  public async getDescription(id?: User | string): Promise<any> {}

  public async setChatName(id: Chat | string, name: string): Promise<any> {}
  public async createChat(name: string): Promise<any> {}
  public async leaveChat(chat: Chat | string): Promise<any> {}

  public async unblockUser(user: User): Promise<any> {}
  public async blockUser(user: User): Promise<any> {}

  public async setBotName(name: string): Promise<any> {}

  public async setProfile(image: Buffer, id?: Chat | string): Promise<any> {}
  public async getProfile(id?: Chat | User | string): Promise<any> {}
}

export interface BotBase {
  //? ************ CONNECTION ************

  connect(config: ConnectionConfig): Promise<void>;
  reconnect(config: ConnectionConfig): Promise<void>;
  stop(reason: any): Promise<void>;

  //? ************** MESSAGE *************

  sendMessage(message: Message): Promise<Message>;
  removeMessage(message: Message): Promise<void>;
  deleteMessage(message: Message): Promise<void>;

  //? ************** STATUS **************

  sendStatus(status: Status): Promise<Status>;

  //? *************** BOT ***************

  getBotProfile(): Promise<Buffer | null>;
  setBotProfile(image: Buffer): Promise<void>;

  getBotName(): Promise<string>;
  setBotName(name: string): Promise<void>;

  getBotDescription(): Promise<string>;
  setBotDescription(description: string): Promise<string>;

  getChatProfile(chatId: string): Promise<Buffer | null>;
  setChatProfile(chatId: string, image: Buffer): Promise<void>;

  //? *************** CHAT **************

  addChat(chat: Chat): Promise<void>;
  removeChat(chatId: string): Promise<void>;

  createChat(chat: Chat): Promise<void>;
  leaveChat(chatId: string): Promise<void>;

  getChat(chatId: string): Promise<Chat | null>;
  setChat(chat: Chat): Promise<void>;

  getChats(): Promise<{ [chatId: string]: Chat }>;
  setChats(chats: { [chatId: string]: Chat }): Promise<void>;

  getChatName(chatId: string): Promise<string>;
  setChatName(chatId: string, name: string): Promise<void>;

  getChatDescription(chatId: string): Promise<string>;
  setChatDescription(chatId: string, description: string): Promise<string>;

  getUserProfile(userId: string): Promise<Buffer | null>;
  setUserProfile(userId: string, image: Buffer): Promise<void>;

  //? *************** USER **************

  addUser(user: User): Promise<void>;
  removeUser(userId: string): Promise<void>;

  unblockUser(userId: string): Promise<void>;
  blockUser(userId: string): Promise<void>;

  getUser(userId: string): Promise<User | null>;
  setUser(user: User): Promise<void>;

  getUsers(): Promise<{ [userId: string]: User }>;
  setUsers(users: { [userId: string]: User }): Promise<void>;

  getUserName(userId: string): Promise<string>;
  setUserName(userId: string, name: string): Promise<void>;

  getUserDescription(userId: string): Promise<string>;
  setUserDescription(userId: string, description: string): Promise<string>;
}

export class BotModule {
  constructor(bot: Bot) {}
}

export interface BotModule {}
