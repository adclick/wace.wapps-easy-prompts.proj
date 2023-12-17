export class Repository {
    name: string;
    slug: string;
    color: string;

    constructor(name: string = "", slug: string = "") {
        this.name = name;
        this.slug = slug;
        this.color = "";
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

    static getType(name: string) {
        switch(name) {
            case "wace":
                return "shared";
            default:
                return "private";
        }
    }

    static getColor(type: string) {
        switch(type) {
            case "public":
                return "lightgreen";
            case "shared":
                return "orange";
            case "private":
                return "lightblue"
        }
    }
}