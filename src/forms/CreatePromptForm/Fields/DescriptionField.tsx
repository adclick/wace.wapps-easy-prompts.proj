import { Textarea } from "@mantine/core";
import { useCreatePromptFormContext } from "../../../context/CreatePromptFormContext";

export function DescriptionField() {
    const form = useCreatePromptFormContext();

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