import { useEffect, useState } from "react"
import { Accordion, ActionIcon, Box, Button, Card, Chip, Group, Input, Popover, ScrollArea, Select, Slider, Stack, Text, Title, rem } from "@mantine/core"
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Parameter, PromptOptions } from "../../model/PromptOptions";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { IconAdjustmentsHorizontal, IconAffiliate, IconBulb, IconListDetails, IconPencilUp, IconQuestionMark, IconSettings, IconUsers } from "@tabler/icons-react";
import { MaxImagesParameters } from "../Parameters/MaxImagesParameter";
import { ImageResolutionsParameter } from "../Parameters/ImageResolutionsParameter";
import { CharactersLimitParameter } from "../Parameters/CharactersLimitParameter";

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
    const [characteresLimitValue, setCharacteresLimitValue] = useState(1000);
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
        newUserPromptOptions.setPromptModifiers(newPromptModifiers);
        setUserPromptOptions(newUserPromptOptions);
    }

    return (
        <Stack gap={'md'}>
            <Accordion variant="default" chevron="">
                <Accordion.Item key={"technology"} value="technology">
                    <Accordion.Control icon={<IconBulb style={{ width: rem(20) }} />}>
                        <Group align="baseline" justify="space-between">
                            <Title order={6}>Technology</Title>
                            <Text size="xs">{promptOptions.getTechnologyBySlug(currentTechnology)?.name}</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Select
                            placeholder="Technology"
                            data={technologies}
                            value={currentTechnology}
                            allowDeselect={false}
                            checkIconPosition='right'
                            onChange={handleOnChangeTechnology}
                            variant="unstyled"
                            maxDropdownHeight={"500"}
                            my={"xs"}
                            />
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={"provider"} value="provider">
                    <Accordion.Control icon={<IconSettings style={{ width: rem(20) }} />}>
                        <Group align="baseline" justify="space-between">
                            <Title order={6}>Engine</Title>
                            <Text size="xs">{promptOptions.getProviderBySlug(currentProvider)?.name}</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Select
                            placeholder="Provider"
                            data={providers}
                            value={currentProvider}
                            allowDeselect={false}
                            checkIconPosition='right'
                            onChange={handleOnChangeProvider}
                            variant="unstyled"
                            my={"xs"}
                            />
                    </Accordion.Panel>
                </Accordion.Item>
                {
                    parameters.map(parameter => {
                        switch (parameter.slug) {
                            case "characters-limit":
                                return (
                                    <Accordion.Item key={"characters-limit"} value="characters-limit">
                                        <Accordion.Control icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
                                            <Group align="baseline" justify="space-between">
                                                <Title order={6}>Characters Limit</Title>
                                                <Text size="xs">{characteresLimitValue}</Text>
                                            </Group>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <CharactersLimitParameter
                                                key={parameter.slug}
                                                name={parameter.name}
                                                slug={parameter.slug}
                                                content={parameter.content}
                                                value={characteresLimitValue}
                                                setValue={setCharacteresLimitValue}
                                            />
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                )
                            case "max-images":
                                return (
                                    <Accordion.Item key={"max-images"} value="max-images">
                                        <Accordion.Control icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
                                            <Group align="baseline" justify="space-between">
                                                <Title order={6}>Max Images</Title>
                                                <Text size="xs">{maxImagesValue}</Text>
                                            </Group>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <MaxImagesParameters
                                                key={parameter.slug}
                                                name={parameter.name}
                                                slug={parameter.slug}
                                                content={parameter.content}
                                                value={maxImagesValue}
                                                setValue={setMaxImagesValue}
                                            />
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                )
                            case "image-resolutions":
                                return (
                                    <Accordion.Item key={"image-resolutions"} value="image-resolutions">
                                        <Accordion.Control icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
                                            <Group align="baseline" justify="space-between">
                                                <Title order={6}>Resolution</Title>
                                                <Text size="xs">{imageResolutionsValue}</Text>
                                            </Group>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <ImageResolutionsParameter
                                                key={parameter.slug}
                                                name={parameter.name}
                                                slug={parameter.slug}
                                                content={parameter.content}
                                                value={imageResolutionsValue}
                                                setValue={setImageResolutionsValue}
                                            />
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                )
                            case "language":
                                return (
                                    <Accordion.Item key={"language"} value="language">
                                        <Accordion.Control icon={<IconAdjustmentsHorizontal style={{ width: rem(20) }} />}>
                                            <Group align="baseline" justify="space-between">
                                                <Title order={6}>Language</Title>
                                                <Text size="xs">{languageValue}</Text>
                                            </Group>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <ImageResolutionsParameter
                                                key={parameter.slug}
                                                name={parameter.name}
                                                slug={parameter.slug}
                                                content={parameter.content}
                                                value={languageValue}
                                                setValue={setLanguageValue}
                                            />
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                )
                            default:
                                return "";
                        }
                    })
                }
                <Accordion.Item key={"modifiers"} value="modifiers">
                    <Accordion.Control icon={<IconPencilUp style={{ width: rem(20) }} />}>Modifiers</Accordion.Control>
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
            <Button onClick={toggle} hiddenFrom='sm'>
                Apply
            </Button>
        </Stack>
    )
}