import { Color } from "../enums";
import { Language } from "./Language";
import { Provider } from "./Provider";
import { Repository } from "./Repository";
import { Technology } from "./Technology";
import { User } from "./User";

export class Modifier {
    id: number;
    uuid: string;
    title: string;
    slug: string;
    content: string;
    description: string;
    stars: number;
    plays: number;
    created_at: Date;
    type: string;
    metadata: string;
    user: User;
    language: Language;
    repository: Repository;
    technology: Technology;
    provider: Provider;
    
    constructor() {
        this.id = 0;
        this.uuid = "";
        this.title = "";
        this.slug = "";
        this.content = "";
        this.description = "";
        this.stars = 0;
        this.plays = 0;
        this.created_at = new Date();
        this.type = "";
        this.metadata = "";
        this.user = new User()
        this.language = new Language()
        this.repository = new Repository()
        this.technology = new Technology();
        this.provider = new Provider();
    }

    static clone(modifier: Modifier): Modifier {
        const newModifier = new Modifier();

        newModifier.id = modifier.id;
        newModifier.uuid = modifier.uuid;
        newModifier.title = modifier.title;
        newModifier.slug = modifier.slug;
        newModifier.content = modifier.content;
        newModifier.description = modifier.description;
        newModifier.stars = modifier.stars;
        newModifier.plays = modifier.plays;
        newModifier.created_at = modifier.created_at;
        newModifier.type = modifier.type;
        newModifier.metadata = modifier.metadata;
        newModifier.user = modifier.user;
        newModifier.language = modifier.language;
        newModifier.repository = modifier.repository;
        newModifier.technology = modifier.technology;
        newModifier.provider = modifier.provider;

        return newModifier;
    }

    static getColor() {
        return Color.green;
    }
}