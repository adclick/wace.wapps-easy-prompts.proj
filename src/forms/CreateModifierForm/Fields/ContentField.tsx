import { Textarea } from "@mantine/core";
import { useCreateModifierFormContext } from "../../../context/CreateModifierFormContext";

export function ContentField() {
    const form = useCreateModifierFormContext();

    return (
        <Textarea label='Content' {...form.getInputProps('content')} />
    )
}