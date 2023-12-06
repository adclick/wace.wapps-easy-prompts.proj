import axios from "axios";
import { UserPromptOptions } from "../model/UserPromptOptions";
import { Technology } from "../model/Technology";
import { Provider } from "../model/Provider";
import { Filters } from "@/model/Filters";
import { User } from "../model/User";
import { RepositoryItem } from "../model/RepositoryItem";

type GeneratedImage = {
    image_resource_url: string
}


export class AIMediatorClient {
    baseUrl: string;
    repositoryItemsLimit: number

    /**
     * Constructor
     */
    constructor() {
        this.baseUrl = "https://easyprompts.wacestudio.pt";

        this.repositoryItemsLimit = 20;
    }

    async login(user: User) {
        return await this.post('/ai/user/login', {
            auth0Id: user.id,
            options: {
                email: user.email,
                language: user.language.code
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

    async getRepositoryItems(filters: Filters, limit: number = this.repositoryItemsLimit, offset: number = 0) {
        return await this.post('/ai/prompt/get-repository-items', {
            filters: {
                visibility: filters.repository === 'wace' ? 'shared' : 'private',
                prompt: filters.prompt,
                technology: filters.technology,
                provider: filters.provider,
                userId: filters.userId,
                repository: filters.repository,
                language: filters.language,
                types: filters.types
            },
            limit,
            offset
        });
    }

    async optimizePrompt(prompt: string, repositoryItems: RepositoryItem[], options: UserPromptOptions) {
        return await this.post('/ai/prompt/optimize', { prompt, repositoryItems, options });
    }

    async savePrompt(name: string, content: string, technology: string, provider: string, userId: string, repository: string, language: string) {
        return await this.post('/ai/prompt/add-prompt', {
            name,
            content,
            technology,
            provider,
            userId,
            repository,
            language
        });
    }

    async deleteRepositoryItem(item: RepositoryItem) {
        return await this.post(`/ai/prompt/delete-${item.type}`, {
            id: item.id
        });
    }

    async saveModifier(name: string, content: string, technology: string, userId: string, repository: string, language: string) {
        return await this.post('/ai/prompt/add-modifier', {
            name,
            options: {
                content,
                technology,
                userId,
                repository,
                language
            }
        });
    }

    async upvotePrompt(prompt: string, technology: Technology, provider: Provider) {
        return await this.post('/ai/prompt/set-vote', {
            prompt,
            technology: technology.slug,
            provider: provider.slug
        })
    }

    async generateText(prompt: string, repositoryItems: RepositoryItem[], options: UserPromptOptions) {
        return await this.post('/ai/text/generate-text', { prompt, repositoryItems, options });
    }
    
    async generateImage(prompt: string, options: UserPromptOptions): Promise<string[]> {
        const images: GeneratedImage[] = await this.post('/ai/image/image-generation', { prompt, options });
        
        return images.map(image => image.image_resource_url);
    }
    
    async sendFeedback(name: string, description: string) {
        return await this.post('/ai/prompt/send-feedback', { name, description });
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