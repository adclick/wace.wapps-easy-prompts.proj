import { ActionIcon, Badge, Group, Popover, SegmentedControl, Stack, Text, Tooltip } from "@mantine/core";
import { PromptMode, getAllPromptModes, getPromptModeColor, isPromptModeEnabled } from "../../../model/PromptMode";
import { usePromptMode } from "../../../context/PromptModeContext";
import { IconDots } from "@tabler/icons-react";
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
import { getPromptModeIcon } from "../../../utils/iconsUtils";

export function PromptModeSwitcher() {
    const { promptMode, setPromptMode } = usePromptMode();
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

    const data = getAllPromptModes.map(mode => {
        return {
            label: (
                <Group justify="center" wrap="nowrap" gap={"xs"} px={"sm"}>
                    {getPromptModeIcon(mode, 16)}
                </Group>
            ),
            value: mode,
            disabled: !isPromptModeEnabled(mode)
        }
    });

    const onChangeMode = (value: string) => {
        setPromptMode(value as PromptMode);

        if (technologiesQuery.data) {
            // const technologies = technologiesQuery.data.filter((technology: Technology) => {
            //     return Technology.getMode(technology.slug) === value
            // });
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
    }

    useEffect(() => {
        if (technologiesQuery.data && technologyData.length === 0) {
            // const technologies = technologiesQuery.data.filter((technology: Technology) => {
            //     return Technology.getMode(technology.slug) === promptMode
            // });

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
                <Group justify="center">

                </Group>
                {/* <SegmentedControl
                    py={0}
                    size="xs"
                    color={getPromptModeColor(promptMode)}
                    defaultValue={promptMode}
                    onChange={onChangeMode}
                    fullWidth
                    data={data}
                    classNames={{
                        root: classes.segment,
                        label: classes.segmentLabel
                    }}
                /> */}
                <Popover position="top" keepMounted>
                    <Popover.Target>
                        <Badge style={{cursor: "pointer"}} size="md" variant="dot" color={getPromptModeColor(promptMode)}>
                            {userPromptRequest.technology.name} | {userPromptRequest.provider.model_name}
                        </Badge>
                        {/* <Tooltip label="More Options">
                            <ActionIcon
                                variant="transparent"
                                color="gray"
                                size="sm"
                            >
                                <IconDots size={18} stroke={2} />
                            </ActionIcon>
                        </Tooltip> */}
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