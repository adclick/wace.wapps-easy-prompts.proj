import { Accordion, Group, Slider, Stack, Text, Title, rem } from "@mantine/core";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { Parameter } from "../../model/Parameter";

interface MaxImageOption {
    parameter: Parameter,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function MaxImageOption({
    parameter,
    userPromptOptions,
    setUserPromptOptions
}: MaxImageOption) {
    const [value, setValue] = useState(1);

    const handleOnChange = (value: number) => {
        setValue(value);

        // update userPromptOptions
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setParameter(parameter.slug, value);
        setUserPromptOptions(newUserPromptOptions);
    }

    const marks = [];
    for (let i = 1; i <= parseInt(parameter.content); i++) {
        marks.push({ value: i, label: i });
    }
    return (
        <Accordion.Item key={"max-images"} value="max-images">
            <Accordion.Control py={"xs"} icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>Max Images</Title>
                    <Text size="xs">{value}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Slider
                    defaultValue={1}
                    min={1}
                    max={parseInt(parameter.content)}
                    marks={marks}
                    mx={"xs"}
                    my={"md"}
                    value={value}
                    onChange={handleOnChange}
                />
            </Accordion.Panel>
        </Accordion.Item>

    )
}