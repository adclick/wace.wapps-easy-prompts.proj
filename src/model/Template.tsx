import { Language } from "./Language";
import { Modifier } from "./Modifier";
import { ParametersList } from "./ParametersList";
import { Metadata } from "./Prompt";
import { Provider } from "./Provider";
import { Repository } from "./Repository";
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
    language: Language;
    repository: Repository;
    technology: Technology;
    provider: Provider;
    parametersList: ParametersList;
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
        this.language = new Language();
        this.repository = new Repository();
        this.technology = new Technology();
        this.provider = new Provider();
        this.parametersList = new ParametersList()
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
        newTemplate.parametersList = template.parametersList;
        newTemplate.templates_modifiers = template.templates_modifiers;

        return newTemplate;
    }
}