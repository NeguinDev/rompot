/// <reference types="node" />
import { DisconnectReason, proto, MediaDownloadOptions } from "@adiwajshing/baileys";
import WAUser, { WAUsers } from "@wa/WAUser";
import WAChat, { WAChats } from "@wa/WAChat";
import { ConnectionConfig } from "@config/ConnectionConfig";
import { IMessage } from "@interfaces/IMessage";
import IChat from "@interfaces/IChat";
import IUser from "@interfaces/IUser";
import IBot from "@interfaces/IBot";
import Auth from "@interfaces/Auth";
import LocationMessage from "@messages/LocationMessage";
import ContactMessage from "@messages/ContactMessage";
import ButtonMessage from "@messages/ButtonMessage";
import MediaMessage from "@messages/MediaMessage";
import VideoMessage from "@messages/VideoMessage";
import ImageMessage from "@messages/ImageMessage";
import AudioMessage from "@messages/AudioMessage";
import ListMessage from "@messages/ListMessage";
import Message from "@messages/Message";
import Command from "@modules/Command";
import Chat from "@modules/Chat";
import Emmiter from "@utils/Emmiter";
import WaitCallBack from "@utils/WaitCallBack";
import { ConnectionStatus } from "../types/Connection";
import { Commands } from "../types/Command";
import { ChatStatus } from "../types/Chat";
import { Users } from "../types/User";
export default class WhatsAppBot implements IBot {
    private _bot;
    DisconnectReason: typeof DisconnectReason;
    chats: WAChats;
    ev: Emmiter;
    status: ConnectionStatus;
    id: string;
    auth: Auth;
    wcb: WaitCallBack;
    config: ConnectionConfig;
    commands: Commands;
    connect(auth?: string | Auth): Promise<void>;
    /**
     * * Reconecta ao servidor do WhatsApp
     * @param alert Avisa que está econectando
     * @returns
     */
    reconnect(alert?: boolean): Promise<any>;
    /**
     * * Desliga a conexão com o servidor do WhatsApp
     * @param reason
     * @returns
     */
    stop(reason?: any): Promise<void>;
    /**
     * * Salva os chats salvos
     * @param chats Sala de bate-papos
     */
    protected saveChats(chats?: any): Promise<void>;
    /**
     * * Lê o chat e seta ele
     * @param chat Sala de bate-papo
     */
    protected chatUpsert(chat: any): Promise<void>;
    addChat(chat: WAChat): Promise<void>;
    removeChat(chat: WAChat): Promise<void>;
    getChat(chat: WAChat): Promise<WAChat | null>;
    setChat(chat: WAChat): Promise<void>;
    getChats(): Promise<WAChats>;
    setChats(chats: WAChats): Promise<void>;
    getChatAdmins(chat: IChat): Promise<WAUsers>;
    getChatLeader(chat: WAChat): Promise<WAUser>;
    addUserInChat(chat: WAChat, user: WAUser): Promise<void>;
    removeUserInChat(chat: WAChat, user: WAUser): Promise<void>;
    promoteUserInChat(chat: IChat, user: IUser): Promise<void>;
    demoteUserInChat(chat: IChat, user: IUser): Promise<void>;
    changeChatStatus(chat: IChat, status: ChatStatus): Promise<void>;
    createChat(chat: WAChat): Promise<any>;
    leaveChat(chat: WAChat): Promise<any>;
    getUser(user: WAUser): Promise<WAUser>;
    setUser(user: WAUser): Promise<void>;
    getUsers(): Promise<Users>;
    setUsers(users: WAUsers): Promise<void>;
    addUser(user: WAUser): Promise<void>;
    removeUser(user: WAUser): Promise<void>;
    blockUser(user: WAUser): Promise<void>;
    unblockUser(user: WAUser): Promise<void>;
    getBotName(): Promise<string>;
    setBotName(name: string): Promise<any>;
    getUserName(user: WAUser): Promise<string>;
    setUserName(user: WAUser, name: string): Promise<any>;
    getChatName(chat: WAChat): Promise<string>;
    setChatName(chat: WAChat, name: string): Promise<any>;
    getBotProfile(): Promise<Buffer>;
    setBotProfile(image: Buffer): Promise<any>;
    getUserProfile(user: WAUser): Promise<Buffer>;
    setUserProfile(user: WAUser, image: Buffer): Promise<any>;
    getChatProfile(chat: Chat): Promise<Buffer>;
    setChatProfile(chat: WAChat, image: Buffer): Promise<any>;
    getBotDescription(): Promise<any>;
    setBotDescription(description: string): Promise<any>;
    getUserDescription(user: WAUser): Promise<any>;
    setUserDescription(user: WAUser, description: string): Promise<any>;
    getChatDescription(chat: WAChat): Promise<string>;
    setChatDescription(chat: WAChat, description: string): Promise<any>;
    readMessage(message: IMessage): Promise<void>;
    removeMessage(message: Message): Promise<any>;
    deleteMessage(message: Message): Promise<void>;
    addReaction(message: IMessage, reaction: string): Promise<void>;
    removeReaction(message: IMessage): Promise<void>;
    send(content: Message): Promise<Message>;
    /**
     * * Faz o download de arquivos do WhatsApp
     * @param message
     * @param type
     * @param options
     * @param ctx
     * @returns
     */
    download(message: proto.WebMessageInfo, type: "buffer" | "stream", options: MediaDownloadOptions, ctx?: any): Promise<any>;
    /**
     * * Verifica se o número está registrado no WhatsApp
     * @returns
     */
    onExists(id: string): Promise<{
        exists: boolean;
        id: string;
    }>;
    /**
     * * Atualiza uma mensagem de mídia
     * @param message
     * @returns
     */
    updateMediaMessage(message: proto.IWebMessageInfo): Promise<proto.IWebMessageInfo>;
    /**
     * * Aceita o convite para um grupo
     * @param code
     * @returns
     */
    groupAcceptInvite(code: string): Promise<string | undefined> | undefined;
    Chat(chat: IChat): WAChat;
    User(user: IUser): WAUser;
    Command(): Command;
    Message(chat: IChat, text: string): Message;
    MediaMessage(chat: IChat, text: string, file: any): MediaMessage;
    ImageMessage(chat: IChat, text: string, image: Buffer): ImageMessage;
    VideoMessage(chat: IChat, text: string, video: Buffer): VideoMessage;
    AudioMessage(chat: IChat, audio: Buffer): AudioMessage;
    ContactMessage(chat: IChat, text: string, contact: string | string[]): ContactMessage;
    LocationMessage(chat: IChat, latitude: number, longitude: number): LocationMessage;
    ListMessage(chat: IChat, text: string, button: string): ListMessage;
    ButtonMessage(chat: IChat, text: string): ButtonMessage;
}
