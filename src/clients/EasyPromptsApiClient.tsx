import axios from "axios";

export class EasyPromptsApiClient {
    constructor() {}

    async getAllPromptTypes() {
        return await axios.get("https://easyprompts.wacestudio.pt/ai/prompt/prompt-type");
    }
}