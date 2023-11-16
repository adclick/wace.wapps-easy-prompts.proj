import { Accordion, Group, Slider, Stack, Text, Title, rem } from "@mantine/core";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { useEffect, useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { Parameter } from "../../model/Parameter";

interface NumImagesOption {
    parameter: Parameter,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function NumImagesOption({
    parameter,
    userPromptOptions,
    setUserPromptOptions
}: NumImagesOption) {
    const [value, setValue] = useState(1);

    const defaultNumImages = 1;

    useEffect(() => {
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setParameter(parameter.slug, defaultNumImages);
        setUserPromptOptions(newUserPromptOptions);
    }, [])

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
        <Accordion.Item key={parameter.slug} value={parameter.slug}>
            <Accordion.Control py={"xs"} icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>{parameter.name}</Title>
                    <Text size="xs">{value}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Slider
                    defaultValue={1}
                    min={defaultNumImages}
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