import { Button, Group, Stack } from "@mantine/core";
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
import { PromptFormProvider, PromptFormValues, usePromptForm } from "../../../context/PromptFormContext";
import { Thread } from "../../../models/Thread";

interface ThreadForm {
    thread: Thread,
    mutation: any,
    handle: any
}

export function ThreadForm({ thread, mutation, handle }: ThreadForm) {
    const [
        user,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.setSelectedPrivateDatabaseType
    ]));

    // Create new form
    const initialValues: PromptFormValues = {
        title: thread.title,
        description: '',
        content: thread.content,
        language_id: '',
        repository_id: '',
        technology_id: thread.technology.uuid,
        provider_id: thread.provider.uuid,
        user_id: user.external_id,
        templates_ids: thread.threads_templates.map(t => t.template.uuid),
        modifiers_ids: thread.threads_modifiers.map(m => m.modifier.uuid),
        prompt_chat_messages: thread.threads_chat_messages,
        prompt_parameters: thread.threads_parameters
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
                        <Button
                            type="submit"
                            variant="transparent"
                            color="gray"
                            leftSection={<IconCheck size={14} />}
                        >
                            Save
                        </Button>
                    </Group>
                </Stack>
            </form>
        </PromptFormProvider>
    )
}