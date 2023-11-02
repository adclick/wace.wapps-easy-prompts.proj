import { Slider } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";

export function MaxImagesParameters({ name, slug, content }: Parameter) {
    const marks = [];
    for (let i = 1; i <= parseInt(content); i++) {
        marks.push({ value: i, label: i });
    }
    return (
        <Slider
            mb={"lg"}
            defaultValue={1}
            min={1}
            max={parseInt(content)}
            marks={marks}
        />
    )
}