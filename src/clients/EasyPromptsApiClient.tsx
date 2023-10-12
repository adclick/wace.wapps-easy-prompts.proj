import axios from "axios";

export interface PromptType {
    id: number,
    name: string,
    slug: string
};

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
     * @returns Array
     */
    async getAllPromptTypes(): Promise<Array<PromptType>> {
        const {data} = await axios.get(`${this.baseUrl}/ai/prompt/prompt-type`);

        return data;
    }
}