import { TextInput } from "@mantine/core";
import { useUpdatePromptFormContext } from "../../../context/UpdatePromptFormContext";

export function TitleField() {
    const form = useUpdatePromptFormContext();

    return (
        <TextInput label='Title' {...form.getInputProps('title')} />
    )
}