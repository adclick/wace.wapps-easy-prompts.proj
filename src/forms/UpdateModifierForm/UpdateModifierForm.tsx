import { Button, Group } from "@mantine/core";
import { UpdateModifierFormProvider, useUpdateModifierForm } from "../../context/UpdateModifierFormContext";
import { useUpdateModifierMutation } from "../../api/modifiersApi";
import { useUser } from "../../context/UserContext";
import { LanguageField } from "../CreateModifierForm/Fields/LanguageField";
import { RepositoryField } from "../CreateModifierForm/Fields/RepositoryField";
import { TechnologyField } from "../CreateModifierForm/Fields/TechnologyField";
import { ProviderField } from "../CreateModifierForm/Fields/ProviderField";
import { Modifier } from "../../models/Modifier";
import { TitleField } from "./Fields/TitleField";
import { DescriptionField } from "./Fields/DescriptionField";
import { ContentField } from "./Fields/ContentField";

interface UpdateModifierForm {
    modifier: Modifier
}

export function UpdateModifierForm({ modifier }: UpdateModifierForm) {
    const mutation = useUpdateModifierMutation(modifier.id);
    const { user } = useUser();

    const form = useUpdateModifierForm({
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
        <UpdateModifierFormProvider form={form}>
            <form onSubmit={form.onSubmit(submit)}>
                <TitleField />
                <DescriptionField />
                <ContentField />
                <LanguageField />
                <RepositoryField />
                <TechnologyField />
                <ProviderField />

                <Group>
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </UpdateModifierFormProvider>
    )
}