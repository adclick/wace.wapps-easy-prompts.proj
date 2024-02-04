import { Button, Group, Select, TextInput, Textarea } from "@mantine/core";
import { ModifierFormProvider, useModifierForm } from "../context/ModifierFormContext";
import { useCreateModifierMutation } from "../api/modifiersApi";
import { useUser } from "../context/UserContext";
import { LanguageField } from "./Fields/LanguageField";
import { Modifier } from "../model/Modifier";
import { RepositoryField } from "./Fields/RepositoryField";
import { TechnologyField } from "./Fields/TechnologyField";
import { ProviderField } from "./Fields/ProviderField";

interface ModifierForm {
    modifier: Modifier | undefined
}

export function ModifierForm({ modifier }: ModifierForm) {
    const createMutation = useCreateModifierMutation();
    const { user } = useUser();

    const form = useModifierForm({
        initialValues: {
            title: modifier !== undefined ? modifier.title : '',
            description: '',
            content: '',
            language_id: 0,
            repository_id: 0,
            technology_id: 0,
            provider_id: 0,
            user_id: user.id
        }
    });

    const submit = () => {
        createMutation.mutate(form.values);
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