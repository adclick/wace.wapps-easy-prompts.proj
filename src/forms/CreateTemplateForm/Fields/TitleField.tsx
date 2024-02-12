import { TextInput } from "@mantine/core";
import { useCreateTemplateFormContext } from "../../../context/CreateTemplateFormContext";

export function TitleField() {
    const form = useCreateTemplateFormContext();

    return (
        <TextInput label='Title' {...form.getInputProps('title')} />
    )
}