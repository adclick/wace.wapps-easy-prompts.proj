import { Button, Group, Stack } from "@mantine/core";
import { usePromptQuery } from "../../../api/promptsApi";
import { LanguageField } from "../Fields/LanguageField";
import { RepositoryField } from "../Fields/RepositoryField";
import { TechnologyField } from "../Fields/TechnologyField";
import { ProviderField } from "../Fields/ProviderField";
import { TitleField } from "../Fields/TitleField";
import { DescriptionField } from "../Fields/DescriptionField";
import { ContentField } from "../Fields/ContentField";
import { IconCheck } from "@tabler/icons-react";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { SelectedDatabaseType, Type } from "../../../models/SelectedDatabaseType";
import { TemplatesField } from "../Fields/TemplatesField";
import { ModifiersField } from "../Fields/ModifiersField";
import { Prompt } from "../../../models/Prompt";
import { PromptFormProvider, PromptFormValues, usePromptForm } from "../../../context/PromptFormContext";

interface PromptForm {
    prompt?: Prompt,
    mutation: any,
    handle: any
}

export function PromptForm({ prompt, mutation, handle }: PromptForm) {
    const [
        user,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.setSelectedPrivateDatabaseType
    ]));

    // Create new form
    const initialValues: PromptFormValues = {
        title: '',
        description: '',
        content: '',
        response: '',
        language_id: '',
        repository_id: '',
        technology_id: '',
        provider_id: '',
        user_id: user.id,
        templates_ids: [],
        modifiers_ids: [],
        prompt_chat_messages: [],
        prompt_parameters: []
    };

    const form = usePromptForm({
        initialValues
    });

    const enabled = prompt && user.username === prompt.user.username;
    const promptId = prompt ? prompt.id : 0;
    const { data } = usePromptQuery(promptId, enabled);

    // Update existing form
    if (prompt && prompt.id > 0 && data) {
        const promptPrivate = data as Prompt;

        initialValues.title = promptPrivate.title;
        initialValues.description = promptPrivate.description;
        initialValues.content = promptPrivate.content;
        initialValues.response = promptPrivate.response;
        initialValues.language_id = promptPrivate.language.id.toString();
        initialValues.repository_id = promptPrivate.repository.id.toString();
        initialValues.technology_id = promptPrivate.technology.id.toString();
        if (promptPrivate.provider) {
            initialValues.provider_id = promptPrivate.provider.id.toString();
        }
        initialValues.user_id = user.id;
        initialValues.templates_ids = promptPrivate.prompts_templates.map(pt => pt.template.id.toString());
        initialValues.modifiers_ids = promptPrivate.prompts_modifiers.map(pm => pm.modifier.id.toString());
        initialValues.prompt_chat_messages = [];
        initialValues.prompt_parameters = [];

        form.initialize(initialValues);
    }

    // Create form based on prompt
    if (prompt && prompt.id <= 0) {
        initialValues.title = prompt.title;
        initialValues.description = prompt.description;
        initialValues.content = prompt.content;
        initialValues.response = prompt.response;
        initialValues.language_id = prompt.language.id.toString();
        initialValues.repository_id = prompt.repository.id.toString();
        initialValues.technology_id = prompt.technology.id.toString();
        initialValues.provider_id = prompt.provider.id.toString();
        initialValues.user_id = user.id;
        initialValues.templates_ids = prompt.prompts_templates.map(pt => pt.template.id.toString());
        initialValues.modifiers_ids = prompt.prompts_modifiers.map(pm => pm.modifier.id.toString());
        initialValues.prompt_chat_messages = prompt.prompts_chat_messages;
        initialValues.prompt_parameters = [];

        form.initialize(initialValues);
    }

    

    const submit = () => {
        mutation.mutate(form.values);

        setSelectedPrivateDatabaseType(
            new SelectedDatabaseType(Type.PROMPT)
        );

        handle.close();
    }

    return (
        <PromptFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <Stack gap={"xs"}>
                    <TitleField form={form} />
                    <DescriptionField form={form} />
                    <ContentField form={form} />
                    <LanguageField form={form} />
                    <RepositoryField form={form} />
                    <TechnologyField form={form} />
                    <ProviderField form={form} />
                    <TemplatesField form={form} />
                    <ModifiersField form={form} />

                    <Group justify="flex-end">
                        <Button type="submit" variant="transparent" color="gray" leftSection={<IconCheck size={14} />}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </PromptFormProvider>
    )
}