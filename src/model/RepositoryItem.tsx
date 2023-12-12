import { IconPrompt, IconSparkles, IconTemplate } from "@tabler/icons-react";

export class RepositoryItem {
    id: number;
    name: string;
    slug: string;
    type: string;
    score: number;
    content: string;
    color: string;
    technology_name: string;
    technology_slug: string;
    provider_name: string;
    provider_slug: string;
    category_name: string;
    category_slug: string;
    created_at: string;
    username: string;
    user_email: string;
    repository_name: string;
    repository_slug: string;
    icon: any;

    constructor(name: string = "", slug: string = "", type: string = "", score: number = 50, content: string = "", color: string = "") {
        this.id = 0;
        this.name = name;
        this.slug = slug;
        this.type = type;
        this.score = score;
        this.content = content;
        this.color = color;
        this.technology_name = "";
        this.technology_slug = "";
        this.provider_name = "";
        this.provider_slug = "";
        this.category_name = "";
        this.category_slug = "";
        this.created_at = "";
        this.username = "";
        this.user_email = "";
        this.repository_name = "";
        this.repository_slug = "";
        this.icon = null;
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