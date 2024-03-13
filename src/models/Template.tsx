import { Language } from "./Language";
import { Modifier } from "./Modifier";
import { Provider } from "./Provider";
import { Repository } from "./Repository";
import { Technology } from "./Technology";
import { TemplateParameter } from "./TemplateParameter";
import { User } from "./User";

interface TemplateModifier {
    modifier: Modifier
}

export class Template {
    id: number;
    uuid: string;
    title: string;
    slug: string;
    description: string;
    stars: number;
    plays: number;
    created_at: Date;
    type: string;
    user: User
    language: Language;
    repository: Repository;
    technology: Technology;
    provider: Provider;
    templates_modifiers: TemplateModifier[];
    templates_parameters: TemplateParameter[];
    
    constructor() {
        this.id = 0;
        this.uuid = "";
        this.title = "";
        this.slug = "";
        this.description = "";
        this.stars = 0;
        this.plays = 0;
        this.created_at = new Date();
        this.type = "";
        this.user = new User()
        this.language = new Language();
        this.repository = new Repository();
        this.technology = new Technology();
        this.provider = new Provider();
        this.templates_modifiers = [];
        this.templates_parameters = [];
    }

    static clone(template: Template): Template {
        const newTemplate = new Template();

        newTemplate.id = template.id;
        newTemplate.uuid = template.uuid;
        newTemplate.title = template.title;
        newTemplate.slug = template.slug;
        newTemplate.description = template.description;
        newTemplate.stars = template.stars;
        newTemplate.plays = template.plays;
        newTemplate.created_at = template.created_at;
        newTemplate.type = template.type;
        newTemplate.user = template.user;
        newTemplate.language = template.language;
        newTemplate.repository = template.repository;
        newTemplate.provider = template.provider;
        newTemplate.templates_modifiers = template.templates_modifiers;
        newTemplate.templates_parameters = template.templates_parameters;

        return newTemplate;
    }
}