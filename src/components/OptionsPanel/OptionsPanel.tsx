import { useEffect, useState } from "react"
import { Accordion, ActionIcon,Button, Chip, Group, Input, Popover, ScrollArea, Stack, Text, Title, rem } from "@mantine/core"
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Parameter, PromptOptions } from "../../model/PromptOptions";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { IconPencilUp, IconQuestionMark } from "@tabler/icons-react";
import { TechnologyOption } from "../Options/TechnologyOption";
import { ProviderOption } from "../Options/ProviderOption";
import { LanguageOption } from "../Options/LanguageOption";
import { ParameterOption } from "../Options/ParameterOption";

interface OptionsPanel {
    promptOptions: PromptOptions,
    setPromptOptions: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    navbarToggle: any
}

export function OptionsPanel({
    promptOptions,
    setPromptOptions,
    userPromptOptions,
    setUserPromptOptions,
    navbarToggle
}: OptionsPanel) {
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
    const [imageResolutionsValue, setImageResolutionsValue] = useState("1024x1024");
    const [maxImagesValue, setMaxImagesValue] = useState(4)
    const [languageValue, setLanguageValue] = useState("PT");

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
        // newUserPromptOptions.setPromptModifiers(newPromptModifiers);
        setUserPromptOptions(newUserPromptOptions);
    }

    return (
        <Stack gap={'md'}>
            <Accordion variant="default" chevron="">
                <TechnologyOption
                    promptOptions={promptOptions}
                    currentTechnology={currentTechnology}
                    technologies={technologies}
                    handleOnChangeTechnology={handleOnChangeTechnology}
                />
                <ProviderOption
                    promptOptions={promptOptions}
                    currentProvider={currentProvider}
                    providers={providers}
                    handleOnChangeProvider={handleOnChangeProvider}
                />
                {
                    parameters.map(parameter => {
                        return (
                            <ParameterOption
                                type={parameter.slug    }
                                parameter={parameter}
                                userPromptOptions={userPromptOptions}
                                setUserPromptOptions={setUserPromptOptions}
                            />
                        )
                    })
                }
                <LanguageOption
                    languages={["PT", "EN"]}
                    defaultLanguage={"PT"}
                    currentLanguage={languageValue}
                    setLanguage={setLanguageValue}
                />
                <Accordion.Item key={"modifiers"} value="modifiers">
                    <Accordion.Control icon={<IconPencilUp style={{ width: rem(20) }} />}>
                        <Title order={5}>Modifiers</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack gap={"lg"}>
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
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Button onClick={navbarToggle} hiddenFrom='sm'>
                Apply
            </Button>
        </Stack>
    )
}