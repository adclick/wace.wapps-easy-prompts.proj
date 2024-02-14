import { TextInput } from "@mantine/core";
import { useCreatePromptFormContext } from "../../../context/CreatePromptFormContext";

export function TitleField() {
    const form = useCreatePromptFormContext();

    return (
        <TextInput label='Title' {...form.getInputProps('title')} />
    )
}