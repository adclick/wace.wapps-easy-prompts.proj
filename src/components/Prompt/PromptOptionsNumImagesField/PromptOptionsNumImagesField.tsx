import { Slider, Stack, Text } from "@mantine/core";
import { Parameter } from "../../../models/Parameter";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { Thread } from "../../../models/Thread";

interface PromptOptionsNumImagesField {
    parameter: Parameter
}

export function PromptOptionsNumImagesField({ parameter }: PromptOptionsNumImagesField) {
    const [
        nextThread,
        setNextThread,
    ] = useStore(useShallow(state => [
        state.nextThread,
        state.setNextThread
    ]));

    const { min, max } = parameter.data;
    const [value, setValue] = useState<number>(parseInt(nextThread.prompt.parametersList.num_images.value));

    const marks = [];
    for (let i = parseInt(min); i <= parseInt(max); i++) {
        marks.push({
            value: i,
            label: i
        });
    }

    const updateValue = (value: number) => {
        setValue(value);

        const newParameter = Parameter.clone(parameter);
        newParameter.value = value.toString();

        const newNextThread = Thread.clone(nextThread);
        newNextThread.prompt.parametersList.num_images = newParameter;
        setNextThread(newNextThread);
    }

    return (
        <Stack key={parameter.id}>
            <Text>{parameter.name}</Text>
            <Slider
                value={value}
                onChange={updateValue}
                marks={marks}
                min={parseInt(min)}
                max={parseInt(max)}
            />
        </Stack>
    )
}