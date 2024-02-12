import { Textarea } from "@mantine/core";
import { useCreateModifierFormContext } from "../../../context/CreateModifierFormContext";

export function DescriptionField() {
    const form = useCreateModifierFormContext();

    return (
        <Textarea
            autosize
            minRows={3}
            maxRows={6}
            label='Description'
            {...form.getInputProps('description')}
        />
    )
}