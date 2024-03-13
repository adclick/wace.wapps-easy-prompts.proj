import { createFormContext } from '@mantine/form';
import { PromptChatMessage } from '../models/PromptChatMessage';
import { TemplateParameter } from '../models/TemplateParameter';

export interface TemplateFormValues {
    title: string;
    description: string;
    language_id: string;
    repository_id: string;
    technology_id: string;
    provider_id: string;
    modifiers_ids: string[];
    chat_messages: PromptChatMessage[];
    template_parameters: TemplateParameter[];
    user_id: string;
}

export const [
    TemplateFormProvider,
    useTemplateFormContext,
    useTemplateForm
] = createFormContext<TemplateFormValues>();