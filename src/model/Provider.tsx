import { Parameter } from "./Parameter";

export class Provider {
    name: string;
    slug: string;
    default: boolean;
    parameters: Parameter[];

    constructor(name = "", slug = "") {
        this.name = name;
        this.slug = slug;
        this.default = false;
        this.parameters = [];
    }
}