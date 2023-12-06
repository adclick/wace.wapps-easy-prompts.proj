import { Accordion, Group, Slider, Stack, Text, Title, rem } from "@mantine/core";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { useEffect, useState } from "react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { Parameter } from "../../model/Parameter";

interface PromptOptionNumImages {
    parameter: Parameter,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function PromptOptionNumImages({
    parameter,
    userPromptOptions,
    setUserPromptOptions
}: PromptOptionNumImages) {
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

    
    if (parameter.content === '') {
        return <></>;
    }    

    const marks = [];
    for (let i = 1; i <= parseInt(parameter.content); i++) {
        marks.push({ value: i, label: i });
    }
    return (
        <Stack gap={"md"}>
            <Group>
                <Text size="sm" fw={500}>{parameter.name}</Text>
            </Group>
            <Slider
                defaultValue={1}
                min={defaultNumImages}
                max={parseInt(parameter.content)}
                marks={marks}
                mx={"xs"}
                value={value}
                onChange={handleOnChange}
            />
        </Stack>

    )
}