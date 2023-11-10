import { Parameter } from "./PromptOptions";

interface UserTechnology {
    slug: string
}

interface UserProvider {
    slug: string
}

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
    technology: UserTechnology;
    provider: UserProvider;
    parameters: UserParameter[];
    promptModifiers: UserModifier[];

    constructor() {
        this.technology = { slug: "" };
        this.provider = { slug: "" };
        this.parameters = [];
        this.promptModifiers = [];
    }

    setTechnology(technology: string) {
        this.technology.slug = technology;
    }

    setProvider(provider: string) {
        this.provider.slug = provider;
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