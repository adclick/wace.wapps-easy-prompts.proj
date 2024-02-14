import { Button, Group, Stack } from "@mantine/core";
import { CreateModifierFormProvider, useCreateModifierForm } from "../../context/CreateModifierFormContext";
import { useCreateModifierMutation } from "../../api/modifiersApi";
import { LanguageField } from "../CreateModifierForm/Fields/LanguageField";
import { RepositoryField } from "../CreateModifierForm/Fields/RepositoryField";
import { TechnologyField } from "../CreateModifierForm/Fields/TechnologyField";
import { ProviderField } from "../CreateModifierForm/Fields/ProviderField";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { ContentField } from "./Fields/ContentField";
import { IconCheck } from "@tabler/icons-react";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";

interface CreateModifierForm {
    handle: any
}

export function CreateModifierForm({ handle }: CreateModifierForm) {
    const mutation = useCreateModifierMutation();
    const [
        user,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.setSelectedPrivateDatabaseType
    ]));

    const form = useCreateModifierForm({
        initialValues: {
            title: '',
            description: '',
            content: '',
            language_id: '',
            repository_id: '',
            technology_id: '',
            provider_id: '',
            user_id: user.id
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
        <CreateModifierFormProvider form={form}>
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
        </CreateModifierFormProvider>
    )
}