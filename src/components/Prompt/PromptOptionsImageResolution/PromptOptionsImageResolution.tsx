import { Select } from "@mantine/core";
import { Parameter } from "../../../models/Parameter";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptRequest } from "../../../models/PromptRequest";
import { useEffect, useState } from "react";

interface PromptOptionsImageResolution {
    parameter: Parameter
}

export function PromptOptionsImageResolution({ parameter }: PromptOptionsImageResolution) {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const [value, setValue] = useState(userPromptRequest.parametersList.image_resolution.value);

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

