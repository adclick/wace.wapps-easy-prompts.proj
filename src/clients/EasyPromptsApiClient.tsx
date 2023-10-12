import axios from "axios";

export class EasyPromptsApiClient {
    constructor() {}

    async getAllPromptTypes() {
        const {data} = await axios.get("https://easyprompts.wacestudio.pt/ai/prompt/prompt-type");

        return data.map((d: any) => d.name);
    }
}