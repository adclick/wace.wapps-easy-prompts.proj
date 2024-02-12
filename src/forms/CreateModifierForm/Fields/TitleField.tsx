import { TextInput } from "@mantine/core";
import { useCreateModifierFormContext } from "../../../context/CreateModifierFormContext";

export function TitleField() {
    const form = useCreateModifierFormContext();

    return (
        <TextInput label='Title' {...form.getInputProps('title')} />
    )
}