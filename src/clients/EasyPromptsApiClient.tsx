import axios from "axios";

export interface PromptType {
    prompt_type_name: string,
    prompt_type_slug: string,
    provider_name: string,
    provider_slug: string
};

export interface Provider {
    id: number,
    name: string,
    slug: string
}

export class EasyPromptsApiClient {
    baseUrl: string;

    /**
     * Constructor
     */
    constructor() {
        this.baseUrl = "https://easyprompts.wacestudio.pt";
    }

    /**
     * Get all the prompt_types
     * @returns 
     */
    async getAllPromptTypes(): Promise<PromptType[]> {
        const { data } = await axios.get(`${this.baseUrl}/ai/prompt/prompt-type`);

        return data;
    }

    /**
     * Get all the providers from a given prompt_type
     * 
     * @param promptType
     * @returns 
     */
    async getProvidersByPromptType(promptType: string): Promise<Provider[]> {
        const { data } = await axios.get(`${this.baseUrl}/ai/prompt/provider?promptType=${promptType}`);

        return data;
    }
}