import { UserPromptOptions } from "@/model/UserPromptOptions";
import { Parameter, PromptOptions } from "../../model/PromptOptions";
import { ActionIcon, Box, Button, Card, Chip, Group, Input, Popover, ScrollArea, Select, Slider, Stack, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { IconQuestionMark } from "@tabler/icons-react";

interface PromptOptionsPanelParams {
    promptOptions: PromptOptions,
    setPromptOptions: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    toggle: any
}

export function PromptOptionsPanel({ promptOptions, setPromptOptions, userPromptOptions, setUserPromptOptions, toggle }: PromptOptionsPanelParams) {
    // technologies
    const defaultTechnologySlug = promptOptions.getDefaultTechnologySlug();
    const [technologies, setTechnologies] = useState<{ label: string, value: string }[]>(promptOptions.getTechnologies());
    const [currentTechnology, setCurrentTechnology] = useState(defaultTechnologySlug);

    // providers
    const defaultProviderSlug = promptOptions.getDefaultProviderSlug(defaultTechnologySlug);
    const [providers, setProviders] = useState<{ label: string, value: string }[]>(promptOptions.getProviders(defaultTechnologySlug));
    const [currentProvider, setCurrentProvider] = useState(promptOptions.getDefaultProviderSlug(defaultTechnologySlug));

    const [parameters, setParameters] = useState<Parameter[]>(promptOptions.getParameters(defaultTechnologySlug, defaultProviderSlug));


    // modifiers
    const [modifiers, setModifiers] = useState<{ label: string, value: string }[]>(promptOptions.getModifiers(defaultTechnologySlug));

    // Init logic
    useEffect(() => {
        fetchPromptOptions();
    }, []);

    const fetchPromptOptions = async () => {
        const aIMediatorClient = new AIMediatorClient();
        const promptOptions = await aIMediatorClient.getPromptOptions();
        const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);

        const currentTechnologySlug = promptOptionsObj.getDefaultTechnologySlug();
        const currentProviderSlug = promptOptionsObj.getDefaultProviderSlug(currentTechnologySlug);

        // Initialize prompt options default values
        setPromptOptions(promptOptionsObj);
        setTechnologies(promptOptionsObj.getTechnologies());
        setProviders(promptOptionsObj.getProviders(currentTechnologySlug));
        setParameters(promptOptionsObj.getParameters(currentTechnologySlug, currentProviderSlug));
        setModifiers(promptOptionsObj.getModifiers(currentTechnologySlug));
        setCurrentTechnology(currentTechnologySlug);
        setCurrentProvider(currentProviderSlug);

        // Initialize user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setTechnology(currentTechnologySlug);
        newUserPromptOptions.setProvider(currentProviderSlug);
        setUserPromptOptions(newUserPromptOptions);
    }

    const handleOnChangeTechnology = (newTechnologySlug: string) => {
        setCurrentTechnology(newTechnologySlug);

        const providers = promptOptions.getProviders(newTechnologySlug);
        setProviders(providers);

        const newProviderSlug = promptOptions.getDefaultProviderSlug(newTechnologySlug);
        setCurrentProvider(newProviderSlug);

        const parameters = promptOptions.getParameters(newTechnologySlug, newProviderSlug);
        setParameters(parameters);

        const modifiers = promptOptions.getModifiers(newTechnologySlug);
        setModifiers(modifiers);

        // Update user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setTechnology(newTechnologySlug);
        newUserPromptOptions.setProvider(newProviderSlug)
        setUserPromptOptions(newUserPromptOptions);
    }

    const handleOnChangeProvider = (newProvider: string) => {
        setCurrentProvider(newProvider);

        // Update user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setProvider(newProvider);
        setUserPromptOptions(newUserPromptOptions);
    }

    const handleOnChangePromptModifier = (newPromptModifiers: any) => {
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setPromptModifiers(newPromptModifiers);
        setUserPromptOptions(newUserPromptOptions);
    }

    return (
        <Stack gap={'md'} py={"lg"}>
            <Stack gap={'xs'}>
                <Select
                    placeholder="Technology"
                    data={technologies}
                    value={currentTechnology}
                    allowDeselect={false}
                    checkIconPosition='right'
                    onChange={handleOnChangeTechnology}
                />
            </Stack>
            <Stack gap={'xs'}>
                <Select
                    placeholder="Provider"
                    data={providers}
                    value={currentProvider}
                    allowDeselect={false}
                    checkIconPosition='right'
                    onChange={handleOnChangeProvider}
                />
            </Stack>
            <Stack gap={'xs'}>
                {
                    parameters.map(parameter => {
                        switch (parameter.slug) {
                            case "max-images":
                                const marks = [];
                                for (let i = 1; i <= parseInt(parameter.content); i++) {
                                    marks.push({value: i, label: i});
                                }
                                return (
                                    <Box key={parameter.slug}>
                                        <Slider
                                            mb={"lg"}
                                            defaultValue={1}
                                            min={1}
                                            max={parseInt(parameter.content)}
                                            marks={marks}
                                        />
                                    </Box>
                                )
                            default:
                                break;
                        }
                    })
                }
            </Stack>
            <Stack gap={'xs'}>
                <Card shadow="md" withBorder={true}>
                    <Stack gap={'sm'}>
                        <Input size='sm' placeholder={"Search"}></Input>
                        <ScrollArea offsetScrollbars>
                            <Stack gap={'xs'}>
                                <Chip.Group multiple={true} onChange={handleOnChangePromptModifier}>
                                    {
                                        modifiers.map(item => {
                                            return (
                                                <Group key={item.value} justify="space-between">
                                                    <Chip size='sm' variant='light' value={item.value}>
                                                        {item.label}
                                                    </Chip>
                                                    <Popover width={200} position="bottom" withArrow shadow="md">
                                                        <Popover.Target>
                                                            <ActionIcon size={'sm'} variant="outline" aria-label="Settings">
                                                                <IconQuestionMark style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                                            </ActionIcon>
                                                        </Popover.Target>
                                                        <Popover.Dropdown>
                                                            <Text size="xs">
                                                                Some description
                                                            </Text>
                                                        </Popover.Dropdown>
                                                    </Popover>
                                                </Group>
                                            )
                                        })
                                    }
                                </Chip.Group>
                            </Stack>
                        </ScrollArea>
                    </Stack>
                </Card>
            </Stack>
            <Button onClick={toggle} hiddenFrom='sm'>
                Apply
            </Button>
        </Stack>
    )
}