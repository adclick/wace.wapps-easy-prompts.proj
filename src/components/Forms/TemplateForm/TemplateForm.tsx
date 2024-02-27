import { Button, Group, Stack } from "@mantine/core";
import { useTemplateQuery } from "../../../api/templatesApi";
import { LanguageField } from "../Fields/LanguageField";
import { RepositoryField } from "../Fields/RepositoryField";
import { TechnologyField } from "../Fields/TechnologyField";
import { ProviderField } from "../Fields/ProviderField";
import { TitleField } from "../Fields/TitleField";
import { DescriptionField } from "../Fields/DescriptionField";
import { IconCheck } from "@tabler/icons-react";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { SelectedDatabaseType, Type } from "../../../models/SelectedDatabaseType";
import { ModifiersField } from "../Fields/ModifiersField";
import { Template } from "../../../models/Template";
import { TemplateFormProvider, TemplateFormValues, useTemplateForm } from "../../../context/TemplateFormContext";

interface TemplateForm {
    template?: Template,
    mutation: any,
    handle: any
}

export function TemplateForm({ template, mutation, handle }: TemplateForm) {
    const [
        user,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.setSelectedPrivateDatabaseType
    ]));

    // Create new form
    const initialValues: TemplateFormValues = {
        title: '',
        description: '',
        language_id: '',
        repository_id: '',
        technology_id: '',
        provider_id: '',
        user_id: user.external_id,
        modifiers_ids: [],
        chat_messages: [],
        template_parameters: []
    };

    const form = useTemplateForm({
        initialValues,
        validate: {
            title: value => value !== "" ? null : 'Title is required',
            language_id: value => value !== "" ? null : 'Language is required',
            repository_id: value => value !== "" ? null : 'Repository is required',
            technology_id: value => value !== "" ? null : 'Technology is required',
        }
    });

    const enabled = template && user.username === template.user.username;
    const templateId = template ? template.id : 0;
    const { data } = useTemplateQuery(templateId, enabled);

    // Update existing form
    if (template && template.id > 0 && data) {
        const templatePrivate = data as Template;

        initialValues.title = templatePrivate.title;
        initialValues.description = templatePrivate.description;
        initialValues.language_id = templatePrivate.language.id.toString();
        initialValues.repository_id = templatePrivate.repository.id.toString();
        initialValues.technology_id = templatePrivate.technology.id.toString();
        if (templatePrivate.provider) {
            initialValues.provider_id = templatePrivate.provider.id.toString();
        }
        initialValues.user_id = user.external_id;
        initialValues.modifiers_ids = templatePrivate.templates_modifiers.map(pm => pm.modifier.id.toString());
        initialValues.chat_messages = [];
        initialValues.template_parameters = [];

        form.initialize(initialValues);
    }

    // Create form based on template
    if (template && template.id <= 0) {
        initialValues.title = template.title;
        initialValues.description = template.description;
        initialValues.language_id = template.language.id.toString();
        initialValues.repository_id = template.repository.id.toString();
        initialValues.technology_id = template.technology.id.toString();
        initialValues.provider_id = template.provider.id.toString();
        initialValues.user_id = user.external_id;
        initialValues.modifiers_ids = template.templates_modifiers.map(pm => pm.modifier.id.toString());
        initialValues.chat_messages = [];
        initialValues.template_parameters = [];

        form.initialize(initialValues);
    }

    

    const submit = () => {
        mutation.mutate(form.values);

        setSelectedPrivateDatabaseType(
            new SelectedDatabaseType(Type.TEMPLATE)
        );

        handle.close();
    }

    return (
        <TemplateFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <Stack gap={"xs"}>
                    <TitleField form={form} />
                    <DescriptionField form={form} />
                    <LanguageField form={form} />
                    <RepositoryField form={form} />
                    <TechnologyField form={form} />
                    <ProviderField form={form} />
                    <ModifiersField form={form} />

                    <Group justify="flex-end">
                        <Button type="submit" variant="transparent" color="gray" leftSection={<IconCheck size={14} />}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </TemplateFormProvider>
    )
}