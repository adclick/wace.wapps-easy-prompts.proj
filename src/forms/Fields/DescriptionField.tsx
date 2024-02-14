import { Textarea } from "@mantine/core";
import { FieldProps } from "./FieldProps";

export function DescriptionField({form}: FieldProps) {
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