import { useEffect, useState } from "react"
import { Accordion, ActionIcon, Box, Button, Card, Chip, Group, Input, Popover, ScrollArea, Select, Slider, Stack, Text, Title, rem } from "@mantine/core"
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Parameter, PromptOptions } from "../../model/PromptOptions";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { IconBulb, IconListDetails, IconQuestionMark, IconSettings } from "@tabler/icons-react";
import { MaxImagesParameters } from "../Parameters/MaxImagesParameter";
import { ImageResolutionsParameter } from "../Parameters/ImageResolutionsParameter";

interface OptionsPanelParams {
    promptOptions: PromptOptions,
    setPromptOptions: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    toggle: any
}

export function OptionsPanel({ promptOptions, setPromptOptions, userPromptOptions, setUserPromptOptions, toggle }: OptionsPanelParams) {
    // technologies
    const defaultTechnologySlug = promptOptions.getDefaultTechnologySlug();
    const [technologies, setTechnologies] = useState<{ label: string, value: string }[]>(promptOptions.getTechnologies());
    const [currentTechnology, setCurrentTechnology] = useState(defaultTechnologySlug);

    // providers
    const defaultProviderSlug = promptOptions.getDefaultProviderSlug(defaultTechnologySlug);
    const [providers, setProviders] = useState<{ label: string, value: string }[]>(promptOptions.getProviders(defaultTechnologySlug));
    const [currentProvider, setCurrentProvider] = useState(promptOptions.getDefaultProviderSlug(defaultTechnologySlug));

    // parameters
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
            <Accordion multiple={true} variant="separated">
                <Accordion.Item key={"technology"} value="technology">
                    <Accordion.Control icon={<IconBulb style={{width: rem(20)}} />}>Technology</Accordion.Control>
                    <Accordion.Panel>
                        <Stack>
                            <Select
                                placeholder="Technology"
                                data={technologies}
                                value={currentTechnology}
                                allowDeselect={false}
                                checkIconPosition='right'
                                onChange={handleOnChangeTechnology}
                            />
                            <Select
                                placeholder="Provider"
                                data={providers}
                                value={currentProvider}
                                allowDeselect={false}
                                checkIconPosition='right'
                                onChange={handleOnChangeProvider}
                            />
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={"parameters"} value="parameters">
                    <Accordion.Control icon={<IconListDetails style={{width: rem(20)}} />}>Parameters</Accordion.Control>
                    <Accordion.Panel>
                        <Stack gap={'xl'}>
                            {
                                parameters.map(parameter => {
                                    switch (parameter.slug) {
                                        case "max-images":
                                            return <MaxImagesParameters
                                                key={parameter.slug}
                                                name={parameter.name}
                                                slug={parameter.slug}
                                                content={parameter.content}
                                            />
                                        case "image-resolutions":
                                            return <ImageResolutionsParameter
                                                key={parameter.slug}
                                                name={parameter.name}
                                                slug={parameter.slug}
                                                content={parameter.content}
                                            />
                                        default:
                                            return "";
                                    }
                                })
                            }
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={"modifiers"} value="modifiers">
                    <Accordion.Control icon={<IconSettings style={{width: rem(20)}} />}>Modifiers</Accordion.Control>
                    <Accordion.Panel>
                        <Stack>
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
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Button onClick={toggle} hiddenFrom='sm'>
                Apply
            </Button>
        </Stack>
    )
}