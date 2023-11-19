import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { IconBulb } from "@tabler/icons-react";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";
import { useTranslation } from 'react-i18next';


interface TechnologyOption {
    promptOptions: PromptOptions,
    currentTechnology: Technology,
    technologies: Technology[],
    handleOnChangeTechnology: any
}

export function TechnologyOption({
    promptOptions,
    currentTechnology,
    technologies,
    handleOnChangeTechnology
}: TechnologyOption) {
    const { t } = useTranslation();

    const technologiesData = technologies.map(t => {
        return {
            label: t.name,
            value: t.slug
        }
    });

    return (
        <Select
            placeholder="Technology"
            data={technologiesData}
            value={currentTechnology.slug}
            allowDeselect={false}
            checkIconPosition='right'
            onChange={handleOnChangeTechnology}
            variant="unstyled"
            maxDropdownHeight={"500"}
            comboboxProps={{ withinPortal: false }}
            my={"xs"}
            fw={700}
        />
    )
}