export class Parameter {
    name: string;
    slug: string;
    content: any;
    value: any;

    constructor() {
        this.name = "";
        this.slug = "";
        this.content = "";
        this.value = "";
    }

    setSlug(slug: string) {
        this.slug = slug;
    }

    setValue(value: any): any {
        this.value = value;
    }
}