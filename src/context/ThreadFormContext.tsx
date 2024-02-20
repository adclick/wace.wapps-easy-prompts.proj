import { PromptChatMessage } from "../models/PromptChatMessage";

export interface ThreadFormValues {
    title: string;
    response: string;
    prompt_id: string;
    workspace_id: string;
    key: string;
    user_id: string;
}