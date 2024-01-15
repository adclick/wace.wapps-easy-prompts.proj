import { Prompt } from "./Prompt";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class PromptRequest extends Prompt {
    key: number;
    response: any;
    isPlayable: boolean;
    chatReply: string;
    providers: Provider[]

    constructor(key: number = 0, id: number = 0) {
        super();
        this.key = key;
        this.id = id;
        this.response = "";
        this.isPlayable = false;
        this.chatReply = "";
        this.providers = [];
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
        newPromptRequest.isPlayable = promptRequest.isPlayable
        newPromptRequest.chatReply = promptRequest.chatReply;
        newPromptRequest.providers = promptRequest.providers;

        return newPromptRequest;
    }
}