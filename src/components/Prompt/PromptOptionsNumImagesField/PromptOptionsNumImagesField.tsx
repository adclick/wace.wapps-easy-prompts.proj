import { Slider, Stack, Text } from "@mantine/core";
import { Parameter } from "../../../model/Parameter";
import { useState } from "react";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptRequest } from "../../../model/PromptRequest";

interface PromptOptionsNumImagesField {
    parameter: Parameter
}

export function PromptOptionsNumImagesField({ parameter }: PromptOptionsNumImagesField) {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();

    const { min, max } = parameter.data;
    const [value, setValue] = useState<number>(min);

    const marks = [];
    for (let i = min; i <= max; i++) {
        marks.push({
            value: i,
            label: i
        });
    }

    const updateValue = (value: number) => {
        setValue(value);

        const newParameter = Parameter.clone(parameter);
        newParameter.value = value;

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
                min={min}
                max={max}
            />
        </Stack>
    )
}