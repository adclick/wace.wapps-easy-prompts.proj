import { UserPromptOptions } from "@/model/UserPromptOptions";
import axios from "axios";

export class AIMediatorClient {
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

    async optimizePrompt(userPrompt: string, userPromptOptions: UserPromptOptions) {
        return await this.post('/ai/prompt/optimization', {
            prompt: userPrompt,
            promptOptions: userPromptOptions
        });
    }

    async submitPrompt(userPrompt: string, userPromptOptions: UserPromptOptions) {
        const { technology } = userPromptOptions;

        const queryParameters = new URLSearchParams(window.location.search);
        const live = queryParameters.get("live") !== null;

        const requestParameters = {
            userPrompt: userPrompt,
            userPromptOptions: userPromptOptions.toJson(),
            sandbox: !live
        };

        switch (technology.slug) {
            case 'text-generation':
                return await this.post('/ai/text/text-generation', requestParameters);
            case 'image-generation':
                return await this.post('/ai/image/image-generation', requestParameters);
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

    /**
     * 
     * @param path 
     * @param params 
     * @returns 
     */
    async post(path: string, params: any = {}) {
        const { data } = await axios.post(`${this.baseUrl}${path}`, {
            params
        });

        const { body } = data;

        return body;
    }
}