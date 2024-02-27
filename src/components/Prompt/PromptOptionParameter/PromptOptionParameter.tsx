import { Select } from "@mantine/core";
import { FC } from "react";
import { Parameter } from "../../../models/Parameter";

interface PromptOptionParameterProps {
    parameter: Parameter
}

const PromptOptionParameter: FC<PromptOptionParameterProps> = ({
    parameter
}: PromptOptionParameterProps) => {

    return (
        <Select
            variant="unstyled"
            label={parameter.name}
            data={parameter.data}
            value={parameter.value}
            comboboxProps={{ withinPortal: false }}
        />
    )
}

export default PromptOptionParameter;