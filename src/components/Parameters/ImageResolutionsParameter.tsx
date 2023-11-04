import { Select, Slider, Stack, Title } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";

export function ImageResolutionsParameter({ name, slug, content }: Parameter) {
    return (
        <Stack>
            <Select data={content} defaultValue={content[0]} />
        </Stack>
    )
}