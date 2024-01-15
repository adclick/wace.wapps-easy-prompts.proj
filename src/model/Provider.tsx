export class Provider {
    id: number;
    name: string;
    slug: string;
    model_name: string;
    model_slug: string

    constructor(name = "", slug = "") {
        this.id = 0;
        this.name = name;
        this.slug = slug;
        this.model_name = "";
        this.model_slug = "";
    }

    static clone(provider: Provider): Provider {
        const newProvider = new Provider();

        newProvider.id = provider.id;
        newProvider.name = provider.name;
        newProvider.slug = provider.slug;
        newProvider.model_name = provider.model_name;
        newProvider.model_slug = provider.model_slug;

        return newProvider;
    }
}