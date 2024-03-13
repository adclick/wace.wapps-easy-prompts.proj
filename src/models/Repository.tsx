export class Repository {
    id: number;
    uuid: string;
    name: string;
    slug: string;
    default: boolean;

    constructor() {
        this.id = 0;
        this.uuid = "";
        this.name = "";
        this.slug = "";
        this.default = false;
    }
}