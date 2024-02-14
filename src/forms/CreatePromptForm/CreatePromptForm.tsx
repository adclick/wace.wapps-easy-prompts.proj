import { Button, Group, Stack } from "@mantine/core";
import { CreatePromptFormProvider, useCreatePromptForm } from "../../context/CreatePromptFormContext";
import { useCreatePromptMutation } from "../../api/promptsApi";
import { LanguageField } from "../CreatePromptForm/Fields/LanguageField";
import { RepositoryField } from "../CreatePromptForm/Fields/RepositoryField";
import { TechnologyField } from "../CreatePromptForm/Fields/TechnologyField";
import { ProviderField } from "../CreatePromptForm/Fields/ProviderField";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { ContentField } from "./Fields/ContentField";
import { IconCheck } from "@tabler/icons-react";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";

interface CreatePromptForm {
    handle: any
}

export function CreatePromptForm({ handle }: CreatePromptForm) {
    const mutation = useCreatePromptMutation();
    const [
        user,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.setSelectedPrivateDatabaseType
    ]));

    const form = useCreatePromptForm({
        initialValues: {
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
            chat_messages: [],
            prompt_parameters: []
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
        <CreatePromptFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <Stack gap={"xs"}>
                    <TitleField />
                    <DescriptionField />
                    <ContentField />
                    <LanguageField />
                    <RepositoryField />
                    <TechnologyField />
                    <ProviderField />

                    <Group justify="flex-end">
                        <Button type="submit" variant="transparent" color="gray" leftSection={<IconCheck size={14} />}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </CreatePromptFormProvider>
    )
}