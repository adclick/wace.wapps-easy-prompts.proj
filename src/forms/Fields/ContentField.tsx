import { Textarea } from "@mantine/core";
import { FieldProps } from "./FieldProps";

export function ContentField({form}: FieldProps) {
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