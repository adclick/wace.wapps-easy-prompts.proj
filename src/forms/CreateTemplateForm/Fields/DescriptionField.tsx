import { Textarea } from "@mantine/core";
import { useCreateTemplateFormContext } from "../../../context/CreateTemplateFormContext";

export function DescriptionField() {
    const form = useCreateTemplateFormContext();

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