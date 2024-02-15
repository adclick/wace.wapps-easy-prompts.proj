import { UseMutationResult } from "@tanstack/react-query";
import { PromptRequest } from "../models/PromptRequest";
import { User } from "../models/User";
import { Template } from "../models/Template";
import { Modifier } from "../models/Modifier";
import { PromptFormValues } from "../context/PromptFormContext";

export const saveHistory = (
    user: User,
    promptRequest: PromptRequest,
    templates: Template[],
    modifiers: Modifier[],
    mutation: UseMutationResult<any, Error, PromptFormValues, unknown>
) => {
    console.log(user);

    const formValues: PromptFormValues = {
        user_id: user.id,
        title: promptRequest.title,
        description: 'No Description',
        content: promptRequest.content,
        response: promptRequest.response,
        language_id: '1',
        repository_id: user.history_repository_id.toString(),
        technology_id: promptRequest.technology.id.toString(),
        provider_id: promptRequest.provider.id.toString(),
        templates_ids: templates.map(t => t.id.toString()),
        modifiers_ids: modifiers.map(m => m.id.toString()),
        chat_messages: [],
        prompt_parameters: []
    }

    mutation.mutate(formValues);
}