import { SignalDataTypeMap, initAuthCreds, BufferJSON, proto } from "@adiwajshing/baileys";
import { mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";

import IAuth from "@interfaces/IAuth";

export class MultiFileAuthState implements IAuth {
  public folder: string;

  constructor(folder: string, autoCreateDir: boolean = true) {
    this.folder = folder;

    const folderInfo = this.getStat(folder);

    if (folderInfo) {
      if (!folderInfo.isDirectory()) {
        throw new Error(`found something that is not a directory at ${folder}, either delete it or specify a different location`);
      }
    } else {
      if (autoCreateDir) mkdirSync(folder, { recursive: true });
    }
  }

  public getStat(folder: string) {
    try {
      return statSync(folder);
    } catch (err) {
      return null;
    }
  }

  public get = async (key: string) => {
    return this.readData(`${key}.json`);
  };

  public set = async (key: string, data: any) => {
    if (!!!data) this.removeData(key);
    else this.writeData(data, `${key}.json`);
  };

  public writeData = async (data: any, file: string) => {
    return writeFileSync(join(this.folder, this.fixFileName(file)!), data);
  };

  public readData = (file: string) => {
    try {
      const data = readFileSync(join(this.folder, this.fixFileName(file)!), { encoding: "utf-8" });

      return data;
    } catch (error) {
      return null;
    }
  };

  public removeData = async (file: string) => {
    try {
      unlinkSync(join(this.folder, this.fixFileName(file)!));
    } catch {}
  };

  public fixFileName = (file?: string) => file?.replace(/\//g, "__")?.replace(/:/g, "-");
}

export async function getBaileysAuth(auth: IAuth) {
  let creds = JSON.parse(await auth.get("creds"), BufferJSON.reviver) || initAuthCreds();

  return {
    saveCreds: async () => {
      return await auth.set("creds", JSON.stringify(creds, BufferJSON.replacer));
    },
    state: {
      creds,
      keys: {
        async get<T extends keyof SignalDataTypeMap>(type: T, ids: string[]): Promise<{ [id: string]: SignalDataTypeMap[T] }> {
          const data: { [id: string]: SignalDataTypeMap[typeof type] } = {};

          await Promise.all(
            ids.map(async (id) => {
              const path = `${type}-${id}`;

              let value: any = JSON.parse(await auth.get(path), BufferJSON.reviver);

              if (type === "app-state-sync-key" && value) {
                value = proto.Message.AppStateSyncKeyData.fromObject(value);
              }

              data[id] = value;
            })
          );

          return data;
        },
        set: async (data: any) => {
          const tasks: Promise<void>[] = [];

          for (const category in data) {
            for (const id in data[category]) {
              const value = data[category][id];

              const key = `${category}-${id}`;

              tasks.push(auth.set(key, JSON.stringify(value, BufferJSON.replacer)));
            }
          }

          await Promise.all(tasks);
        },
      },
    },
  };
}
