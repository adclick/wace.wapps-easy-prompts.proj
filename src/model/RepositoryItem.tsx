export class RepositoryItem {
    name: string;
    slug: string;
    type: string;
    score: number;
    color: string;

    constructor(name: string = "", slug: string = "", type: string = "", score: number = 50, color: string = "") {
        this.name = name;
        this.slug = slug;
        this.type = type;
        this.score = score;
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

        return newRepoItem;
    }

    static getColor(type: string) {
        switch (type) {
            case "template":
                return "yellow";
            case "modifier":
                return "green";
            default:
                return "red";
        }
    }
}