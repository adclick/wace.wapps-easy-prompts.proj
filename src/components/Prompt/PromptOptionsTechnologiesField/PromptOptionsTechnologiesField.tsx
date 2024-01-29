import { Loader, Select, Text } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { Technology } from "../../../model/Technology";
import { usePromptMode } from "../../../context/PromptModeContext";
import { useEffect, useState } from "react";
import { ProvidersDataItem } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { useDisclosure } from "@mantine/hooks";
import { useTechnologiesQuery } from "../../../api/technologiesApi";
import { PromptRequest } from "../../../model/PromptRequest";
import { Provider } from "../../../model/Provider";

export interface TechnologyDataItem {
    label: string,
    value: string
}

interface PromptOptionsTechnologiesField {
    technologyData: TechnologyDataItem[],
    onChangeTechnology: any
}

export function PromptOptionsTechnologiesField() {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();

    const technologiesQuery = useTechnologiesQuery();

    useEffect(() => {
        if (technologiesQuery.data) {
            const firstTechnology: Technology = technologiesQuery.data[0];

            if (userPromptRequest.technology.id <= 0) {
                const newUserRequest = PromptRequest.clone(userPromptRequest);
                newUserRequest.technology = Technology.clone(firstTechnology);
                setUserPromptRequest(newUserRequest);
            }
        }
    }, [technologiesQuery, userPromptRequest, setUserPromptRequest])  

    const onChangeTechnology = (technologyId: string | null) => {
        const technology = technologiesQuery.data.find((t: Technology) => t.id === parseInt(technologyId as string));
        if (technology) {
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.technology = Technology.clone(technology);
            newUserRequest.provider = new Provider();
            setUserPromptRequest(newUserRequest);
        }
    }

    // Technology list
    if (technologiesQuery.data) {
        const data = technologiesQuery.data.map((technology: Technology) => {
            return {
                label: technology.name,
                value: technology.id.toString()
            }
        });

        return <Select
            label={"Technologies"}
            allowDeselect={false}
            variant="unstyled"
            checkIconPosition="right"
            size="md"
            comboboxProps={{ withinPortal: false }}
            value={userPromptRequest.technology.id.toString()}
            data={data}
            onChange={onChangeTechnology}
        />
    }

    return (
        <Loader size={"xs"} type="dot" />
    )
}