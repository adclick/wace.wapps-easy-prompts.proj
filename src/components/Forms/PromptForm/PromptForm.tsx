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
import { Thread } from "../../../models/Thread";

interface PromptForm {
    prompt?: Prompt|Thread,
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
        language_id: '',
        repository_id: '',
        technology_id: '',
        provider_id: '',
        user_id: user.external_id,
        templates_ids: [],
        modifiers_ids: [],
        prompt_chat_messages: [],
        prompt_parameters: []
    };

    const form = usePromptForm({
        initialValues,
        validate: {
            title: value => value !== "" ? null : 'Title is required',
            content: value => value !== "" ? null : 'Content is required',
            language_id: value => value !== "" ? null : 'Language is required',
            repository_id: value => value !== "" ? null : 'Repository is required',
            technology_id: value => value !== "" ? null : 'Technology is required',
        }
    });

    console.log(prompt);
    const enabled = prompt && user.username === prompt.user.username;
    const promptUUID = prompt ? prompt.uuid : '';
    const { data } = usePromptQuery(user, promptUUID, enabled);

    // Update existing form
    if (prompt && prompt.uuid !== "" && data) {
        const promptPrivate = data as Prompt;

        initialValues.title = promptPrivate.title;
        initialValues.description = promptPrivate.description;
        initialValues.content = promptPrivate.content;
        initialValues.language_id = promptPrivate.language.uuid;
        initialValues.repository_id = promptPrivate.repository.uuid;
        initialValues.technology_id = promptPrivate.technology.uuid;
        if (promptPrivate.provider) {
            initialValues.provider_id = promptPrivate.provider.uuid;
        }
        initialValues.user_id = user.external_id;
        initialValues.templates_ids = promptPrivate.prompts_templates.map(pt => pt.template.uuid);
        initialValues.modifiers_ids = promptPrivate.prompts_modifiers.map(pm => pm.modifier.uuid);
        initialValues.prompt_chat_messages = [];
        initialValues.prompt_parameters = promptPrivate.prompts_parameters;

        form.initialize(initialValues);
    }

    // Create form based on thread
    if (prompt && "response" in prompt) {
        const thread = prompt as Thread;

        // const parameters = ParametersList.getActiveParameters(thread.parametersList);
        // const promptParameters = parameters.map(p => {
        //     return {
        //         parameter_id: p.id,
        //         value: p.value
        //     }
        // })

        initialValues.title = thread.title;
        initialValues.content = thread.content;
        initialValues.technology_id = thread.technology.uuid;
        initialValues.provider_id = thread.provider.uuid;
        initialValues.user_id = user.external_id;
        initialValues.templates_ids = thread.threads_templates.map(pt => pt.template.uuid);
        initialValues.modifiers_ids = thread.threads_modifiers.map(pm => pm.modifier.uuid);
        initialValues.prompt_chat_messages = thread.threads_chat_messages;
        // initialValues.prompt_parameters = promptParameters

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