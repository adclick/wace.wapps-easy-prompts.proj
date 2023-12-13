import { IconPrompt, IconSparkles, IconTemplate } from "@tabler/icons-react";

export class RepositoryItem {
    id: number;
    name: string;
    slug: string;
    type: string;
    score: number;
    content: string;
    description: string;
    color: string;
    technology_name: string;
    technology_slug: string;
    provider_name: string;
    provider_slug: string;
    category_name: string;
    category_slug: string;
    created_at: string;
    username: string;
    user_id: string;
    user_email: string;
    repository_name: string;
    repository_slug: string;
    icon: any;
    modifiers: {id: number, name: string, slug: string, content: string}[];
    language_name: string;
    language_slug: string;

    constructor(name: string = "", slug: string = "", type: string = "", score: number = 50, content: string = "", color: string = "") {
        this.id = 0;
        this.name = name;
        this.slug = slug;
        this.type = type;
        this.score = score;
        this.content = content;
        this.description = "";
        this.color = color;
        this.technology_name = "";
        this.technology_slug = "";
        this.provider_name = "";
        this.provider_slug = "";
        this.category_name = "";
        this.category_slug = "";
        this.created_at = "";
        this.username = "";
        this.user_id = "";
        this.user_email = "";
        this.repository_name = "";
        this.repository_slug = "";
        this.icon = null;
        this.modifiers = [];
        this.language_name = "";
        this.language_slug = "";
    }

    static buildFromApi(data: any): RepositoryItem {
        const newRepoItem = new RepositoryItem();

        if ('id' in data) {
            newRepoItem.id = data.id;
        }

        if ('name' in data) {
            newRepoItem.name = data.name;
        }

        if ('slug' in data) {
            newRepoItem.slug = data.slug;
        }

        if ('type' in data) {
            newRepoItem.type = data.type;
            newRepoItem.color = RepositoryItem.getColor(data.type);
            newRepoItem.icon = RepositoryItem.getIcon(data.type);
        }

        if ('score' in data) {
            newRepoItem.score = data.score;
        }

        if ('content' in data) {
            newRepoItem.content = data.content;
        }

        if ('description' in data) {
            newRepoItem.description = data.description;
        }

        if ('technology_name' in data) {
            newRepoItem.technology_name = data.technology_name;
        }

        if ('technology_slug' in data) {
            newRepoItem.technology_slug = data.technology_slug;
        }

        if ('provider_name' in data) {
            newRepoItem.provider_name = data.provider_name;
        }

        if ('provider_slug' in data) {
            newRepoItem.provider_slug = data.provider_slug;
        }

        if ('category_name' in data) {
            newRepoItem.category_name = data.category_name;
        }

        if ('category_slug' in data) {
            newRepoItem.category_slug = data.category_slug;
        }

        if ('created_at' in data) {
            newRepoItem.created_at = data.created_at;
        }

        if ('user_id' in data) {
            newRepoItem.user_id = data.user_id;
        }

        if ('user_email' in data) {
            newRepoItem.username = data.user_email.replace('@wacestudio.com', '');
            newRepoItem.user_email = data.user_email;
        }

        if ('repository_name' in data) {
            newRepoItem.repository_name = data.repository_name;
        }

        if ('repository_slug' in data) {
            newRepoItem.repository_slug = data.repository_slug;
        }

        if ('modifiers' in data) {
            newRepoItem.modifiers = data.modifiers;
        }

        if ('language_slug' in data) {
            newRepoItem.language_slug = data.language_slug;
        }

        if ('language_name' in data) {
            newRepoItem.language_name = data.language_name;
        }

        return newRepoItem;
    }

    static buildFromModifier(modifier: any) {
        const newRepoItem = new RepositoryItem();

        newRepoItem.id = modifier.id;
        newRepoItem.name = modifier.name;
        newRepoItem.slug = modifier.slug;
        newRepoItem.type = "modifier";
        newRepoItem.color = this.getColor(newRepoItem.type);
        newRepoItem.content = modifier.content;

        return newRepoItem;
    }

    static getColor(type: string) {
        switch (type) {
            case "template":
                return "indigo";
            case "modifier":
                return "teal";
            default:
                return "orange";
        }
    }

    static getIcon(type: string, size: string | number = 16) {
        switch (type) {
            case "template":
                return <IconTemplate size={size} stroke={1.5} />;
            case "modifier":
                return <IconSparkles size={size} stroke={1.5} />;
            case "prompt":
                return <IconPrompt size={size} stroke={1.5} />;
            default:
                return null;
        }
    }


}