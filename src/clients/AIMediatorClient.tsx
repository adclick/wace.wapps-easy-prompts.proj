import axios from "axios";
import { UserPromptOptions } from "../model/UserPromptOptions";
import { Technology } from "../model/Technology";
import { Provider } from "../model/Provider";

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

    async getPromptOptions(userId: string|undefined, languageCode: string) {
        return await this.get('/ai/prompt/options', { 
            userId,
            language: languageCode 
        });
    }

    async getUsedPrompts() {
        return await this.get('/ai/prompt/get', {
            prompt: "",
            technology: "",
            provider: "",
            limit: 4,
            offset: 4
        });
    }

    async detectLanguage(userPrompt: string, userPromptOptions: UserPromptOptions) {
        return await this.post('/ai/prompt/language-detection', this.getParams(userPrompt, userPromptOptions));
    }

    async optimizePrompt(userPrompt: string, userPromptOptions: UserPromptOptions) {
        return await this.post('/ai/prompt/optimization', {
            prompt: userPrompt,
            promptOptions: userPromptOptions
        });
    }

    async saveModifier(name: string, content: string, technology: Technology) {
        return await this.post('/ai/prompt/add-modifier', {
            name,
            content,
            technology: technology.slug
        });
    }

    async upvotePrompt(prompt: string, technology: Technology, provider: Provider) {
        return await this.post('/ai/prompt/upvote', {
            prompt,
            technology: technology.slug,
            provider: provider.slug
        })
    }

    async generateText(userPrompt: string, userPromptOptions: UserPromptOptions) {
        return await this.post('/ai/text/text-generation', this.getParams(userPrompt, userPromptOptions));
    }

    async generateImage(userPrompt: string, userPromptOptions: UserPromptOptions): Promise<string[]> {
        const images: GeneratedImage[] = await this.post('/ai/image/image-generation', this.getParams(userPrompt, userPromptOptions));

        return images.map(image => image.image_resource_url);
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
        axios.defaults.timeout = 10000;
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