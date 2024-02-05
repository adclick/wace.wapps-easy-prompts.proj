import { createFormContext } from '@mantine/form';

export interface UpdateModifierFormValues {
    title: string;
    description: string;
    content: string;
    language_id: string;
    repository_id: string;
    technology_id: string;
    provider_id: string;
    user_id: string;
}

export const [
    UpdateModifierFormProvider,
    useUpdateModifierFormContext,
    useUpdateModifierForm
] = createFormContext<UpdateModifierFormValues>();