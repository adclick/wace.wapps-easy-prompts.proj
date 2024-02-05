import { Textarea } from "@mantine/core";
import { useUpdatePromptFormContext } from "../../../context/UpdatePromptFormContext";

export function ContentField() {
    const form = useUpdatePromptFormContext();

    return (
        <Textarea
            autosize
            minRows={3}
            maxRows={6}
            label='Content'
            {...form.getInputProps('content')}
        />
    )
}