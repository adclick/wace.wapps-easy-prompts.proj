import { Textarea } from "@mantine/core";
import { useUpdateTemplateFormContext } from "../../../context/UpdateTemplateFormContext";

export function DescriptionField() {
    const form = useUpdateTemplateFormContext();

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