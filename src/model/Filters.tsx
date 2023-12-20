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
    technologies: {id: number, name: string, slug: string}[];
    technology: string;
    provider: string;
    text: string;
    repositories: {id: number, name: string, slug: string}[];
    languages: {id: number, name: string, slug: string}[];
    theme: string;

    constructor() {
        this.text = "";
        this.prompt = "";
        this.userId = "";
        this.repository = "";
        this.language = ""
        this.types = [Type.Prompts, Type.Templates, Type.Modifiers];
        this.technologies = [];
        this.technology = "";
        this.provider = "";
        this.repositories = [];
        this.languages = [];
        this.theme = "";
    }

    static buildFromQuery(data: any) {
        const newFilters = new Filters();



        return newFilters;
    }
}