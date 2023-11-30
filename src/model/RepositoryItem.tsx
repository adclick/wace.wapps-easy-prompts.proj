export class RepositoryItem {
    name: string;
    slug: string;
    type: string;
    score: number;
    content: string;
    color: string;

    constructor(name: string = "", slug: string = "", type: string = "", score: number = 50, content: string = "", color: string = "") {
        this.name = name;
        this.slug = slug;
        this.type = type;
        this.score = score;
        this.content = content;
        this.color = color;
    }

    static buildFromApi(data: any): RepositoryItem {
        const newRepoItem = new RepositoryItem();

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

        return newRepoItem;
    }

    static getColor(type: string) {
        switch (type) {
            case "template":
                return "indigo";
            case "modifier":
                return "teal";
            default:
                return "blue";
        }
    }
}