import { Language } from "./Language";
import { Modifier } from "./Modifier";
import { Parameter } from "./Parameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class UserPromptOptions {
    technology: Technology;
    provider: Provider;
    language: Language
    parameters: Parameter[];
    modifiers: Modifier[];

    constructor() {
        this.technology = new Technology();
        this.provider = new Provider();
        this.language = new Language();
        this.parameters = [];
        this.modifiers = [];
    }

    setTechnology(technology: Technology) {
        this.technology = technology;
    }

    setProvider(provider: Provider) {
        this.provider = provider;
    }

    setLanguage(code: string) {
        this.language.setCode(code);
    }

    setParameters(parameters: Parameter[]) {
        this.parameters = parameters;
    }

    setModifiers(modifiers: Modifier[]) {
        this.modifiers = modifiers;
    }

    setParameter(slug: string, value: any) {
        for (const [index, parameter] of this.parameters.entries()) {
            if (parameter.slug === slug) {
                this.parameters[index].value = value;
                return;
            }
        }

        // Add new parameter
        const newParameter = new Parameter();
        newParameter.setSlug(slug);
        newParameter.setValue(value);
        this.parameters.push(newParameter);
    }
}