import { Modifier } from "./Modifier";
import { Parameter } from "./Parameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class Options {
    technologies: Technology[];
    providers: Provider[];
    parameters: Parameter[];
    modifiers: Modifier[];

    constructor() {
        this.technologies = [];
        this.providers = [];
        this.parameters = [];
        this.modifiers = [];
    }

    static buildFromApi(options: any): Options {
        const newOptions = new Options();

        if ("technologies" in options) {
            newOptions.technologies = options.technologies;
        }

        return newOptions;
    }
}