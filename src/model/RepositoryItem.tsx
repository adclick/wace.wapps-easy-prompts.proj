export class RepositoryItem {
    name: string;
    slug: string;
    type: string;

    constructor(name: string = "", slug: string = "", type: string = "") {
        this.name = name;
        this.slug = slug;
        this.type = type;
    }
}