import { Language } from "./Language";
import { Modifier } from "./Modifier";
import { Parameter } from "./Parameter";
import { ParametersList } from "./ParametersList";
import { PromptChatMessage } from "./PromptChatMessage";
import { Provider } from "./Provider";
import { Repository } from "./Repository";
import { Technology } from "./Technology";
import { Template } from "./Template";
import { User } from "./User";

interface ChatHistory {
    role: string,
    message: string
}

export interface Metadata {
    modifiers: Modifier[],
    templates: Template[],
    history: ChatHistory[]
}

interface PromptModifier {
    modifier: Modifier
}

interface PromptTemplate {
    template: Template
}

interface PromptParameter {
    parameter: Parameter,
    value: string
}

export class Prompt {
    id: number;
    title: string;
    slug: string;
    content: string;
    description: string;
    stars: number;
    plays: number;
    created_at: Date;
    type: string;
    metadata: Metadata;
    user: User
    language: Language;
    repository: Repository;
    technology: Technology;
    provider: Provider;
    parametersList: ParametersList;
    chat_messages: PromptChatMessage[];
    prompts_modifiers: PromptModifier[];
    prompts_templates: PromptTemplate[];
    prompts_parameters: PromptParameter[];
    
    constructor() {
        this.id = 0;
        this.title = "";
        this.slug = "";
        this.content = "";
        this.description = "";
        this.stars = 0;
        this.plays = 0;
        this.created_at = new Date();
        this.type = "";
        this.metadata = {modifiers: [], history: [], templates: []}
        this.user = new User()
        this.language = new Language();
        this.repository = new Repository();
        this.technology = new Technology();
        this.provider = new Provider();
        this.parametersList = new ParametersList();
        this.chat_messages = [];
        this.prompts_modifiers = [];
        this.prompts_templates = [];
        this.prompts_parameters = [];
    }

    static clone(prompt: Prompt): Prompt {
        const newPrompt = new Prompt();

        newPrompt.id = prompt.id;
        newPrompt.title = prompt.title;
        newPrompt.slug = prompt.slug;
        newPrompt.content = prompt.content;
        newPrompt.description = prompt.description;
        newPrompt.stars = prompt.stars;
        newPrompt.plays = prompt.plays;
        newPrompt.created_at = prompt.created_at;
        newPrompt.type = prompt.type;
        newPrompt.metadata = prompt.metadata;
        newPrompt.user = prompt.user;
        newPrompt.language = prompt.language;
        newPrompt.repository = prompt.repository;
        newPrompt.technology = prompt.technology;
        newPrompt.provider = prompt.provider;
        newPrompt.parametersList = prompt.parametersList;
        newPrompt.chat_messages = prompt.chat_messages;
        newPrompt.prompts_modifiers = prompt.prompts_modifiers;
        newPrompt.prompts_templates = prompt.prompts_templates;
        newPrompt.prompts_parameters = prompt.prompts_parameters;

        return newPrompt;
    }

    static buildFromTemplate(template: Template): Prompt {
        const newPrompt = new Prompt();

        newPrompt.id = template.id;
        newPrompt.title = template.title;
        newPrompt.slug = template.slug;
        newPrompt.description = template.description;
        newPrompt.stars = template.stars;
        newPrompt.plays = template.plays;
        newPrompt.created_at = template.created_at;
        newPrompt.type = template.type;
        newPrompt.metadata = template.metadata;
        newPrompt.user = template.user;
        newPrompt.language = template.language;
        newPrompt.repository = template.repository;
        newPrompt.technology = template.technology;
        newPrompt.provider = template.provider;
        newPrompt.parametersList = template.parametersList;
        newPrompt.prompts_parameters = template.templates_parameters;

        return newPrompt;
    }
}