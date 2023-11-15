import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { Parameter } from "../../model/Parameter";

interface ImageResolutionsOption {
    parameter: Parameter,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function ImageResolutionsOption({
    parameter,
    userPromptOptions,
    setUserPromptOptions
}: ImageResolutionsOption) {
    const [value, setValue] = useState(parameter.content[0]);

    const handleOnChange = (value: string) => {
        setValue(value);

         // update userPromptOptions
    }

    const resolutions: string[] = parameter.content;

    const data = resolutions.map((i: string) => {
        return {
            label: i,
            value: i
        }
    });

    return (
        <Accordion.Item key={"image-resolutions"} value="image-resolutions">
            <Accordion.Control icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
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