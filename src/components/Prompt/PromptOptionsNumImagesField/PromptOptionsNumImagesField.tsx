import { Slider, Stack, Text } from "@mantine/core";
import { Parameter } from "../../../models/Parameter";
import { useState } from "react";
import { PromptRequest } from "../../../models/PromptRequest";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";

interface PromptOptionsNumImagesField {
    parameter: Parameter
}

export function PromptOptionsNumImagesField({ parameter }: PromptOptionsNumImagesField) {
    const [
        userPromptRequest,
        setUserPromptRequest,
    ] = useStore(useShallow(state => [
        state.userPromptRequest,
        state.setUserPromptRequest
    ]));

    const { min, max } = parameter.data;
    const [value, setValue] = useState<number>(parseInt(userPromptRequest.parametersList.num_images.value));

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

        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.parametersList.num_images = newParameter;
        setUserPromptRequest(newUserRequest);
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