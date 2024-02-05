import { Button, Group } from "@mantine/core";
import { CreateModifierFormProvider, useCreateModifierForm } from "../../context/CreateModifierFormContext";
import { useCreateModifierMutation } from "../../api/modifiersApi";
import { useUser } from "../../context/UserContext";
import { LanguageField } from "./Fields/LanguageField";
import { RepositoryField } from "./Fields/RepositoryField";
import { TechnologyField } from "./Fields/TechnologyField";
import { ProviderField } from "./Fields/ProviderField";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { ContentField } from "./Fields/ContentField";

export function CreateModifierForm() {
    const createMutation = useCreateModifierMutation();
    const { user } = useUser();

    const form = useCreateModifierForm({
        initialValues: {
            title: '',
            description: '',
            content: '',
            language_id: '',
            repository_id: '',
            technology_id: '',
            provider_id: '',
            user_id: user.id
        }
    });

    const submit = () => {
        createMutation.mutate(form.values);
    }

    return (
        <CreateModifierFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <TitleField />
                <DescriptionField />
                <ContentField />
                <LanguageField />
                <RepositoryField />
                <TechnologyField />
                <ProviderField />

                <Group>
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </CreateModifierFormProvider>
    )
}