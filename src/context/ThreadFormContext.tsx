import { PromptChatMessage } from "../models/PromptChatMessage";

export interface ThreadFormValues {
    title: string;
    key: string;
    content: string;
    response: string;
    user_external_id: string;
    workspace_id: string;
    technology_id: string;
    provider_id: string;
    templates_ids: string[];
    modifiers_ids: string[];
    chat_messages: PromptChatMessage[];
    thread_parameters: any[]
}