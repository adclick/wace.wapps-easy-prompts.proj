import { TextInput } from "@mantine/core";
import { useUpdateModifierFormContext } from "../../../context/UpdateModifierFormContext";

export function TitleField() {
    const form = useUpdateModifierFormContext();

    return (
        <TextInput label='Title' {...form.getInputProps('title')} />
    )
}