export class Language {
    id: number;
    name: string;
    slug: string;
    default: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.slug = "";
        this.default = false;
    }
}