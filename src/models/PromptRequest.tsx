import { Parameter } from "./Parameter";
import { Prompt } from "./Prompt";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export enum PromptRequestType {
    New = "New",
    Prompt = "Prompt",
    Template = "Template",
}

export class PromptRequest extends Prompt {
    key: number;
    isPlayable: boolean;
    chatReply: string;
    providers: Provider[];
    type: PromptRequestType;

    constructor(key: number = 0, id: number = 0) {
        super();
        this.key = key;
        this.id = id;
        this.isPlayable = false;
        this.chatReply = "";
        this.providers = [];
        this.type = PromptRequestType.New;
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
        newPromptRequest.parametersList = promptRequest.parametersList;
        newPromptRequest.response = promptRequest.response;
        newPromptRequest.isPlayable = promptRequest.isPlayable
        newPromptRequest.chatReply = promptRequest.chatReply;
        newPromptRequest.providers = promptRequest.providers;
        newPromptRequest.type = promptRequest.type;

        return newPromptRequest;
    }
}