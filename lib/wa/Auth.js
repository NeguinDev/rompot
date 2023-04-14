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
exports.getBaileysAuth = exports.MultiFileAuthState = void 0;
const baileys_1 = require("@adiwajshing/baileys");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
class MultiFileAuthState {
    constructor(folder, autoCreateDir = true) {
        this.fixFileName = (file) => { var _a; return (_a = file === null || file === void 0 ? void 0 : file.replace(/\//g, "__")) === null || _a === void 0 ? void 0 : _a.replace(/:/g, "-"); };
        this.get = (key) => __awaiter(this, void 0, void 0, function* () {
            return yield this.readData(`${key}.json`);
        });
        this.set = (key, data) => __awaiter(this, void 0, void 0, function* () {
            if (!!!data)
                this.removeData(key);
            else
                this.writeData(data, `${key}.json`);
        });
        this.writeData = (data, file) => __awaiter(this, void 0, void 0, function* () {
            return (0, promises_1.writeFile)((0, path_1.join)(this.folder, this.fixFileName(file)), JSON.stringify(data, baileys_1.BufferJSON.replacer));
        });
        this.readData = (file) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, promises_1.readFile)((0, path_1.join)(this.folder, this.fixFileName(file)), { encoding: "utf-8" });
                return JSON.parse(data, baileys_1.BufferJSON.reviver);
            }
            catch (error) {
                return null;
            }
        });
        this.removeData = (file) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, fs_1.unlinkSync)((0, path_1.join)(this.folder, this.fixFileName(file)));
            }
            catch (_a) { }
        });
        this.folder = folder;
        const folderInfo = this.getStat(folder);
        if (folderInfo) {
            if (!folderInfo.isDirectory()) {
                throw new Error(`found something that is not a directory at ${folder}, either delete it or specify a different location`);
            }
        }
        else {
            if (autoCreateDir)
                (0, fs_1.mkdirSync)(folder, { recursive: true });
        }
    }
    getStat(folder) {
        try {
            return (0, fs_1.statSync)(folder);
        }
        catch (err) {
            return null;
        }
    }
}
exports.MultiFileAuthState = MultiFileAuthState;
function getBaileysAuth(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const creds = DataReplacer(yield auth.get("creds")) || (0, baileys_1.initAuthCreds)();
        return {
            saveCreds: () => __awaiter(this, void 0, void 0, function* () {
                return yield auth.set("creds", creds);
            }),
            state: {
                creds,
                keys: {
                    get(type, ids) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const data = {};
                            yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                                var value = DataReplacer(yield auth.get(`${type}-${id}`));
                                if (type === "app-state-sync-key" && value) {
                                    value = baileys_1.proto.Message.AppStateSyncKeyData.fromObject(value);
                                }
                                data[id] = value;
                            })));
                            return data;
                        });
                    },
                    set: (data) => __awaiter(this, void 0, void 0, function* () {
                        const tasks = [];
                        for (const category in data) {
                            for (const id in data[category]) {
                                tasks.push(auth.set(`${category}-${id}`, data[category][id]));
                            }
                        }
                        yield Promise.all(tasks);
                    }),
                },
            },
        };
    });
}
exports.getBaileysAuth = getBaileysAuth;
function DataReplacer(data) {
    try {
        const json = JSON.parse(JSON.stringify(data, baileys_1.BufferJSON.replacer), baileys_1.BufferJSON.reviver);
        return json;
    }
    catch (err) {
        return data;
    }
}
//# sourceMappingURL=Auth.js.map