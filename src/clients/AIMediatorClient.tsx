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

    async createUser(auth0Id: string, language: string) {
        return await this.post('/ai/user/login', {
            auth0Id,
            options: {
                language
            }
        });
    }

    async updateUser(auth0Id: string, language: string) {
        return await this.post('/ai/user/update', {
            auth0Id,
            language
        });
    }

    async getPromptOptions(userId: string | undefined, languageCode: string) {
        return await this.get('/ai/prompt/get-options', {
            userId,
            language: languageCode
        });
    }

    async getSuggestions(
        userId: string,
        prompt: string,
        technology: string,
        provider: string,
        types: string[] = ["prompts", "templates", "modifiers"],
        limit: number = 20,
        offset: number = 0
    ) {
        return await this.post('/ai/prompt/get-suggestions', {
            filters: {
                prompt,
                technology,
                provider,
                userId,
                types
            },
            limit,
            offset
        });
    }

    async getTemplates(technology: string, provider: string, limit: number, offset: number) {
        return await this.get('/ai/prompt/get-templates', {
            technology: "",
            provider: "",
            limit: 10,
            offset: 0
        })
    }

    async optimizePrompt(userPrompt: string, userPromptOptions: UserPromptOptions) {
        return await this.post('/ai/prompt/optimization', {
            prompt: userPrompt,
            promptOptions: userPromptOptions
        });
    }

    async saveModifier(name: string, content: string, technology: Technology) {
        return await this.post('/ai/prompt/set-modifier', {
            name,
            content,
            technology: technology.slug
        });
    }

    async upvotePrompt(prompt: string, technology: Technology, provider: Provider) {
        return await this.post('/ai/prompt/set-vote', {
            prompt,
            technology: technology.slug,
            provider: provider.slug
        })
    }

    async generateText(prompt: string, options: UserPromptOptions) {
        return await this.post('/ai/text/generate-text', { prompt, options });
    }

    async generateImage(prompt: string, options: UserPromptOptions): Promise<string[]> {
        const images: GeneratedImage[] = await this.post('/ai/image/image-generation',  { prompt, options });
        
        return images.map(image => image.image_resource_url);
    }

    getSandboxParam(): boolean {
        const queryParameters = new URLSearchParams(window.location.search);

        return queryParameters.get("live") === null;
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
        try {
            const { data } = await axios.post(`${this.baseUrl}${path}`, {
                ...params,
                sandbox: this.getSandboxParam()
            });

            const { body } = data;

            return body;
        } catch (e) {
            console.log(e);
            return "Error";
        }
    }
}