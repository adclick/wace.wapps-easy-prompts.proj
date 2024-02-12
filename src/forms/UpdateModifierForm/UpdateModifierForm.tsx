import { Button, Group, Stack } from "@mantine/core";
import { UpdateModifierFormProvider, useUpdateModifierForm } from "../../context/UpdateModifierFormContext";
import { useUpdateModifierMutation } from "../../api/modifiersApi";
import { LanguageField } from "../UpdateModifierForm/Fields/LanguageField";
import { RepositoryField } from "../UpdateModifierForm/Fields/RepositoryField";
import { TechnologyField } from "../UpdateModifierForm/Fields/TechnologyField";
import { ProviderField } from "../UpdateModifierForm/Fields/ProviderField";
import { Modifier } from "../../models/Modifier";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { ContentField } from "./Fields/ContentField";
import { IconCheck } from "@tabler/icons-react";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface UpdateModifierForm {
    modifier: Modifier,
    handle: any
}

export function UpdateModifierForm({ modifier, handle }: UpdateModifierForm) {
    const mutation = useUpdateModifierMutation(modifier.id);
    const [user] = useStore(useShallow(state => [state.user]));

    const form = useUpdateModifierForm({
        initialValues: {
            title: modifier.title,
            description: modifier.description,
            content: modifier.content,
            language_id: modifier.language.id.toString(),
            repository_id: modifier.repository.id.toString(),
            technology_id: modifier.technology.id.toString(),
            provider_id: modifier.provider ? modifier.provider.id.toString() : undefined,
            user_id: user.id
        }
    });

    const submit = () => {
        mutation.mutate(form.values);

        handle.close();
    }

    return (
        <UpdateModifierFormProvider form={form}>
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
        </UpdateModifierFormProvider>
    )
}