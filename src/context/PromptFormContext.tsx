import { createFormContext } from '@mantine/form';
import { PromptChatMessage } from '../models/PromptChatMessage';
import { PromptParameter } from '../models/PromptParameter';

export interface PromptFormValues {
    title: string;
    description: string;
    content: string;
    language_id: string;
    repository_id: string;
    technology_id: string;
    provider_id: string;
    user_id: string;
    templates_ids: string[],
    modifiers_ids: string[],
    prompt_chat_messages: PromptChatMessage[],
    prompt_parameters: PromptParameter[],
}

export const [
    PromptFormProvider,
    usePromptFormContext,
    usePromptForm
] = createFormContext<PromptFormValues>();