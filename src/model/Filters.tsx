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
    repositories: {id: number, name: string, slug: string}[];

    constructor() {
        this.text = "";
        this.prompt = "";
        this.userId = "";
        this.repository = "";
        this.language = ""
        this.types = [Type.Prompts, Type.Templates, Type.Modifiers];
        this.technology = "";
        this.provider = "";
        this.repositories = [];
    }
}