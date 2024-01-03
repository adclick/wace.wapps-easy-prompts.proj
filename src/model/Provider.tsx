export class Provider {
    id: number;
    name: string;
    slug: string;

    constructor(name = "", slug = "") {
        this.id = 0;
        this.name = name;
        this.slug = slug;
    }

    static clone(provider: Provider): Provider {
        const newProvider = new Provider();

        newProvider.id = provider.id;
        newProvider.name = provider.name;
        newProvider.slug = provider.slug;

        return newProvider;
    }
}