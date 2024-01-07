import { Select } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { Technology } from "../../../model/Technology";
import { useDefaultTechnologyQuery, useTechnologiesQuery } from "../../../api/technologiesApi";
import { useEffect, useState } from "react";
import { PromptRequest } from "../../../model/PromptRequest";

export function ChatPromptTechnologiesField() {
    const [technologyData, setTechnologyData] = useState<{ label: "", value: "" }[]>([]);
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const technologiesQuery = useTechnologiesQuery();
    const defaultTechnologyQuery = useDefaultTechnologyQuery();

    // Set providers data for selectbox
    useEffect(() => {
        if (technologiesQuery.data && technologyData.length === 0) {
            const newTechnologysData = technologiesQuery.data.map((technology: Technology) => {
                return {
                    label: technology.name,
                    value: technology.id.toString()
                }
            });

            setTechnologyData(newTechnologysData);
        }
    }, [technologiesQuery, technologyData]);

    // Update UserRequest with default Technology
    useEffect(() => {
        if (defaultTechnologyQuery.data && userPromptRequest.technology.id <= 0) {
            updateTechnology(defaultTechnologyQuery.data);
        }
    }, [defaultTechnologyQuery]);

    const updateTechnology = (technology: Technology) => {
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.technology = Technology.clone(technology);
        setUserPromptRequest(newUserRequest);
    }

    const onChange = (technologyId: string | null) => {
        if (technologyId !== "") {
            const technology = technologiesQuery.data.find((t: Technology) => t.id === parseInt(technologyId as string));

            if (technology) {
                updateTechnology(technology);
            }
        }
    }

    return (
        technologiesQuery.data !== undefined && defaultTechnologyQuery.data !== undefined &&
        <Select
            value={userPromptRequest.technology.id.toString()}
            data={technologyData}
            onChange={onChange}
        />
    )
}