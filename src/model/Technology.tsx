import { Modifier } from "./Modifier";
import { Provider } from "./Provider";

export class Technology {
    name: string;
    slug: string;
    default: boolean;
    providers: Provider[];
    modifiers: Modifier[];

    constructor() {
        this.name = "";
        this.slug = "";
        this.default = false;
        this.providers = [];
        this.modifiers = [];
    }

    static buildEmpty() {
        return new Technology()
    }
}