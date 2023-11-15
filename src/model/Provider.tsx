import { Parameter } from "./Parameter";

export class Provider {
    name: string;
    slug: string;
    default: boolean;
    parameters: Parameter[];

    constructor() {
        this.name = "";
        this.slug = "";
        this.default = false;
        this.parameters = [];
    }
}