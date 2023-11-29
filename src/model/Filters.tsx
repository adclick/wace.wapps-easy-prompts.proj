export enum Type {
    Prompts = "prompts",
    Templates = "templates",
};

export class Filters {
    userId: string;
    repository: string;
    language: string;
    types: Type[];
    technology: string;
    provider: string;
    text: string;

    constructor(
        userId: string = "",
        repository: string = "",
        language: string = "",
        technology: string = "",
        provider: string = "",
        text: string = ""
    ) {
        this.userId = userId;
        this.repository = repository;
        this.language = language
        this.types = [Type.Prompts, Type.Templates];
        this.technology = technology;
        this.provider = provider;
        this.text = text;
    }
}