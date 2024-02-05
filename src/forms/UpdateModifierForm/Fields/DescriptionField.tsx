import { TextInput, Textarea } from "@mantine/core";
import { useUpdateModifierFormContext } from "../../../context/UpdateModifierFormContext";

export function DescriptionField() {
    const form = useUpdateModifierFormContext();

    return (
        <Textarea label='Description' {...form.getInputProps('description')} />
    )
}