import { Button, Group, TextInput, Textarea } from "@mantine/core";
import { ModifierFormProvider, useModifierForm } from "../context/ModifierFormContext";
import { useUpdateModifierMutation } from "../api/modifiersApi";
import { useUser } from "../context/UserContext";
import { LanguageField } from "./Fields/LanguageField";
import { RepositoryField } from "./Fields/RepositoryField";
import { TechnologyField } from "./Fields/TechnologyField";
import { ProviderField } from "./Fields/ProviderField";
import { Modifier } from "../model/Modifier";

interface UpdateModifierForm {
    modifier: Modifier
}

export function UpdateModifierForm({ modifier }: UpdateModifierForm) {
    const mutation = useUpdateModifierMutation(modifier.id);
    const { user } = useUser();

    const form = useModifierForm({
        initialValues: {
            title: modifier.title,
            description: modifier.description,
            content: modifier.content,
            language_id: modifier.language.id.toString(),
            repository_id: modifier.repository.id.toString(),
            technology_id: modifier.technology.id.toString(),
            provider_id: modifier.provider.id.toString(),
            user_id: user.id
        }
    });

    const submit = () => {
        mutation.mutate(form.values);
    }

    return (
        <ModifierFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <TextInput label='Title' {...form.getInputProps('title')} />
                <Textarea label='Description' {...form.getInputProps('description')} />
                <Textarea label='Content' {...form.getInputProps('content')} />

                <LanguageField />
                <RepositoryField />
                <TechnologyField />
                <ProviderField />

                <Group>
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </ModifierFormProvider>
    )
}