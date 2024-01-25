import { ActionIcon, Badge, Group, Popover, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { Technology } from "../../../model/Technology";
import { getProviders } from "../../../api/providersApi";
import { PromptOptionsProvidersField, ProvidersDataItem } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { PromptRequest } from "../../../model/PromptRequest";
import { Provider } from "../../../model/Provider";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsTechnologiesField, TechnologyDataItem } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import { useTechnologiesQuery } from "../../../api/technologiesApi";
import classes from './PromptModeSwitcher.module.css';
import { IconChevronUp } from "@tabler/icons-react";
import { PromptModifiersList } from "../PromptModifiersList/PromptModifiersList";

export function PromptModeSwitcher() {
    const [technologyData, setTechnologyData] = useState<TechnologyDataItem[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [providerData, setProviderData] = useState<ProvidersDataItem[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();

    const technologiesQuery = useTechnologiesQuery();

    const updateTechnology = async (technology: Technology) => {
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

        setUserPromptRequest(newUserRequest);
        setProviders(providers);
        setProviderData(providerData);
    }

    useEffect(() => {
        if (technologiesQuery.data && technologyData.length === 0) {
            const technologies = technologiesQuery.data;

            const technologysData = technologies.map((technology: Technology) => {
                return {
                    label: technology.name,
                    value: technology.id.toString()
                }
            });

            setTechnologies(technologies);
            setTechnologyData(technologysData);
            updateTechnology(technologies[0]);
        }
    })

    const onChangeTechnology = (technologyId: string | null) => {
        const technology = technologies.find((t: Technology) => t.id === parseInt(technologyId as string));
        if (technology) {
            updateTechnology(technology);
        }
    }

    return (
        <Stack>
            <Group justify="center" >
                <Popover position="top" keepMounted>
                    <Popover.Target>
                        <Badge style={{ cursor: "pointer" }} size="md" variant="dot">
                            {userPromptRequest.technology.name} | {userPromptRequest.provider.model_name}
                        </Badge>
                    </Popover.Target>
                    <Popover.Dropdown className={classes.optionsContainer}>
                        <Stack gap={"md"}>
                            <PromptOptionsTechnologiesField
                                technologyData={technologyData}
                                onChangeTechnology={onChangeTechnology}
                            />
                            <PromptOptionsProvidersField
                                providerData={providerData}
                                providers={providers}
                            />
                        </Stack>
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </Stack>
    )
}