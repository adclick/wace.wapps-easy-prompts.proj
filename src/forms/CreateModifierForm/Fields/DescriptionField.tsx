import { TextInput, Textarea } from "@mantine/core";
import { useCreateModifierFormContext } from "../../../context/CreateModifierFormContext";

export function DescriptionField() {
    const form = useCreateModifierFormContext();

    return (
        <Textarea label='Description' {...form.getInputProps('description')} />
    )
}