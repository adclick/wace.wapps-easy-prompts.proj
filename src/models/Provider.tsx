import { Parameter } from "./Parameter";
import { Technology } from "./Technology";

export class Provider {
    id: number;
    name: string;
    slug: string;
    model_name: string;
    model_slug: string;
    technology: Technology
    parameters: Parameter[]

    constructor(name = "", slug = "") {
        this.id = 0;
        this.name = name;
        this.slug = slug;
        this.model_name = "";
        this.model_slug = "";
        this.technology = new Technology();
        this.parameters = [];
    }

    static clone(provider: Provider): Provider {
        const newProvider = new Provider();

        newProvider.id = provider.id;
        newProvider.name = provider.name;
        newProvider.slug = provider.slug;
        newProvider.model_name = provider.model_name;
        newProvider.model_slug = provider.model_slug;
        newProvider.technology = Technology.clone(provider.technology);
        newProvider.parameters = provider.parameters.map(p => Parameter.clone(p));

        return newProvider;
    }
}