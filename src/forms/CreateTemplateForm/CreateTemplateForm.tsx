import { Button, Group } from "@mantine/core";
import { CreateTemplateFormProvider, useCreateTemplateForm } from "../../context/CreateTemplateFormContext";
import { useCreateTemplateMutation } from "../../api/templatesApi";
import { useUser } from "../../context/UserContext";
import { LanguageField } from "./Fields/LanguageField";
import { RepositoryField } from "./Fields/RepositoryField";
import { TechnologyField } from "./Fields/TechnologyField";
import { ProviderField } from "./Fields/ProviderField";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { ContentField } from "./Fields/ContentField";

export function CreateTemplateForm() {
    const createMutation = useCreateTemplateMutation();
    const { user } = useUser();

    const form = useCreateTemplateForm({
        initialValues: {
            title: '',
            description: '',
            language_id: '',
            repository_id: '',
            technology_id: '',
            provider_id: '',
            modifiers_ids: [],
            chat_messages: [],
            template_parameters: [],
            user_id: user.id
        }
    });

    const submit = () => {
        createMutation.mutate(form.values);
    }

    return (
        <CreateTemplateFormProvider form={form}>
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
        </CreateTemplateFormProvider>
    )
}