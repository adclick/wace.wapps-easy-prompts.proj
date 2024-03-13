import { TextInput } from "@mantine/core";
import { FieldProps } from "./FieldProps";

export function TitleField({form}: FieldProps) {
    return (
        <TextInput label='Title' {...form.getInputProps('title')} />
    )
}