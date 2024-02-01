import { Select } from "@mantine/core";
import { Parameter } from "../../../model/Parameter";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useState } from "react";

interface PromptOptionsImageResolution {
    parameter: Parameter
}

export function PromptOptionsImageResolution({ parameter }: PromptOptionsImageResolution) {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const [value, setValue] = useState(parameter.value);

    const data = parameter.data;

    const updateResolution = (resolution: string|null) => {
        if (!resolution) return;
        
        setValue(resolution);

        const newParameter = Parameter.clone(parameter);
        newParameter.value = resolution;

        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.parametersList.image_resolution = newParameter;
        setUserPromptRequest(newUserRequest);
    }

    return (
        <Select
            label="Image Resolution"
            size="md"
            comboboxProps={{ withinPortal: false }}
            allowDeselect={false}
            variant="unstyled"
            checkIconPosition="right"
            data={data}
            value={value}
            onChange={updateResolution}
        />
    )
}

