export class Repository {
    name: string;
    slug: string;

    constructor(name: string = "", slug: string = "") {
        this.name = name;
        this.slug = slug;
    }
}