import { Textarea } from "@mantine/core";
import { useUpdateModifierFormContext } from "../../../context/UpdateModifierFormContext";

export function ContentField() {
    const form = useUpdateModifierFormContext();

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