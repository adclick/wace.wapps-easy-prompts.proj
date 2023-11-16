import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { useEffect, useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { Parameter } from "../../model/Parameter";

interface ImageResolutionOption {
    parameter: Parameter,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function ImageResolutionOption({
    parameter,
    userPromptOptions,
    setUserPromptOptions
}: ImageResolutionOption) {
    const [value, setValue] = useState(parameter.content[0]);

    useEffect(() => {
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setParameter(parameter.slug, parameter.content[0]);
        setUserPromptOptions(newUserPromptOptions);
    }, [])

    const handleOnChange = (value: string) => {
        setValue(value);

         // update userPromptOptions
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setParameter(parameter.slug, value);
        setUserPromptOptions(newUserPromptOptions);
    }

    const resolutions: string[] = parameter.content;

    const data = resolutions.map((i: string) => {
        return {
            label: i,
            value: i
        }
    });

    return (
        <Accordion.Item key={parameter.slug} value={parameter.slug}>
            <Accordion.Control py={"xs"} icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>Resolution</Title>
                    <Text size="xs">{value}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Select
                    variant="unstyled"
                    data={data}
                    defaultValue={parameter.content[0]}
                    value={value}
                    onChange={handleOnChange}
                    my={"xs"}
                />
            </Accordion.Panel>
        </Accordion.Item>

    )
}