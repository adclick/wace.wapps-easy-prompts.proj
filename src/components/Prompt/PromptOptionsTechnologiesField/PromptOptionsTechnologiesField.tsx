import { Select, Text } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { Technology } from "../../../model/Technology";
import { usePromptMode } from "../../../context/PromptModeContext";

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
    const { promptMode } = usePromptMode();

    const label = <Text fw={700} size="xs">{`${promptMode} technologies`}</Text>

    return (
        <Select
            label={label}
            variant="unstyled"
            checkIconPosition="right"
            size="xs"
            comboboxProps={{ withinPortal: false }}
            value={userPromptRequest.technology.id.toString()}
            data={technologyData}
            onChange={onChangeTechnology}
        />
    )
}