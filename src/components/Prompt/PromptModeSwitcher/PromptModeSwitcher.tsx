import { ActionIcon, Badge, Group, Popover, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { Technology } from "../../../model/Technology";
import { getProviders, useDefaultProviderQuery, useProvidersQuery } from "../../../api/providersApi";
import { PromptOptionsProvidersField, ProvidersDataItem } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { PromptRequest } from "../../../model/PromptRequest";
import { Provider } from "../../../model/Provider";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsTechnologiesField, TechnologyDataItem } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import { useDefaultTechnologyQuery, useTechnologiesQuery } from "../../../api/technologiesApi";
import classes from './PromptModeSwitcher.module.css';
import { IconChevronUp } from "@tabler/icons-react";
import { PromptModifiersList } from "../PromptModifiersList/PromptModifiersList";
import { useDisclosure } from "@mantine/hooks";

export function PromptModeSwitcher() {
    const [technologyData, setTechnologyData] = useState<TechnologyDataItem[]>([]);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [providerData, setProviderData] = useState<ProvidersDataItem[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const [technologyChanged, technologyChangedHandle] = useDisclosure(false);

    const technologiesQuery = useTechnologiesQuery();
    const providersQuery = useProvidersQuery(userPromptRequest.technology.id);

    // Technology list
    if (technologiesQuery.data) {
        const firstTechnology: Technology = technologiesQuery.data[0];
        const data = technologiesQuery.data.map((technology: Technology) => {
            return {
                label: technology.name,
                value: technology.id.toString()
            }
        });

        if (technologyData.length === 0) {
            setTechnologyData(data);
        }

        if (userPromptRequest.technology.id <= 0) {
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.technology = Technology.clone(firstTechnology);
            setUserPromptRequest(newUserRequest);
        }
    }

    // Provider List
    if (providersQuery.data) {
        

        if (providerData.length === 0 || technologyChanged) {
            const data = providersQuery.data.map((provider: Provider) => {
                return {
                    label: provider.model_name,
                    value: provider.id.toString()
                }
            });
            
            const firstProvider: Provider = providersQuery.data[0];

            setProviderData(data);
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.provider = Provider.clone(firstProvider);
            setUserPromptRequest(newUserRequest);
            technologyChangedHandle.close();
        }
    }


    const onChangeTechnology = (technologyId: string | null) => {
        const technology = technologiesQuery.data.find((t: Technology) => t.id === parseInt(technologyId as string));
        if (technology) {
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.technology = Technology.clone(technology);
            setUserPromptRequest(newUserRequest);
            technologyChangedHandle.open();
        }
    }

    const onChangeProvider = (providerId: string | null) => {
        if (providerId !== "") {
            const provider = providersQuery.data.find((p: Provider) => p.id === parseInt(providerId as string));
            if (provider) {
                const newUserRequest = PromptRequest.clone(userPromptRequest);
                newUserRequest.provider = Provider.clone(provider);
                setUserPromptRequest(newUserRequest);
            }
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
                                onChangeProvider={onChangeProvider}
                            />
                        </Stack>
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </Stack>
    )
}