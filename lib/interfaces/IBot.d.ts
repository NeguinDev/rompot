/// <reference types="node" />
import { ConnectionConfig } from "@config/ConnectionConfig";
import IUser from "@interfaces/IUser";
import IChat from "@interfaces/IChat";
import Command from "@modules/Command";
import Emmiter from "@utils/Emmiter";
import { IAudioMessage, IButtonMessage, IContactMessage, IImageMessage, IListMessage, ILocationMessage, IMediaMessage, IMessage, IVideoMessage } from "@interfaces/Messages";
import Auth from "@interfaces/Auth";
import { Chats, ChatStatus } from "../types/Chat";
import { BotStatus } from "../types/Client";
import { Users } from "../types/User";
export default interface IBot {
    /** ID do bot */
    id: string;
    status: BotStatus;
    /** Gerenciador de eventos */
    ev: Emmiter;
    /** Configurações do bot */
    config: ConnectionConfig;
    /** Comandos do bot */
    commands: Command[];
    /**
     * * Conectar bot
     * @param auth Autenticação do bot
     */
    connect(auth: Auth | string): Promise<void>;
    /**
     * * Reconectar bot
     * @param alert Alerta que está reconectando
     */
    reconnect(alert?: boolean): Promise<void>;
    /**
     * * Parar bot
     * @param reason Razão por parar bot
     */
    stop(reason: any): Promise<void>;
    /**
     * * Marca uma mensagem como visualizada
     * @param message Mensagem que será visualizada
     */
    readMessage(message: IMessage): Promise<void>;
    /**
     * * Enviar mensagem
     * @param message Mensagem que será enviada
     */
    send(message: IMessage): Promise<IMessage>;
    /**
     * * Remover mensagem
     * @param message Mensagem que será removida da sala de bate-papo
     */
    removeMessage(message: IMessage): Promise<void>;
    /**
     * * Deletar mensagem
     * @param message Mensagem que será deletada da sala de bate-papos
     */
    deleteMessage(message: IMessage): Promise<void>;
    /**
     * @returns Retorna o nome do bot
     */
    getBotName(): Promise<string>;
    /**
     * * Define o nome do bot
     * @param name Nome do bot
     */
    setBotName(name: string): Promise<void>;
    /**
     * @returns Retorna a descrição do bot
     */
    getBotDescription(): Promise<string>;
    /**
     * * Define a descrição do bot
     * @param description Descrição do bot
     */
    setBotDescription(description: string): Promise<void>;
    /**
     * @returns Retorna foto de perfil do bot
     */
    getBotProfile(): Promise<Buffer>;
    /**
     * * Define foto de perfil do bot
     * @param image Foto de perfil do bot
     */
    setBotProfile(image: Buffer): Promise<void>;
    /**
     * * Adiciona uma sala de bate-papo
     * @param chat Sala de bate-papo
     */
    addChat(chat: IChat): Promise<void>;
    /**
     * * Remove uma sala de bate-papo
     * @param chat Sala de bate-papo
     */
    removeChat(chat: IChat): Promise<void>;
    /**
     * * Adiciona um novo usuário a uma sala de bate-papo
     * @param chat Sala de bate-papo
     * @param user Usuário
     */
    addUserInChat(chat: IChat, user: IUser): Promise<void>;
    /**
     * * Adiciona um novo usuário a uma sala de bate-papo
     * @param chat Sala de bate-papo
     * @param user Usuário
     */
    removeUserInChat(chat: IChat, user: IUser): Promise<void>;
    /**
     * * Promove há administrador um usuário da sala de bate-papo
     * @param chat Sala de bate-papo
     * @param user Usuário
     */
    promoteUserInChat(chat: IChat, user: IUser): Promise<void>;
    /**
     * * Remove a administração um usuário da sala de bate-papo
     * @param chat Sala de bate-papo
     * @param user Usuário
     */
    demoteUserInChat(chat: IChat, user: IUser): Promise<void>;
    /**
     * * Altera o status da sala de bate-papo
     * @param chat Sala de bate-papo
     * @param status Status da sala de bate-papo
     */
    changeChatStatus(chat: IChat, status: ChatStatus): Promise<void>;
    /**
     * * Cria uma sala de bate-papo
     * @param chat Sala de bate-papo
     */
    createChat(chat: IChat): Promise<void>;
    /**
     * * Sai de uma sala de bate-papo
     * @param chat Sala de bate-papo
     */
    leaveChat(chat: IChat): Promise<void>;
    /**
     * @param chat Sala de bate-papo
     * @returns Retorna uma sala de bate-papo
     */
    getChat(chat: IChat): Promise<IChat | null>;
    /**
     * * Define uma sala de bate-papo
     * @param chat Sala de bate-papo
     */
    setChat(chat: IChat): Promise<void>;
    /**
     * @param chat Sala de bate-papo
     * @returns Retorna o nome da sala de bate-papo
     */
    getChatName(chat: IChat): Promise<string>;
    /**
     * @param chat Sala de bate-papo
     * @param name Nome da sala de bate-papo
     */
    setChatName(chat: IChat, name: string): Promise<void>;
    /**
     * @param chat Sala de bate-papo
     * @returns Retorna a descrição da sala de bate-papo
     */
    getChatDescription(chat: IChat): Promise<string>;
    /**
     * @param chat Sala de bate-papo
     * @param description Descrição da sala de bate-papo
     */
    setChatDescription(chat: IChat, description: string): Promise<void>;
    /**
     * @param chat Sala de bate-papo
     * @returns Retorna a imagem de perfil da sala de bate-papo
     */
    getChatProfile(chat: IChat): Promise<Buffer>;
    /**
     * @param chat Sala de bate-papo
     * @param profile Imagem de perfil da sala de bate-papo
     */
    setChatProfile(chat: IChat, profile: Buffer): Promise<void>;
    /**
     * @param chat Sala de bate-papo
     * @returns Retorna os administradores de uma sala de bate-papo
     */
    getChatAdmins(chat: IChat): Promise<Users>;
    /**
     * @param chat Sala de bate-papo
     * @returns Retorna o lider da sala de bate-papo
     */
    getChatLeader(chat: IChat): Promise<IUser>;
    /**
     * @returns Retorna as sala de bate-papo que o bot está
     */
    getChats(): Promise<Chats>;
    /**
     * * Define as salas de bate-papo que o bot está
     * @param chats Salas de bate-papo
     */
    setChats(chats: Chats): Promise<void>;
    /**
     * * Adiciona um novo usuário
     * @param user Usuário
     */
    addUser(user: IUser): Promise<void>;
    /**
     * * Remove um usuário
     * @param user Usuário
     */
    removeUser(user: IUser): Promise<void>;
    /**
     * @param user Usuário
     * @returns Retorna um usuário
     */
    getUser(user: IUser): Promise<IUser | null>;
    /**
     * * Define um usuário
     * @param user Usuário
     */
    setUser(user: IUser): Promise<void>;
    /**
     * @param user Usuário
     * @returns Retorna o nome do usuário
     */
    getUserName(user: IUser): Promise<string>;
    /**
     * @param user Usuário
     * @param name Nome do usuário
     */
    setUserName(user: IUser, name: string): Promise<void>;
    /**
     * @param user Usuário
     * @returns Retorna a descrição do usuário
     */
    getUserDescription(user: IUser): Promise<string>;
    /**
     * @param user Usuário
     * @param description Descrição do usuário
     */
    setUserDescription(user: IUser, description: string): Promise<void>;
    /**
     * @param user Usuário
     * @returns Retorna a foto de perfil do usuário
     */
    getUserProfile(user: IUser): Promise<Buffer>;
    /**
     * @param user Usuário
     * @param profile Imagem de perfil do usuário
     */
    setUserProfile(user: IUser, profile: Buffer): Promise<void>;
    /**
     * * Desbloqueia um usuário
     * @param user Usuário
     */
    unblockUser(user: IUser): Promise<void>;
    /**
     * * Bloqueia um usuário
     * @param user Usuário
     */
    blockUser(user: IUser): Promise<void>;
    /**
     * @returns Retorna a lista de usuários do bot
     */
    getUsers(): Promise<Users>;
    /**
     * * Define a lista de usuários do bot
     * @param users Usuários
     */
    setUsers(users: Users): Promise<void>;
    /**
     * * Sala de bate-papo
     * @param id Sala de bate-papo
     */
    Chat(id: IChat): IChat;
    /**
     * * Usuário
     * @param user Usuário
     */
    User(id: IUser): IUser;
    /**
     * * Comando
     */
    Command(): Command;
    /**
     * * Adiciona uma reação na mensagem
     * @param message Mensagem que será reagida
     * @param reaction Reação
     */
    addReaction(message: IMessage, reaction: string): Promise<void>;
    /**
     * * Remove a reação da mensagem
     * @param Mensagem que terá sua reação removida
     */
    removeReaction(message: IMessage): Promise<void>;
    /**
     * * Mensagem
     * @param chat Sala de bate-papo
     * @param text Texto da mensagem
     */
    Message(chat: IChat, text: string): IMessage;
    /**
     * * Mensagem contendo uma mídia
     * @param chat Sala de bate-papo
     * @param text Texto da mensagem
     */
    MediaMessage(chat: IChat, text: string, file: any): IMediaMessage;
    /**
     * * Mensagem com imagem
     * @param chat Sala de bate-papo
     * @param text Texto da mensagem
     * @param image Imagem
     */
    ImageMessage(chat: IChat, text: string, image: Buffer): IImageMessage;
    /**
     * * Mensagem com vídeo
     * @param chat Sala de bate-papo
     * @param text Texto da mensagem
     * @param video Video
     */
    VideoMessage(chat: IChat, text: string, video: Buffer): IVideoMessage;
    /**
     * * Mensagem com audio
     * @param chat Sala de bate-papo
     * @param audio Audio
     */
    AudioMessage(chat: IChat, audio: Buffer): IAudioMessage;
    /**
     * * Mensagem com contatos
     * @param chat Sala de bate-papo
     * @param text Texto da mensagem
     * @param contact Contato
     */
    ContactMessage(chat: IChat, text: string, contact: string | string[]): IContactMessage;
    /**
     * * Mensagem com localização
     * @param chat Sala de bate-papo
     * @param longitude Longitude
     * @param latitude Latitude
     */
    LocationMessage(chat: IChat, latitude: number, longitude: number): ILocationMessage;
    /**
     * * Mensagem com lista
     * @param chat Sala de bate-papo
     * @param text Texto da mensagem
     */
    ListMessage(chat: IChat, text: string, button: string): IListMessage;
    /**
     * * Mensagem com botões
     * @param chat Sala de bate-papo
     * @param text Texto da mensagem
     */
    ButtonMessage(chat: IChat, text: string): IButtonMessage;
}