import { Select } from "@mantine/core";
import { Parameter } from "../../../models/Parameter";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { Thread } from "../../../models/Thread";

interface PromptOptionsImageResolution {
    parameter: Parameter
}

export function PromptOptionsImageResolution({ parameter }: PromptOptionsImageResolution) {
    const [
        nextThread,
        setNextThread,
    ] = useStore(useShallow(state => [
        state.nextThread,
        state.setNextThread
    ]));

    const [value, setValue] = useState(nextThread.prompt.parametersList.image_resolution.value);

    const data = parameter.data;

    const updateResolution = (resolution: string|null) => {
        if (!resolution) return;
        
        setValue(resolution);

        const newParameter = Parameter.clone(parameter);
        newParameter.value = resolution;

        const newNextthread = Thread.clone(nextThread);
        newNextthread.prompt.parametersList.image_resolution = newParameter;
        setNextThread(newNextthread);
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

