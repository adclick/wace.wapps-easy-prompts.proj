import { UserPromptOptions } from "@/model/UserPromptOptions";
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

    async submitPrompt(userPrompt: string, userPromptOptions: UserPromptOptions) {
        return await this.post('/ai/prompt/submit', {
            userPrompt,
            userPromptOptions: userPromptOptions.toJson()
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

    async post(path: string, params: any = {}) {
        const { data } = await axios.post(`${this.baseUrl}${path}`, {
            params
        });

        const { body } = data;

        return body;
    }
}