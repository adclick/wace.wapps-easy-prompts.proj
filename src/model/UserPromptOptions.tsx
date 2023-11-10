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