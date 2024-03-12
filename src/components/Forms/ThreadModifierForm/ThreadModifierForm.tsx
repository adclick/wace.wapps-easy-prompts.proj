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
import { PromptFormProvider } from "../../../context/PromptFormContext";
import { Thread } from "../../../models/Thread";
import { ModifierFormProvider, ModifierFormValues, useModifierForm } from "../../../context/ModifierFormContext";

interface ThreadModifierForm {
    thread: Thread,
    mutation: any,
    handle: any
}

export function ThreadModifierForm({ thread, mutation, handle }: ThreadModifierForm) {
    const [
        user,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.setSelectedPrivateDatabaseType
    ]));

    // Create new form
    const initialValues: ModifierFormValues = {
        title: thread.title,
        description: '',
        content: thread.content,
        language_id: '',
        repository_id: '',
        technology_id: thread.technology.uuid,
        provider_id: thread.provider.uuid,
        user_id: user.external_id,
    };

    const form = useModifierForm({
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
            new SelectedDatabaseType(Type.MODIFIER)
        );

        handle.close();
    }

    return (
        <ModifierFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <Stack gap={"xs"}>
                    <TitleField form={form} />
                    <DescriptionField form={form} />
                    <ContentField form={form} />
                    <LanguageField form={form} />
                    <RepositoryField form={form} />
                    <TechnologyField form={form} />
                    <ProviderField form={form} />

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
        </ModifierFormProvider>
    )
}