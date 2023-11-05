import { Select, Slider, Stack, Title } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";

export function ImageResolutionsParameter({ name, slug, content, value, setValue }: Parameter) {
    return (
        <Stack>
            <Select data={content} defaultValue={content[0]} value={value} onChange={setValue} />
        </Stack>
    )
}