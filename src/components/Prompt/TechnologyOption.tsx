import { Select } from "@mantine/core";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";

interface TechnologyOption {
    promptOptions: PromptOptions,
    currentTechnology: Technology,
    technologies: Technology[],
    handleOnChangeTechnology: any
}

export function TechnologyOption({
    currentTechnology,
    technologies,
    handleOnChangeTechnology
}: TechnologyOption) {
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