import { Slider, Stack, Title } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";

export function CharactersLimitParameter({ name, slug, content, value, setValue }: Parameter) {
    const marks = [];
    const parts = parseInt(content) / 4;

    for (let i = 1; i <= 4; i++) {
        const value = parts * i
        marks.push({ value: value, label: value });
    }
    return (
        <Stack>
            <Slider
                defaultValue={parseInt(content)}
                min={parts}
                max={parseInt(content)}
                marks={marks}
                mx={"xs"}
                my={"md"}
                value={value}
                onChange={setValue}
            />
        </Stack>
    )
}