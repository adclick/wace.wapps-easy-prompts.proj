import { Button, Group, Stack } from "@mantine/core";
import { UpdateTemplateFormProvider, useUpdateTemplateForm } from "../../context/UpdateTemplateFormContext";
import { useUpdateTemplateMutation } from "../../api/templatesApi";
import { useUser } from "../../context/UserContext";
import { LanguageField } from "./Fields/LanguageField";
import { RepositoryField } from "./Fields/RepositoryField";
import { TechnologyField } from "./Fields/TechnologyField";
import { ProviderField } from "./Fields/ProviderField";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { ContentField } from "./Fields/ContentField";
import { Template } from "../../models/Template";
import { IconCheck } from "@tabler/icons-react";

interface UpdateTemplateForm {
    template: Template;
    handle: any
}

export function UpdateTemplateForm({ template, handle }: UpdateTemplateForm) {
    const UpdateMutation = useUpdateTemplateMutation(template.id);
    const { user } = useUser();

    const form = useUpdateTemplateForm({
        initialValues: {
            title: template.title,
            description: template.description,
            language_id: template.language.id.toString(),
            repository_id: template.repository.id.toString(),
            technology_id: template.technology.id.toString(),
            provider_id: template.provider ? template.provider.id.toString() : undefined,
            modifiers_ids: [],
            chat_messages: [],
            template_parameters: [],
            user_id: user.id
        }
    });

    const submit = () => {
        UpdateMutation.mutate(form.values);

        handle.close();
    }

    return (
        <UpdateTemplateFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <Stack gap={"xs"}>
                    <TitleField />
                    <DescriptionField />
                    <LanguageField />
                    <RepositoryField />
                    <TechnologyField />
                    <ProviderField />

                    <Group justify="flex-end">
                        <Button type="submit" variant="transparent" color="gray" leftSection={<IconCheck size={14} />}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </UpdateTemplateFormProvider>
    )
}