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
}