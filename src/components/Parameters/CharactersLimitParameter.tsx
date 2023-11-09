import { Accordion, Group, Slider, Stack, Text, Title, rem } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

interface CharactersLimitParameter {
    args: Parameter
}

export function CharactersLimitParameter({ args }: CharactersLimitParameter) {
    const { name, slug, content, value, setValue } = args;

    const marks = [];
    const parts = parseInt(content) / 4;

    for (let i = 1; i <= 4; i++) {
        const v = parts * i
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
                    min={parts}
                    max={parseInt(content)}
                    marks={marks}
                    mx={"xs"}
                    my={"md"}
                    value={value}
                    onChange={setValue}
                />
            </Accordion.Panel>
        </Accordion.Item>
    )
}