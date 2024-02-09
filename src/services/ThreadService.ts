import { UseMutationResult } from "@tanstack/react-query";
import { PromptRequest } from "../models/PromptRequest";
import { User } from "../models/User";
import { Template } from "../models/Template";
import { Modifier } from "../models/Modifier";
import { Language } from "../models/Language";

export const saveHistory = (
    user: User,
    promptRequest: PromptRequest,
    templates: Template[],
    modifiers: Modifier[],
    mutation: UseMutationResult<any, Error, FormData, unknown>
) => {
    console.log(user);
    const chatMessages = promptRequest.metadata.history;

    const newFormData = new FormData();
    newFormData.append("userId", user.id);
    newFormData.append("language_id", '1');
    newFormData.append("repository_id", user.history_repository_id.toString());
    newFormData.append("technology_id", promptRequest.technology.id.toString());
    newFormData.append("chat_messages", JSON.stringify(chatMessages));
    newFormData.append("templates_ids", JSON.stringify(templates.map(t => t.id)));
    newFormData.append("modifiers_ids", JSON.stringify(modifiers.map(m => m.id)));
    newFormData.append("prompt_parameters", JSON.stringify([]));
    newFormData.append("title", promptRequest.title);
    newFormData.append("content", promptRequest.content);

    mutation.mutate(newFormData);
}