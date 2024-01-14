import { SegmentedControl, Select } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { Technology } from "../../../model/Technology";
import { useEffect, useState } from "react";
import { PromptRequest } from "../../../model/PromptRequest";
import { useDefaultModeQuery, useModesQuery } from "../../../api/modesApi";

export function PromptOptionsModesField() {
    const [modeData, setTechnologyData] = useState<{ label: "", value: "" }[]>([]);
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const modesQuery = useModesQuery();
    const defaultModeQuery = useDefaultModeQuery();

    // Set providers data for selectbox
    useEffect(() => {
        if (modesQuery.data && modeData.length === 0) {
            const newTechnologysData = modesQuery.data.map((mode: Technology) => {
                return {
                    label: mode.name,
                    value: mode.id.toString()
                }
            });

            setTechnologyData(newTechnologysData);
        }
    }, [modesQuery, modeData]);

    // Update UserRequest with default Technology
    useEffect(() => {
        if (defaultModeQuery.data && userPromptRequest.mode.id <= 0) {
            updateTechnology(defaultModeQuery.data);
        }
    }, [defaultModeQuery]);

    const updateTechnology = (mode: Technology) => {
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.mode = Technology.clone(mode);
        setUserPromptRequest(newUserRequest);
    }

    const onChange = (modeId: string | null) => {
        if (modeId !== "") {
            const mode = modesQuery.data.find((t: Technology) => t.id === parseInt(modeId as string));

            if (mode) {
                updateTechnology(mode);
            }
        }
    }

    return (
        modesQuery.data !== undefined && defaultModeQuery.data !== undefined &&
        <Select
            w={300}
            checkIconPosition="right"
            comboboxProps={{ withinPortal: false }}
            value={userPromptRequest.mode.id.toString()}
            data={modeData}
            onChange={onChange}
        />
    )
}