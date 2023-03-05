import { IMessage } from "@interfaces/Messages";
import { Client } from "../types/Client";
export default interface ICommand {
    /**
     * * Tags do comando
     */
    tags: string[];
    /**
     * * prefixo do comando
     */
    prefix: string;
    /**
     * * Nome do comando
     */
    name: string;
    /**
     * * Descrição do comando
     */
    description: string;
    /**
     * * Categorias do comando
     */
    categories: string[];
    /**
     * * Permissões do comando
     */
    permissions: string[];
    /**
     * * Client que irá executar os métodos
     */
    bot: Client;
    /**
     * * Método chamado quando a função é executada
     * @param message Mensagem recebida
     */
    execute(message: IMessage): Promise<void>;
    /**
     * * Método chamado quando é respondido uma mensagem do comando
     * @param message
     */
    response(message: IMessage): Promise<void>;
    /**
     * * Método chamado quando é solicitado a ajuda do comando
     * @param message
     */
    help(message: IMessage): Promise<void>;
}