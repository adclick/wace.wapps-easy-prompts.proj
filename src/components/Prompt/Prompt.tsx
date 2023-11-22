import { ActionIcon, Box, Button, Center, Divider, Drawer, Group, Loader, ScrollAreaAutosize, Stack, Tabs, Text, Textarea, Title, Tooltip, rem } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconCheck, IconDeviceFloppy, IconPlayerPlayFilled, IconReload, IconSettings, IconTemplate } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { PromptsModal } from "./PromptsModal";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Thread } from "../../model/Thread";
import { useTranslation } from "react-i18next";
import { ModeButton } from "../Elements/ModeButton";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { Modifier } from "../../model/Modifier";
import { Parameter } from "../../model/Parameter";
import { SelectedOptionsWidget } from "../Elements/SelectedOptionsWidget";
import { ModifiersOption } from "../Options/ModifiersOption";
import { ParameterOption } from "../Options/ParameterOption";
import { TechnologyOption } from "../Options/TechnologyOption";
import { ProviderOption } from "../Options/ProviderOption";

interface PromptParams {
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    scrollIntoView: any,
    threads: Thread[],
    setThreads: any,
    promptOptions: PromptOptions,
    technology: Technology,
    technologies: Technology[],
    handleOnChangeTechnology: any,
    provider: Provider,
    providers: Provider[],
    handleOnChangeProvider: any,
    modifiers: Modifier[],
    activeModifiers: Modifier[],
    setActiveModifiers: any
    setUserPromptOptions: any,
    parameters: Parameter[],
    userPrompt: string,
    setUserPrompt: any,
    refreshPromptOptions: any
}

