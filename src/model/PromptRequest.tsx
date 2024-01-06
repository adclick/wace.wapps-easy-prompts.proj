import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class PromptRequest {
    key: number;
    id: number;
    title: string;
    description: string;
    content: string;
    technology: Technology;
    provider: Provider;
    response: any;

    constructor(key: number = 0, id: number = 0) {
        this.key = key;
        this.id = id;
        this.title = "";
        this.content = "";
        this.description = "";
        this.technology = new Technology();
        this.provider = new Provider();
        this.response = "";
    }

    static clone(promptRequest: PromptRequest): PromptRequest {
        const newPromptRequest = new PromptRequest(promptRequest.id);

        newPromptRequest.key = promptRequest.key;
        newPromptRequest.id = promptRequest.id;
        newPromptRequest.title = promptRequest.title;
        newPromptRequest.content = promptRequest.content;
        newPromptRequest.description = promptRequest.description;
        newPromptRequest.technology = Technology.clone(promptRequest.technology);
        newPromptRequest.provider = Provider.clone(promptRequest.provider);
        newPromptRequest.response = promptRequest.response;

        return newPromptRequest;
    }
}