import { Textarea } from "@mantine/core";
import { useUpdatePromptFormContext } from "../../../context/UpdatePromptFormContext";

export function DescriptionField() {
    const form = useUpdatePromptFormContext();

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