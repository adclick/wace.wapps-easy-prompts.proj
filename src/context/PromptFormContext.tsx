import { createFormContext } from '@mantine/form';
import { PromptChatMessage } from '../models/PromptChatMessage';
import { PromptStatus } from '../enums';

export interface PromptFormValues {
    title: string;
    description: string;
    status: PromptStatus;
    content: string;
    language_id: string;
    repository_id: string;
    technology_id: string;
    provider_id: string;
    user_id: string;
    templates_ids: string[],
    modifiers_ids: string[],
    prompt_chat_messages: PromptChatMessage[],
    prompt_parameters: any[],

}

export const [
    PromptFormProvider,
    usePromptFormContext,
    usePromptForm
] = createFormContext<PromptFormValues>();