import { Button, Group, Stack } from "@mantine/core";
import { UpdatePromptFormProvider, useUpdatePromptForm } from "../../context/UpdatePromptFormContext";
import { usePromptQuery, useUpdatePromptMutation } from "../../api/promptsApi";
import { useUser } from "../../context/UserContext";
import { LanguageField } from "./Fields/LanguageField";
import { RepositoryField } from "./Fields/RepositoryField";
import { TechnologyField } from "./Fields/TechnologyField";
import { ProviderField } from "./Fields/ProviderField";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { ContentField } from "./Fields/ContentField";
import { Prompt } from "../../models/Prompt";
import { IconCheck } from "@tabler/icons-react";

interface UpdatePromptForm {
    prompt: Prompt;
    handle: any
}

export function UpdatePromptForm({ prompt, handle }: UpdatePromptForm) {
    const UpdateMutation = useUpdatePromptMutation(prompt.id);
    const { user } = useUser();

    const enabled = user.username === prompt.user.username;

    const { data: promptPrivate } = usePromptQuery(prompt.id, enabled);
    
    const form = useUpdatePromptForm({
        initialValues: {
            title: prompt.title,
            description: prompt.description,
            content: '',
            language_id: prompt.language.id.toString(),
            repository_id: prompt.repository.id.toString(),
            technology_id: prompt.technology.id.toString(),
            provider_id: prompt.provider ? prompt.provider.id.toString() : undefined,
            user_id: user.id
        }
    });

    if (promptPrivate && form.getInputProps('content').value === "") {
        form.setValues({
            content: promptPrivate.content
        })
    }

    const submit = () => {
        UpdateMutation.mutate(form.values);

        handle.close();
    }

    return (
        <UpdatePromptFormProvider form={form}>
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
        </UpdatePromptFormProvider>
    )

}