import { Accordion, Group, Slider, Stack, Text, Title, rem } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useState } from "react";
import { UserPromptOptions } from "@/model/UserPromptOptions";

const PARTS = 4;

interface CharactersLimitParameter {
    parameter: Parameter,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function CharactersLimitParameter({
    parameter,
    userPromptOptions,
    setUserPromptOptions
}: CharactersLimitParameter) {
    const [value, setValue] = useState(1000);
    const { name, content } = parameter;

    const handleOnChange = (value: number) => {
        setValue(value);

        // update userPromptOptions
    }

    // Construct slider marks
    const marks = [];
    const portion = Math.floor(parseInt(content) / PARTS);
    for (let i = 1; i <= PARTS; i++) {
        const v = portion * i
        marks.push({ value: v, label: v });
    }

    return (
        <Accordion.Item key={"characters-limit"} value="characters-limit">
            <Accordion.Control icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>{name}</Title>
                    <Text size="xs">{value}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Slider
                    defaultValue={parseInt(content)}
                    min={portion}
                    max={parseInt(content)}
                    marks={marks}
                    mx={"xs"}
                    my={"md"}
                    value={value}
                    onChange={value => handleOnChange(value)}
                />
            </Accordion.Panel>
        </Accordion.Item>
    )
}