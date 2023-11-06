import { Select, Slider, Stack, Title } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";

export function ImageResolutionsParameter({ name, slug, content, value, setValue }: Parameter) {
    return (
        <Stack>
            <Select variant="unstyled" data={content} defaultValue={content[0]} value={value} onChange={setValue} />
        </Stack>
    )
}