export function Prompt({
    aIMediatorClient,
    scrollIntoView,
    threads,
    setThreads,
    promptOptions,
    technology,
    technologies,
    handleOnChangeTechnology,
    provider,
    providers,
    handleOnChangeProvider,
    modifiers,
    activeModifiers,
    setActiveModifiers,
    userPromptOptions,
    setUserPromptOptions,
    parameters,
    userPrompt,
    setUserPrompt,
    refreshPromptOptions
}: PromptParams) {
    const { t } = useTranslation();
    const [opened, { open, close }] = useDisclosure(false);

    // Submit prompt
    const submitPrompt = async () => {
        if (userPrompt.length <= 0) return;

        setUserPrompt("");

        // Deep copy
        const threadUserOptions = JSON.parse(JSON.stringify(userPromptOptions));
        const thread = new Thread();
        thread.request.setText(userPrompt);
        thread.request.setUserPromptOptions(threadUserOptions);
        setThreads([...threads, thread]);

        scrollIntoView({ alignment: 'start' });
    }

    const submitPromptByTextArea = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            await submitPrompt();
        }
    }

    const templates: any[] = [
    ]

    return (
        <Box>
            <Drawer opened={opened} onClose={close} title="Options" size={"350px"}>
                <Tabs defaultValue="options" variant="default">
                    <Tabs.List grow>
                        <Tabs.Tab value="options" leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                            <Text size="sm" fw={700}>Options</Text>
                        </Tabs.Tab>
                        <Tabs.Tab value="templates" leftSection={<IconTemplate style={{ width: rem(14), height: rem(14) }} />}>
                            <Text size="sm" fw={700}>Templates</Text>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="options">
                        <Stack my={"xs"} gap={"md"}>
                            <TechnologyOption
                                promptOptions={promptOptions}
                                currentTechnology={technology}
                                technologies={technologies}
                                handleOnChangeTechnology={handleOnChangeTechnology}
                            />
                            <ProviderOption
                                promptOptions={promptOptions}
                                currentProvider={provider}
                                providers={providers}
                                handleOnChangeProvider={handleOnChangeProvider}
                            />
                            {
                                parameters.length > 0 &&
                                <Divider />
                            }
                            {
                                parameters.map(parameter => {
                                    return (
                                        <Box my={"sm"} key={parameter.slug}>
                                            <ParameterOption
                                                key={parameter.slug}
                                                type={parameter.slug}
                                                parameter={parameter}
                                                userPromptOptions={userPromptOptions}
                                                setUserPromptOptions={setUserPromptOptions}
                                            />
                                        </Box>
                                    )
                                })
                            }
                            <Divider />
                            <ModifiersOption
                                modifiers={modifiers}
                                activeModifiers={activeModifiers}
                                setActiveModifiers={setActiveModifiers}
                                promptOptions={promptOptions}
                                userPromptOptions={userPromptOptions}
                                setUserPromptOptions={setUserPromptOptions}
                                currentTechnologySlug={technology.slug}
                                aIMediatorClient={aIMediatorClient}
                                technology={technology}
                                refreshPromptOptions={refreshPromptOptions}
                            />
                        </Stack>
                        <Divider />
                        <Group mt={"xs"} justify="space-between">
                            <Button px={0} variant="transparent" size="xs" leftSection={<IconReload style={{ width: rem(14), height: rem(14) }} />}>
                                Reset
                            </Button>
                            <Button px={0} variant="transparent" size="xs" leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />}>
                                Save Template
                            </Button>

                        </Group>
                    </Tabs.Panel>

                    <Tabs.Panel value="templates">
                        <Stack py={"md"} gap={"md"}>
                            {
                                templates.length > 0
                                    ?
                                    <Stack gap={"xs"}>
                                        {
                                            templates.map(template => {
                                                return (
                                                    <Group key={template.name} justify="space-between">
                                                        <Text size="sm">{template.name}</Text>
                                                        <Button leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />} variant="subtle" size="compact-xs">Use</Button>
                                                    </Group>
                                                )
                                            })
                                        }
                                    </Stack>
                                    : <Text>Not available yet</Text>
                            }
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Drawer>
            <Stack>
                <Group
                    wrap='nowrap'
                    align={'center'}
                    gap={'sm'}
                    pos={"absolute"}
                    bottom={"0"}
                    right={"0"}
                    w={"100%"}
                    py={"md"}
                    px={"md"}
                >
                    {
                        <Center
                            styles={{
                                root: {
                                    width: "100%",
                                    position: "absolute",
                                    left: "0",
                                    bottom: "80px"
                                }
                            }}
                        >
                            {
                                technology.name !== "" &&
                                <SelectedOptionsWidget
                                    technology={technology}
                                    provider={provider}
                                    parameters={[]}
                                    modifiers={[]}
                                />
                            }
                        </Center>
                    }
                    <ActionIcon
                        variant="subtle"
                        aria-label="Settings"
                        size="lg"
                        pos={"absolute"}
                        left={"25px"}
                        styles={{
                            root: {
                                zIndex: "1"
                            }
                        }}
                        onClick={open}
                    >
                        <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    {/* <ModeButton
                        promptOptions={promptOptions}
                        technology={technology}
                        technologies={technologies}
                        handleOnChangeTechnology={handleOnChangeTechnology}
                        provider={provider}
                        providers={providers}
                        handleOnChangeProvider={handleOnChangeProvider}
                        modifiers={modifiers}
                        activeModifiers={activeModifiers}
                        setActiveModifiers={setActiveModifiers}
                        userPromptOptions={userPromptOptions}
                        setUserPromptOptions={setUserPromptOptions}
                        parameters={parameters}
                        aIMediatorClient={aIMediatorClient}
                        refreshPromptOptions={refreshPromptOptions}

                    /> */}

                    <Textarea
                        placeholder={t("write_a_message")}
                        autosize
                        autoFocus
                        minRows={1}
                        maxRows={6}
                        w={"100%"}
                        size={'lg'}
                        styles={{
                            input: {
                                paddingLeft: "60px",
                                paddingRight: "50px",
                                backgroundColor: "var(--mantine-color-dark-9)"
                            }
                        }}
                        radius={'xl'}
                        value={userPrompt}
                        onChange={e => setUserPrompt(e.target.value)}
                        onKeyDown={submitPromptByTextArea}
                    />
                    <ActionIcon
                        variant="filled"
                        size="lg"
                        aria-label="Submit"
                        pos={"absolute"}
                        right={"25px"}
                        onClick={submitPrompt}
                    >
                        <IconPlayerPlayFilled style={{ width: '60%', height: '60%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Stack>
        </Box>
    )
}