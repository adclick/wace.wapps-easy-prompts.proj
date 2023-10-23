export class UserPromptOptions {
    responseType: string;
    provider: string;
    promptModifiers: string[]
    
    constructor() {
        this.responseType = "";
        this.provider = "";
        this.promptModifiers = [];
    }

    setTechnology(responseType: string) {
        this.responseType = responseType;
    }

    setProvider(provider: string) {
        this.provider = provider;
    }

    setPromptModifiers(promptMOdifiers: string[]) {
        this.promptModifiers = promptMOdifiers;
    }

    toJson() {
        return {
            responseType: this.responseType,
            provider: this.provider,
            promptModifiers: this.promptModifiers
        }
    }
}