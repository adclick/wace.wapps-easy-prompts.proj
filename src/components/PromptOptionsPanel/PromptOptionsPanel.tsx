import { UserPromptOptions } from "@/model/UserPromptOptions";
import { PromptOptions } from "../../model/PromptOptions";
import { ActionIcon, Button, Card, Chip, Group, Input, Popover, ScrollArea, Select, Slider, Stack, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { IconQuestionMark } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

interface PromptOptionsPanelParams {
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    toggle: any
}

export function PromptOptionsPanel({ userPromptOptions, setUserPromptOptions, toggle }: PromptOptionsPanelParams) {
    const promptOptionsObj = new PromptOptions();
    const [promptOptions, setPromptOptions] = useState<PromptOptions>(promptOptionsObj);

    // response-types
    const [responseTypes, setResponseTypes] = useState<{ label: string, value: string }[]>(promptOptionsObj.getResponseTypesForSelectBox());
    const [currentResponseType, setCurrentResponseType] = useState(promptOptionsObj.getDefaultResponseTypeForSelectBox());

    // providers
    const [providers, setProviders] = useState<{ label: string, value: string }[]>(promptOptionsObj.getProvidersForSelectBox());
    const [currentProvider, setCurrentProvider] = useState(promptOptionsObj.getDefaultProviderForSelectBox());

    // modifiers
    const [promptModifiers, setPromptModifiers] = useState<{ label: string, value: string }[]>(promptOptions.getPromtModifiersForSelectBox());

    // Init logic
    useEffect(() => {
        fetchPromptOptions();
    }, []);

    const fetchPromptOptions = async () => {
        const aIMediatorClient = new AIMediatorClient();
        const promptOptions = await aIMediatorClient.getPromptOptions();
        const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);

        const currentResponseType = promptOptionsObj.getDefaultResponseTypeForSelectBox();
        const currentProvider = promptOptionsObj.getDefaultProviderForSelectBox();

        // Initialize prompt options default values
        setPromptOptions(promptOptionsObj);
        setResponseTypes(promptOptionsObj.getResponseTypesForSelectBox());
        setProviders(promptOptionsObj.getProvidersForSelectBox());
        setPromptModifiers(promptOptionsObj.getPromtModifiersForSelectBox());
        setCurrentResponseType(currentResponseType);
        setCurrentProvider(currentProvider);

        // Initialize user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setResponseType(currentResponseType);
        newUserPromptOptions.setProvider(currentProvider);
        setUserPromptOptions(newUserPromptOptions);
    }

    const handleOnChangeResponseType = (newResponseType: string) => {
        setCurrentResponseType(newResponseType);

        const newProvider = promptOptions.getDefaultProviderForSelectBoxByResponseTypeSlug(newResponseType);
        setCurrentProvider(newProvider);

        // Update user prompt options
        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setResponseType(newResponseType);
        newUserPromptOptions.setProvider(newProvider)
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
        <Stack gap={'xl'} py={"lg"}>
            <Stack gap={'xs'}>
                <Title order={6}>Technology</Title>
                <Select
                    placeholder="Response Type"
                    data={responseTypes}
                    value={currentResponseType}
                    allowDeselect={false}
                    checkIconPosition='right'
                    onChange={handleOnChangeResponseType}
                />
            </Stack>
            <Stack gap={'xs'}>
                <Title order={6}>Provider</Title>
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
                <Title order={6}>Image Resolution</Title>
                <Select
                    placeholder="Image Resolution"
                    allowDeselect={false}
                    checkIconPosition='right'
                />
            </Stack>
            <Stack gap={'xs'}>
                <Title order={6}>Number of images</Title>
                <Slider
                    mb={"lg"}
                    defaultValue={1}
                    min={1}
                    max={4}
                    marks={[
                        { value: 1, label: "1" },
                        { value: 2, label: "2" },
                        { value: 3, label: "3" },
                        { value: 4, label: "4" }
                    ]}
                />
            </Stack>
            <Stack gap={'xs'}>
                <Title order={6}>Prompt Modifiers</Title>
                <Card shadow="md" withBorder={true}>
                    <Stack gap={'sm'}>
                        <Input size='sm' placeholder={"Search"}></Input>
                        <ScrollArea offsetScrollbars>
                            <Stack gap={'xs'}>
                                <Chip.Group multiple={true} onChange={handleOnChangePromptModifier}>
                                    {
                                        promptModifiers.map(item => {
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