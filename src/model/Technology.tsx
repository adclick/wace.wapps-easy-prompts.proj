import { Modifier } from "./Modifier";
import { Provider } from "./Provider";

export class Technology {
    name: string;
    slug: string;
    default: boolean;
    providers: Provider[];
    modifiers: Modifier[];

    constructor(name = "", slug = "") {
        this.name = name;
        this.slug = slug;
        this.default = false;
        this.providers = [];
        this.modifiers = [];
    }

    static buildEmpty() {
        return new Technology()
    }
}