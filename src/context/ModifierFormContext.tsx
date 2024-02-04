import { createFormContext } from '@mantine/form';

export interface ModifierFormValues {
    title: string;
    description: string;
    content: string;
    language_id: number;
    repository_id: number;
    technology_id: number;
    provider_id: number;
    user_id: string;
}

export const [
    ModifierFormProvider,
    useModifierFormContext,
    useModifierForm
] = createFormContext<ModifierFormValues>();