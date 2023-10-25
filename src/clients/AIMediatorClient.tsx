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

export class AIMediatorClient {
    baseUrl: string;

    /**
     * Constructor
     */
    constructor() {
        this.baseUrl = "https://easyprompts.wacestudio.pt";
    }

    async getPromptOptions() {
        return await this.get('/ai/prompt/options?version=2');
    }

    async submitPrompt(userPrompt: string, userPromptOptions: UserPromptOptions) {
        const { technology: responseType } = userPromptOptions;

        const queryParameters = new URLSearchParams(window.location.search);
        const live = queryParameters.get("live") !== null;

        switch (responseType) {
            case 'text-generation':
                return await this.post('/ai/text/text-generation', {
                    userPrompt,
                    userPromptOptions: userPromptOptions.toJson(),
                    sandbox: !live
                });
            default: {
                return null;
            }
        }
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