export enum Type {
    Prompts = "prompts",
    Templates = "templates",
    Modifiers = "modifiers"
};

export class Filters {
    userId: string;
    language: string;
    types: Type[];
    technology: string;
    provider: string;
    text: string;

    constructor(
        userId: string = "",
        language: string = "",
        technology: string = "",
        provider: string = "",
        text: string = ""
    ) {
        this.userId = userId;
        this.language = language
        this.types = [Type.Prompts, Type.Templates, Type.Modifiers];
        this.technology = technology;
        this.provider = provider;
        this.text = text;
    }
}