import { Stack } from "@mantine/core";
import { PromptOptionsTechnologiesField, TechnologyDataItem } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import { PromptOptionsProvidersField, ProvidersDataItem } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { useEffect, useState } from "react";
import { useTechnologiesQuery } from "../../../api/technologiesApi";
import { Technology } from "../../../model/Technology";
import { Provider } from "../../../model/Provider";
import { PromptRequest } from "../../../model/PromptRequest";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { getProviders } from "../../../api/providersApi";
import { usePromptMode } from "../../../context/PromptModeContext";

export function PromptOptionsContainer() {
    const [technologyData, setTechnologyData] = useState<TechnologyDataItem[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [providerData, setProviderData] = useState<ProvidersDataItem[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const { promptMode } = usePromptMode();

    const technologiesQuery = useTechnologiesQuery();

    // Get Technologies List
    useEffect(() => {
        if (technologiesQuery.data) {
            const technologies = technologiesQuery.data.filter((technology: Technology) => {
                return Technology.getMode(technology.slug) === promptMode
            });

            const technologysData = technologies.map((technology: Technology) => {
                return {
                    label: technology.name,
                    value: technology.id.toString()
                }
            });

            setTechnologies(technologies);
            setTechnologyData(technologysData);
        }
    }, [technologiesQuery, technologyData, promptMode]);

    // Set Default Technology
    useEffect(() => {
        if (technologies.length > 0 && promptMode !== Technology.getMode(userPromptRequest.technology.slug) && userPromptRequest.technology.id <= 0) {
            const defaultTechnology = technologies.find((technology: Technology) => technology.default === true);
            if (defaultTechnology) {
                updateTechnology(defaultTechnology.id.toString());
            }
        }
    }, [technologies, userPromptRequest])


    const updateTechnology = async (technologyId: string | null) => {
        const technology = technologies.find((t: Technology) => t.id === parseInt(technologyId as string));
        if (technology) {
            const providers = await getProviders(technology.id);
            const providerData: ProvidersDataItem[] = providers.map(provider => {
                return {
                    label: provider.model_name,
                    value: provider.id.toString()
                }
            });

            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.technology = Technology.clone(technology);
            newUserRequest.provider = Provider.clone(providers[0]);
            // newUserRequest.providers = [providers[0]];

            setUserPromptRequest(newUserRequest);
            setProviders(providers);
            setProviderData(providerData);
        }
    }

    return (
        <Stack>
            <PromptOptionsTechnologiesField
                technologyData={technologyData}
                technologies={technologies}
                onChangeTechnology={updateTechnology}
            />

            <PromptOptionsProvidersField
                providerData={providerData}
                providers={providers}
            />
        </Stack>
    )
}