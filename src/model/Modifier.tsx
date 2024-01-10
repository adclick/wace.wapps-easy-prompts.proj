import { User } from "./User";

export class Modifier {
    id: number;
    title: string;
    slug: string;
    content: string;
    description: string;
    stars: number;
    plays: number;
    created_at: Date;
    type: string;
    metadata: string;
    user: User
    language: {id: number, name: string, slug: string}
    repository: {id: number, name: string, slug: string}
    
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
        this.metadata = "";
        this.user = new User()
        this.language = {id: 0, name: "", slug: ""}
        this.repository = {id: 0, name: "", slug: ""}
    }

    static clone(modifier: Modifier): Modifier {
        const newModifier = new Modifier();

        newModifier.id = modifier.id;
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

        return newModifier;
    }
}