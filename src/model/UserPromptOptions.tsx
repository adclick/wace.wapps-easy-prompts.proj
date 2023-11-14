import { Parameter } from "./PromptOptions";


interface UserParameter {
    slug: string,
    type: string,
    value: string
}

interface UserModifier {
    slug: string,
    value: string
}

export class UserPromptOptions {
    technology: string;
    provider: string;
    parameters: UserParameter[];
    promptModifiers: UserModifier[];

    constructor() {
        this.technology = "";
        this.provider = "";
        this.parameters = [];
        this.promptModifiers = [];
    }

    setTechnology(technology: string) {
        this.technology = technology;
    }

    setProvider(provider: string) {
        this.provider = provider;
    }

    setParameter(parameter: Parameter) {
        const currentParameter = this.parameters.find(p => p.slug == parameter.slug);

        // New parameter
        if (currentParameter === undefined) {
            this.parameters.push({
                slug: parameter.slug,
                type: parameter.slug,
                value: ""
            });
        } else {
            // Existing parameter
            
            
        }

        
    }

    setPromptModifier(slug: string, value: string) {
        this.promptModifiers.push({ slug, value });
    }

    toJson() {
        return {
            technology: this.technology,
            provider: this.provider,
            parameters: this.parameters,
            promptModifiers: this.promptModifiers
        }
    }
}