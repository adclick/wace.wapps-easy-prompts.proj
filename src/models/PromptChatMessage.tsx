import { Modifier } from "./Modifier";
import { Template } from "./Template";

export class PromptChatMessage {
    role: string;
    message: string;
    prompts_chat_messages_modifiers: {modifier: Modifier}[];
    prompts_chat_messages_templates: {template: Template}[];
    threads_chat_messages_modifiers: {modifier: Modifier}[];
    threads_chat_messages_templates: {template: Template}[];

    constructor() {
        this.role = "";
        this.message = "";
        this.prompts_chat_messages_modifiers = [];
        this.prompts_chat_messages_templates = [];
        this.threads_chat_messages_modifiers = [];
        this.threads_chat_messages_templates = [];
    }
}