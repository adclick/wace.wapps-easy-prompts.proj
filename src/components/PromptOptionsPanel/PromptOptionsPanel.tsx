import { UserPromptOptions } from "@/model/UserPromptOptions";
import { PromptOptions } from "../../model/PromptOptions";
import { ActionIcon, Button, Card, Chip, Group, Input, Popover, ScrollArea, Select, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { EasyPromptsApiClient } from "../../clients/EasyPromptsApiClient";
import { IconQuestionMark } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

interface PromptOptionsPanelParams {
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function PromptOptionsPanel({ userPromptOptions, setUserPromptOptions }: PromptOptionsPanelParams) {
    const [opened, { toggle }] = useDisclosure();
    const promptOptionsObj = new PromptOptions();
    const [promptOptions, setPromptOptions] = useState<PromptOptions>(promptOptionsObj);
    const [responseTypes, setResponseTypes] = useState<{ label: string, value: string }[]>(promptOptionsObj.getResponseTypesForSelectBox());
    const [currentResponseType, setCurrentResponseType] = useState(promptOptionsObj.getDefaultResponseTypeForSelectBox());
    const [providers, setProviders] = useState<{ label: string, value: string }[]>(promptOptionsObj.getProvidersForSelectBox());
    const [currentProvider, setCurrentProvider] = useState(promptOptionsObj.getDefaultProviderForSelectBox());

    // Init logic
    useEffect(() => {
        fetchPromptOptions();
    }, []);

    const fetchPromptOptions = async () => {
        const client = new EasyPromptsApiClient();
        const promptOptions = await client.getPromptOptions();
        const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);

        const currentResponseType = promptOptionsObj.getDefaultResponseTypeForSelectBox();
        const currentProvider = promptOptionsObj.getDefaultProviderForSelectBox();

        // Initialize prompt options default values
        setPromptOptions(promptOptionsObj);
        setResponseTypes(promptOptionsObj.getResponseTypesForSelectBox());
        setProviders(promptOptionsObj.getProvidersForSelectBox());
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
        console.log(newProvider);
    }

    const filters = [
        { name: "Act like a Content Manager", help: "" },
        { name: "Assume you're a security reviewer", help: "" },
        { name: "Answser me as a SEO expert", help: "" },
        { name: "Evaluate images like a designer", help: "" },
    ]

    return (
        <Stack gap={"lg"} py={"md"}>
            <Stack gap={'md'}>
                <Select
                    placeholder="Response Type"
                    data={responseTypes}
                    value={currentResponseType}
                    allowDeselect={false}
                    checkIconPosition='right'
                    size='sm'
                    onChange={handleOnChangeResponseType}
                  />
                <Select
                    placeholder="Provider"
                    data={providers}
                    value={currentProvider}
                    allowDeselect={false}
                    checkIconPosition='right'
                    size='sm'
                    onChange={handleOnChangeProvider}
                  />


                <Card shadow="md" withBorder={true}>
                    <Stack gap={'sm'}>
                        <Input size='sm' placeholder={"Search"}></Input>
                        <ScrollArea offsetScrollbars>
                            <Stack gap={'xs'}>
                                {
                                    filters.map(item => {
                                        return (
                                            <Group key={item.name} justify="space-between">
                                                <Chip size='sm' variant='light'>
                                                    {item.name}
                                                </Chip>
                                                <Popover width={200} position="bottom" withArrow shadow="md">
                                                    <Popover.Target>
                                                        <ActionIcon size={'sm'} variant="outline" aria-label="Settings">
                                                            <IconQuestionMark style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                                        </ActionIcon>
                                                    </Popover.Target>
                                                    <Popover.Dropdown>
                                                        <Text size="xs">
                                                            {item.help}
                                                        </Text>
                                                    </Popover.Dropdown>
                                                </Popover>
                                            </Group>
                                        )
                                    })
                                }
                            </Stack>
                        </ScrollArea>
                    </Stack>
                </Card>
                <Button variant='outline' onClick={toggle} hiddenFrom='sm'>
                    Apply
                </Button>
            </Stack>
        </Stack>
    )
}