import { createFormContext } from '@mantine/form';
import { PromptChatMessage } from '../models/PromptChatMessage';

export interface PromptFormValues {
    title: string;
    description: string;
    content: string;
    response: string;
    language_id: string;
    repository_id: string;
    technology_id: string;
    provider_id: string;
    user_id: string;
    templates_ids: string[],
    modifiers_ids: string[],
    chat_messages: PromptChatMessage[],
    prompt_parameters: any[],

}

export const [
    PromptFormProvider,
    usePromptFormContext,
    usePromptForm
] = createFormContext<PromptFormValues>();