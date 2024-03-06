import { Modifier } from "./Modifier";

export class PromptChatMessage {
    role: string;
    message: string;
    threads_chat_messages_modifiers: {modifier: Modifier}[]

    constructor() {
        this.role = "";
        this.message = "";
        this.threads_chat_messages_modifiers = [];
    }
}