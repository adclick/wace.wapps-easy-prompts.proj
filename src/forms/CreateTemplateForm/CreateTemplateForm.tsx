import { Button, Group, Stack } from "@mantine/core";
import { CreateTemplateFormProvider, useCreateTemplateForm } from "../../context/CreateTemplateFormContext";
import { useCreateTemplateMutation } from "../../api/templatesApi";
import { LanguageField } from "../CreateTemplateForm/Fields/LanguageField";
import { RepositoryField } from "../CreateTemplateForm/Fields/RepositoryField";
import { TechnologyField } from "../CreateTemplateForm/Fields/TechnologyField";
import { ProviderField } from "../CreateTemplateForm/Fields/ProviderField";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { IconCheck } from "@tabler/icons-react";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";

interface CreateTemplateForm {
    handle: any
}

export function CreateTemplateForm({ handle }: CreateTemplateForm) {
    const mutation = useCreateTemplateMutation();
    const [
        user,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.setSelectedPrivateDatabaseType
    ]));

    const form = useCreateTemplateForm({
        initialValues: {
            title: '',
            description: '',
            language_id: '',
            repository_id: '',
            technology_id: '',
            provider_id: '',
            user_id: user.id,
            modifiers_ids: [],
            template_parameters: [],
            chat_messages: []
        }
    });

    const submit = () => {
        mutation.mutate(form.values);

        setSelectedPrivateDatabaseType(
            new SelectedDatabaseType(Type.TEMPLATE)
        );

        handle.close();
    }

    return (
        <CreateTemplateFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <Stack gap={"xs"}>
                    <TitleField />
                    <DescriptionField />
                    <LanguageField />
                    <RepositoryField />
                    <TechnologyField />
                    <ProviderField />

                    <Group justify="flex-end">
                        <Button type="submit" variant="transparent" color="gray" leftSection={<IconCheck size={14} />}>Save</Button>
                    </Group>
                </Stack>
            </form>
        </CreateTemplateFormProvider>
    )
}