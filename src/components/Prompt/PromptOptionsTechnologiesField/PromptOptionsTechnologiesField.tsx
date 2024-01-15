import { Select } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { Technology } from "../../../model/Technology";

export interface TechnologyDataItem {
    label: string,
    value: string
}

interface PromptOptionsTechnologiesField {
    technologyData: TechnologyDataItem[],
    technologies: Technology[],
    onChangeTechnology: any
}

export function PromptOptionsTechnologiesField({ technologyData, technologies, onChangeTechnology }: PromptOptionsTechnologiesField) {
    const { userPromptRequest } = useUserPromptRequest();

    return (
        <Select
            comboboxProps={{ withinPortal: false }}
            value={userPromptRequest.technology.id.toString()}
            data={technologyData}
            onChange={onChangeTechnology}
        />
    )
}