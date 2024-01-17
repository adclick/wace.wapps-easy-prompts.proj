import { Select } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { Technology } from "../../../model/Technology";

export interface TechnologyDataItem {
    label: string,
    value: string
}

interface PromptOptionsTechnologiesField {
    technologyData: TechnologyDataItem[],
    onChangeTechnology: any
}

export function PromptOptionsTechnologiesField({ technologyData, onChangeTechnology }: PromptOptionsTechnologiesField) {
    const { userPromptRequest } = useUserPromptRequest();

    return (
        <Select
            checkIconPosition="right"
            comboboxProps={{ withinPortal: false }}
            value={userPromptRequest.technology.id.toString()}
            data={technologyData}
            onChange={onChangeTechnology}
        />
    )
}