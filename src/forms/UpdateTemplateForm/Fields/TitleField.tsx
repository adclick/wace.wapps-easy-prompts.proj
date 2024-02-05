import { TextInput } from "@mantine/core";
import { useUpdateTemplateFormContext } from "../../../context/UpdateTemplateFormContext";

export function TitleField() {
    const form = useUpdateTemplateFormContext();

    return (
        <TextInput label='Title' {...form.getInputProps('title')} />
    )
}