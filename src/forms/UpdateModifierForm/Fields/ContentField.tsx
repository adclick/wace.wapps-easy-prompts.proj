import { Textarea } from "@mantine/core";
import { useUpdateModifierFormContext } from "../../../context/UpdateModifierFormContext";

export function ContentField() {
    const form = useUpdateModifierFormContext();

    return (
        <Textarea label='Content' {...form.getInputProps('content')} />
    )
}