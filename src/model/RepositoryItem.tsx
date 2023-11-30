export class RepositoryItem {
    name: string;
    slug: string;
    type: string;
    score: number;

    constructor(name: string = "", slug: string = "", type: string = "", score: number = 50) {
        this.name = name;
        this.slug = slug;
        this.type = type;
        this.score = score;
    }
}