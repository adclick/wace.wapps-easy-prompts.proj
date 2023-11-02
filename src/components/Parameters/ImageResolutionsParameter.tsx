import { Select, Slider } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";

export function ImageResolutionsParameter({ name, slug, content }: Parameter) {
    console.log(content);
    return (
        <Select data={content} />
    )
}