"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const rxjs_1 = require("rxjs");
const uuidv4_1 = require("uuidv4");
const Commands_1 = require("../models/Commands");
const Message_1 = require("../models/Message");
class Bot {
    constructor(plataform, commands = new Commands_1.Commands()) {
        this._awaitSendMessages = new rxjs_1.Subject();
        this._awaitSendMessagesObservers = [];
        this._autoMessages = {};
        this._plataform = plataform;
        this.commands = commands;
    }
    /**
     * * Construir bot
     * @param auth
     * @param config
     */
    build(auth, config) {
        return this._plataform.connect(auth, config);
    }
    /**
     * * Reconstruir o bot
     * @param config
     * @returns
     */
    rebuild(config) {
        return this._plataform.reconnect(config);
    }
    /**
     * * Obter Bot
     * @returns
     */
    get() {
        return this._plataform;
    }
    /**
     * * Obter DataBase
     * @returns
     */
    getDB() {
        return this._db;
    }
    /**
     * * Definir DataBase
     */
    setDB(DB) {
        this._db = DB;
    }
    /**
     * * Retorna o status do bot
     * @returns
     */
    getStatus() {
        return this._plataform.status;
    }
    /**
     * * Retorna uma salade bate-papo
     * @param id
     * @returns
     */
    getChat(id) {
        return this._plataform.chats[id];
    }
    /**
     * * Retorna todas as salas de bate-papo
     * @returns
     */
    getChats() {
        return this._plataform.chats;
    }
    /**
     * * Adiciona um evento
     * @param eventName
     * @param event
     */
    addEvent(eventName, event) {
        this._plataform.addEvent(eventName, event);
    }
    /**
     * * Envia um conteúdo
     * @param content
     * @returns
     */
    send(content, interval) {
        return __awaiter(this, void 0, void 0, function* () {
            if (content instanceof Message_1.Message) {
                return yield this.addMessage(content, interval);
            }
            return this._plataform.send(content);
        });
    }
    /**
     * * Adiciona a mensagem há uma lista de mensagens para serem enviadas
     * @param message
     * @param interval
     * @returns
     */
    addMessage(message, interval = 1000) {
        return new Promise((resolve, reject) => {
            const observer = this._awaitSendMessages.subscribe((obs) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (obs !== observer)
                        return;
                    yield this.sleep(interval);
                    yield this._plataform.send(message);
                    observer.unsubscribe();
                    const index = this._awaitSendMessagesObservers.indexOf(observer);
                    this._awaitSendMessagesObservers.splice(index, 1);
                    if (this._awaitSendMessagesObservers.length > 0) {
                        this._awaitSendMessages.next(this._awaitSendMessagesObservers[index]);
                    }
                    resolve(null);
                }
                catch (err) {
                    reject(err);
                }
            }));
            this._awaitSendMessagesObservers.push(observer);
            if (this._awaitSendMessagesObservers.length <= 1) {
                this._awaitSendMessages.next(observer);
            }
        });
    }
    /**
     * * Cria um tempo de espera
     * @param timeout
     * @returns
     */
    sleep(timeout = 1000) {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    }
    /**
     * * Automotiza uma mensagem
     * @param message
     * @param timeout
     * @param interval
     * @param chats
     * @param id
     * @returns
     */
    addAutomate(message, timeout, interval, chats, id = (0, uuidv4_1.uuid)()) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            // Criar e atualizar dados da mensagem automatizada
            this._autoMessages[id] = { id, chats: chats || this.getChats(), updatedAt: now, message };
            // Aguarda o tempo definido
            yield this.sleep(timeout - now);
            // Cancelar se estiver desatualizado
            if (this._autoMessages[id].updatedAt !== now)
                return;
            yield Promise.all(this._autoMessages[id].chats.map((chat) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const automated = this._autoMessages[id];
                if (automated.updatedAt !== now)
                    return;
                (_a = automated.message) === null || _a === void 0 ? void 0 : _a.setChat(chat);
                // Enviar mensagem
                yield this.send(automated.message, interval);
                // Remover sala de bate-papo da mensagem
                const nowChats = automated.chats;
                const index = nowChats.indexOf(automated.chats[chat.id]);
                this._autoMessages[id].chats = nowChats.splice(index + 1, nowChats.length);
            })));
        });
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Bot.js.map