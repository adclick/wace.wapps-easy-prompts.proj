import { createFormContext } from '@mantine/form';

export interface UpdatePromptFormValues {
    title: string;
    description: string;
    content: string;
    language_id: string;
    repository_id: string;
    technology_id: string;
    provider_id: string | undefined;
    user_id: string;
    templates_ids: string[];
    modifiers_ids: string[];
}

export const [
    UpdatePromptFormProvider,
    useUpdatePromptFormContext,
    useUpdatePromptForm
] = createFormContext<UpdatePromptFormValues>();