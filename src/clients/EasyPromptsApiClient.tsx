import axios from "axios";

export interface PromptType {
    prompt_type_name: string,
    prompt_type_slug: string,
    provider_name: string,
    provider_slug_: string
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
     * Get all the types of prompts
     * @returns 
     */
    async getAllPromptTypes(): Promise<PromptType[]> {
        const { data } = await axios.get(`${this.baseUrl}/ai/prompt/prompt-type`);

        return data;
    }

    async getProvidersByPromptType(promptType: string): Promise<Array<Provider>> {
        const { data } = await axios.get(`${this.baseUrl}/ai/prompt/provider?promptType=${promptType}`);

        return data;
    }
}