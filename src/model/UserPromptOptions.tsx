import { PromptOptions } from "./PromptOptions";

export class UserPromptOptions {
    promptOptions: PromptOptions;
    technology: string;
    provider: string;
    promptModifiers: string[]
    
    constructor() {
        this.promptOptions = new PromptOptions();

        this.technology = "";
        this.provider = "";
        this.promptModifiers = [];
    }

    setPromptOptions(promptOptions: PromptOptions) {
        this.promptOptions = promptOptions;
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

    getTechnologyName() {
        return this.promptOptions.getTechnologyBySlug(this.technology)?.name;
    }

    getProviderName() {
        return this.promptOptions.getProviderBySlug(this.provider)?.name;
    }

    toJson() {
        return {
            technology: this.promptOptions.getTechnologyBySlug(this.technology),
            provider: this.promptOptions.getProviderBySlug(this.provider),
            promptModifiers: this.promptModifiers
        }
    }
}