import { Color } from "../enums";
import { Language } from "./Language";
import { Modifier } from "./Modifier";
import { ParametersList } from "./ParametersList";
import { PromptChatMessage } from "./PromptChatMessage";
import { PromptParameter } from "./PromptParameter";
import { Provider } from "./Provider";
import { Repository } from "./Repository";
import { Technology } from "./Technology";
import { Template } from "./Template";
import { User } from "./User";

export interface PromptModifier {
    modifier: Modifier
}

export interface PromptTemplate {
    template: Template
}

export class Prompt {
    id: number;
    uuid: string;
    title: string;
    slug: string;
    content: string;
    description: string;
    response: string;
    created_at: Date;
    type: string;
    user: User
    language: Language;
    repository: Repository;
    technology: Technology;
    provider: Provider;
    templates: Template[];
    modifiers: Modifier[];
    parametersList: ParametersList;
    prompts_chat_messages: PromptChatMessage[];
    prompts_modifiers: PromptModifier[];
    prompts_templates: PromptTemplate[];
    prompts_parameters: PromptParameter[];
    
    constructor() {
        this.id = 0;
        this.uuid = "";
        this.title = "";
        this.slug = "";
        this.content = "";
        this.description = "";
        this.response = "";
        this.created_at = new Date();
        this.type = "";
        this.user = new User()
        this.language = new Language();
        this.repository = new Repository();
        this.technology = new Technology();
        this.provider = new Provider();
        this.templates = [];
        this.modifiers = [];
        this.parametersList = new ParametersList();
        this.prompts_chat_messages = [];
        this.prompts_modifiers = [];
        this.prompts_templates = [];
        this.prompts_parameters = [];
    }

    static clone(prompt: Prompt): Prompt {
        const newPrompt = new Prompt();

        newPrompt.id = prompt.id;
        newPrompt.uuid = prompt.uuid;
        newPrompt.title = prompt.title;
        newPrompt.slug = prompt.slug;
        newPrompt.content = prompt.content;
        newPrompt.description = prompt.description;
        newPrompt.response = prompt.response;
        newPrompt.created_at = prompt.created_at;
        newPrompt.type = prompt.type;
        newPrompt.user = prompt.user;
        newPrompt.language = prompt.language;
        newPrompt.repository = prompt.repository;
        newPrompt.technology = prompt.technology;
        newPrompt.provider = prompt.provider;
        newPrompt.templates = prompt.templates;
        newPrompt.modifiers = prompt.modifiers;
        newPrompt.parametersList = prompt.parametersList;
        newPrompt.prompts_chat_messages = prompt.prompts_chat_messages;
        newPrompt.prompts_modifiers = prompt.prompts_modifiers;
        newPrompt.prompts_templates = prompt.prompts_templates;
        newPrompt.prompts_parameters = prompt.prompts_parameters;

        return newPrompt;
    }

    static getColor(): Color {
        return Color.blue;
    }
}