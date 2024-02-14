import { Button, Group, Stack } from "@mantine/core";
import { UpdateTemplateFormProvider, useUpdateTemplateForm } from "../../context/UpdateTemplateFormContext";
import { useUpdateTemplateMutation } from "../../api/templatesApi";
import { LanguageField } from "./Fields/LanguageField";
import { RepositoryField } from "./Fields/RepositoryField";
import { TechnologyField } from "./Fields/TechnologyField";
import { ProviderField } from "./Fields/ProviderField";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { Template } from "../../models/Template";
import { IconCheck } from "@tabler/icons-react";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { ModifiersField } from "./Fields/ModifiersField";

interface UpdateTemplateForm {
    template: Template;
    handle: any
}

export function UpdateTemplateForm({ template, handle }: UpdateTemplateForm) {
    const UpdateMutation = useUpdateTemplateMutation(template.id);
    const [user] = useStore(useShallow(state => [state.user]));

    const modifiersIds = template.templates_modifiers.map(tm => tm.modifier.id.toString());

    const form = useUpdateTemplateForm({
        initialValues: {
            title: template.title,
            description: template.description,
            language_id: template.language.id.toString(),
            repository_id: template.repository.id.toString(),
            technology_id: template.technology.id.toString(),
            provider_id: template.provider ? template.provider.id.toString() : undefined,
            modifiers_ids: modifiersIds,
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
                    <ModifiersField />

                    <Group justify="flex-end">
                        <Button type="submit" variant="transparent" color="gray" leftSection={<IconCheck size={14} />}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </UpdateTemplateFormProvider>
    )
}