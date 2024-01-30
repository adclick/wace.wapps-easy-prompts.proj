import { Modifier } from "./Modifier";
import { Metadata } from "./Prompt";
import { Provider } from "./Provider";
import { Technology } from "./Technology";
import { User } from "./User";

interface TemplateModifier {
    modifier: Modifier
}

export class Template {
    id: number;
    title: string;
    slug: string;
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
    templates_modifiers: TemplateModifier[]
    
    constructor() {
        this.id = 0;
        this.title = "";
        this.slug = "";
        this.description = "";
        this.stars = 0;
        this.plays = 0;
        this.created_at = new Date();
        this.type = "";
        this.metadata = {modifiers: [], history: [], templates: []};
        this.user = new User()
        this.language = {id: 0, name: "", slug: ""}
        this.repository = {id: 0, name: "", slug: ""}
        this.technology = new Technology();
        this.provider = new Provider();
        this.templates_modifiers = [];
    }

    static clone(template: Template): Template {
        const newTemplate = new Template();

        newTemplate.id = template.id;
        newTemplate.title = template.title;
        newTemplate.slug = template.slug;
        newTemplate.description = template.description;
        newTemplate.stars = template.stars;
        newTemplate.plays = template.plays;
        newTemplate.created_at = template.created_at;
        newTemplate.type = template.type;
        newTemplate.metadata = template.metadata;
        newTemplate.user = template.user;
        newTemplate.language = template.language;
        newTemplate.repository = template.repository;
        newTemplate.provider = template.provider;
        newTemplate.templates_modifiers = template.templates_modifiers;

        return newTemplate;
    }
}