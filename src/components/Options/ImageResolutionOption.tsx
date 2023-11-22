import { Accordion, Group, Select, Stack, Text, Title, rem } from "@mantine/core";
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

    if (parameter.content === '') {
        return <></>;
    }

    const resolutions: string[] = parameter.content;

    const data = resolutions.map((i: string) => {
        return {
            label: i,
            value: i
        }
    });

    return (
        <Stack gap={"xs"}>
            <Group>
                <Text size="md">{parameter.name}</Text>
            </Group>
            <Select
                variant="unstyled"
                data={data}
                defaultValue={parameter.content[0]}
                value={value}
                onChange={handleOnChange}
                comboboxProps={{ withinPortal: false }}
            />
        </Stack>
    )
}