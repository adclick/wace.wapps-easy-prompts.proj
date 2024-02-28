import { Button, Group, Stack } from "@mantine/core";
import { useModifierQuery } from "../../../api/modifiersApi";
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
import { Modifier } from "../../../models/Modifier";
import { ModifierFormProvider, ModifierFormValues, useModifierForm } from "../../../context/ModifierFormContext";

interface ModifierForm {
    modifier?: Modifier,
    mutation: any,
    handle: any
}

export function ModifierForm({ modifier, mutation, handle }: ModifierForm) {
    const [
        user,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.setSelectedPrivateDatabaseType
    ]));

    // Create new form
    const initialValues: ModifierFormValues = {
        title: '',
        description: '',
        content: '',
        language_id: '',
        repository_id: '',
        technology_id: '',
        provider_id: '',
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

    const enabled = modifier && user.username === modifier.user.username;
    const modifierId = modifier ? modifier.id : 0;
    const { data } = useModifierQuery(modifierId, enabled);

    // Update existing form
    if (modifier && modifier.id > 0 && data) {
        const modifierPrivate = data as Modifier;

        initialValues.title = modifierPrivate.title;
        initialValues.description = modifierPrivate.description;
        initialValues.content = modifierPrivate.content;
        initialValues.language_id = modifierPrivate.language.uuid;
        initialValues.repository_id = modifierPrivate.repository.uuid;
        initialValues.technology_id = modifierPrivate.technology.uuid;
        if (modifierPrivate.provider) {
            initialValues.provider_id = modifierPrivate.provider.uuid;
        }
        initialValues.user_id = user.external_id;

        form.initialize(initialValues);
    }

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
                        <Button type="submit" variant="transparent" color="gray" leftSection={<IconCheck size={14} />}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </ModifierFormProvider>
    )
}