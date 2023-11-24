import { Select } from "@mantine/core";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";

interface PromptOptionTechnology {
    promptOptions: PromptOptions,
    currentTechnology: Technology,
    technologies: Technology[],
    handleOnChangeTechnology: any
}

export function PromptOptionTechnology({
    currentTechnology,
    technologies,
    handleOnChangeTechnology
}: PromptOptionTechnology) {
    const data = technologies.map(t => {
        return {
            label: t.name,
            value: t.slug
        }
    });

    return (
        <Select
            placeholder="Technology"
            data={data}
            value={currentTechnology.slug}
            allowDeselect={false}
            checkIconPosition='right'
            onChange={handleOnChangeTechnology}
            variant="unstyled"
            maxDropdownHeight={"500"}
            comboboxProps={{ withinPortal: false }}
            size="md"
        />
    )
}