import { CraftParameter } from "./CraftParameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class AIRequest {
    id: number;
    title: string;
    prompt: string;
    technology: Technology;
    provider: Provider;
    crafts_parameters: CraftParameter[];
    timestamp: number;

    constructor(id: number) {
        this.id = id;
        this.title = "";
        this.prompt = "";
        this.technology = new Technology();
        this.provider = new Provider();
        this.crafts_parameters = [];
        this.timestamp = Date.now();
    }

    static clone (aiRequest: AIRequest): AIRequest {
        const newAIRequest = new AIRequest(aiRequest.id);

        newAIRequest.title = aiRequest.title;
        newAIRequest.prompt = aiRequest.prompt;
        newAIRequest.timestamp = aiRequest.timestamp;
        newAIRequest.technology = Technology.clone(aiRequest.technology);
        newAIRequest.provider = Provider.clone(aiRequest.provider);
        newAIRequest.crafts_parameters = aiRequest.crafts_parameters.map(cp => CraftParameter.clone(cp));

        return newAIRequest;
    }
}