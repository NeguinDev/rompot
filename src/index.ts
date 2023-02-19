import { ConnectionConfig, DefaultConnectionConfig } from "@config/ConnectionConfig";

import UserInterface from "@interfaces/UserInterface";
import ChatInterface from "@interfaces/ChatInterface";
import BotInterface from "@interfaces/BotInterface";
import BotControl from "@interfaces/BotControl";

import LocationMessage from "@messages/LocationMessage";
import ContactMessage from "@messages/ContactMessage";
import ButtonMessage from "@messages/ButtonMessage";
import ImageMessage from "@messages/ImageMessage";
import VideoMessage from "@messages/VideoMessage";
import MediaMessage from "@messages/MediaMessage";
import ListMessage from "@messages/ListMessage";
import Message from "@messages/Message";

import { BuildBot } from "@modules/BuildBot";
import Chat from "@modules/Chat";
import User from "@modules/User";

import PromiseMessages, { PromiseMessage } from "@utils/PromiseMessages";
import Emmiter, { EventsEmitter } from "@utils/Emmiter";
import WaitCallBack from "@utils/WaitCallBack";
import getImageURL from "@utils/getImageURL";
import sleep from "@utils/sleep";
import WhatsAppBot from "@wa/WhatsAppBot";
import Command from "@modules/Command";
import { DefaultCommandConfig } from "@config/CommandConfig";

export { ConnectionConfig };

export { UserInterface, ChatInterface, BotInterface, BotControl };
export * from "@interfaces/MessagesInterfaces";

export { ButtonMessage, ContactMessage, ImageMessage, VideoMessage, MediaMessage, Message, ListMessage, LocationMessage };

export { BuildBot, Chat, User };

export { Emmiter, EventsEmitter, PromiseMessages, PromiseMessage, WaitCallBack, sleep, getImageURL };
export * from "@utils/error";
export * from "@utils/bot";

export * from "./types/Connection";
export * from "./types/Command";
export * from "./types/Message";
export * from "./types/Chat";
export * from "./types/User";
export * from "./types/Bot";
export * from "./wa/WAModule";

export { DefaultCommandConfig, DefaultConnectionConfig };

export { Command };

export { WhatsAppBot };

export default BuildBot;
