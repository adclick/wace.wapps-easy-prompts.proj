import { UserPromptOptions } from "@/model/UserPromptOptions";
import axios from "axios";

type GeneratedImage = {
    image_resource_url: string
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
        return await this.get('/ai/prompt/options');
    }

    async optimizePrompt(userPrompt: string, userPromptOptions: UserPromptOptions) {
        return await this.post('/ai/prompt/optimization', this.getParams(userPrompt, userPromptOptions));
    }

    async generateText(userPrompt: string, userPromptOptions: UserPromptOptions) {
        return await this.post('/ai/text/text-generation', this.getParams(userPrompt, userPromptOptions));
    }

    async generateImage(userPrompt: string, userPromptOptions: UserPromptOptions) {
        const images: GeneratedImage[] = await this.post('/ai/image/image-generation', this.getParams(userPrompt, userPromptOptions));

        return images.map(image => {
            return image.image_resource_url;
        });
    }

    getParams(userPrompt: string, userPromptOptions: UserPromptOptions) {
        const queryParameters = new URLSearchParams(window.location.search);
        const live = queryParameters.get("live") !== null;

        return {
            userPrompt,
            userPromptOptions,
            sandbox: !live
        };
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
        axios.defaults.timeout = 5000;
        try {
            const { data } = await axios.post(`${this.baseUrl}${path}`, {
                params
            });
    
            const { body } = data;
    
            return body;
        } catch (e) {
            console.log(e);
            return "Error";
        }
    }
}