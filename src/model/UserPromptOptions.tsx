export class UserPromptOptions {
    technology: string;
    provider: string;
    promptModifiers: string[]
    
    constructor() {
        this.technology = "";
        this.provider = "";
        this.promptModifiers = [];
    }

    setTechnology(technology: string) {
        this.technology = technology;
    }

    setProvider(provider: string) {
        this.provider = provider;
    }

    setPromptModifiers(promptMOdifiers: string[]) {
        this.promptModifiers = promptMOdifiers;
    }

    toJson() {
        return {
            technology: this.technology,
            provider: this.provider,
            promptModifiers: this.promptModifiers
        }
    }
}