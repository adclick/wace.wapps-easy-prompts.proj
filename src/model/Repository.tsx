export class Repository {
    name: string;
    slug: string;

    constructor(name: string = "", slug: string = "") {
        this.name = name;
        this.slug = slug;
    }

    static buildFromApi(data: any): Repository {
        const newRepo = new Repository();

        if ('name' in data) {
            newRepo.name = data.name;
        }

        if ('slug' in data) {
            newRepo.slug = data.slug;
        }

        return newRepo;
    }
}