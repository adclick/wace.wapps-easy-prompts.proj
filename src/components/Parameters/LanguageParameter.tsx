import { Select, Slider, Stack, Title } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";

export function LanguageParameter({ name, slug, content, value, setValue }: Parameter) {
    return (
        <Select
            variant="unstyled"
            data={content}
            defaultValue={content[0]}
            value={value}
            onChange={setValue}
            my={"xs"}
        />
    )
}