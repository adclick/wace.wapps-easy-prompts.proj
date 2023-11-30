export enum Type {
    Prompts = "prompts",
    Templates = "templates",
    Modifiers = "modifiers"
};

export class Filters {
    prompt: string;
    userId: string;
    repository: string;
    language: string;
    types: Type[];
    technology: string;
    provider: string;
    text: string;

    constructor(
        prompt: string = "",
        userId: string = "",
        repository: string = "",
        language: string = "",
        technology: string = "",
        provider: string = "",
        text: string = ""
    ) {
        this.prompt = prompt;
        this.userId = userId;
        this.repository = repository;
        this.language = language
        this.types = [Type.Prompts, Type.Templates, Type.Modifiers];
        this.technology = technology;
        this.provider = provider;
        this.text = text;
    }
}