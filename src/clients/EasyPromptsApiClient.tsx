import axios from "axios";

export interface PromptType {
    prompt_type_name: string,
    prompt_type_slug: string,
    prompt_type_default: boolean,
    provider_name: string,
    provider_slug: string,
};

export interface Provider {
    provider_name: string,
    provider_slug: string,
}

export class EasyPromptsApiClient {
    baseUrl: string;

    /**
     * Constructor
     */
    constructor() {
        this.baseUrl = "https://easyprompts.wacestudio.pt";
    }

    async getPromptOptions() {
        return await this.get('/ai/prompt/options');
    }

    /**
     * Get all the prompt_types
     * @returns 
     */
    async getAllPromptTypes(): Promise<PromptType[]> {
        return await this.get('/ai/prompt/prompt-type');
    }

    /**
     * Get all the providers from a given prompt_type
     * 
     * @param promptType
     * @returns 
     */
    async getProvidersByPromptType(promptType: string): Promise<Provider[]> {
        return await this.get('/ai/prompt/provider', {
            promptType
        })
    }

    /**
     * 
     * @param promptTypeSlug 
     * @param providerSlug 
     * @param promptText 
     */
    async submitPrompt(promptTypeSlug: string, providerSlug: string, promptText: string) {
        return await this.get('/ai/text/generate', {
            text: promptText
        });
    }

    /**
     * 
     * @param path 
     * @param params 
     * @returns 
     */
    async get(path: string, params: any = {}) {
        const { data } = await axios.get(`${this.baseUrl}${path}`, {
            params
        });

        const { body } = data;

        return body;
    }
}