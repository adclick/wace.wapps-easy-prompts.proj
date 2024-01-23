import { Modifier } from "./Modifier";
import { Provider } from "./Provider";
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
    language: {id: number, name: string, slug: string}
    repository: {id: number, name: string, slug: string}
    technology: Technology;
    provider: Provider;
    
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
        this.language = {id: 0, name: "", slug: ""}
        this.repository = {id: 0, name: "", slug: ""}
        this.technology = new Technology();
        this.provider = new Provider();
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

        return newPrompt;
    }
}