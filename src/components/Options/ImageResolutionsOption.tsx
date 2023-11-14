import { Accordion, Group, Select, Slider, Stack, Text, Title, rem } from "@mantine/core";
import { Parameter } from "../../model/PromptOptions";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

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
                    data={parameter.content}
                    defaultValue={parameter.content[0]}
                    value={value}
                    onChange={handleOnChange}
                    my={"xs"}
                />
            </Accordion.Panel>
        </Accordion.Item>

    )
}