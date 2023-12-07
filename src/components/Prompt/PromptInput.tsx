import { ActionIcon, Popover, Box, Badge, Button, Center, Divider, Drawer, Group, Indicator, Loader, ScrollAreaAutosize, Stack, Tabs, Text, Textarea, Title, Tooltip, rem, useComputedColorScheme } from "@mantine/core";
import { IconX, IconSparkles, IconAdjustmentsHorizontal, IconCheck, IconDeviceFloppy, IconPlayerPlayFilled, IconReload, IconSettings, IconTemplate } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import cx from 'clsx';
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Thread } from "../../model/Thread";
import { useTranslation } from "react-i18next";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { Modifier } from "../../model/Modifier";
import { Parameter } from "../../model/Parameter";
import { PromptOptionsPanel } from "./PromptOptionsPanel";
import { SelectedOptionsWidget } from "./SelectedOptionsWidget";
import { User } from "../../model/User"
import { Repository } from "../../model/Repository";
import { Language } from "../../model/Language";
import { useState } from "react";
import { Filters } from "../../model/Filters";
import { RepositoryItem } from "../../model/RepositoryItem";


interface PromptInput {
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
    refreshPromptOptions: any,
    user: User,
    repository: Repository,
    language: Language,
    filters: Filters,
    setFilters: any,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any,
    openRepositoryItemDetailsSelected: any
}

export function PromptInput({
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
    refreshPromptOptions,
    user,
    repository,
    language,
    filters,
    setFilters,
    repositorySelectedItems,
    setRepositorySelectedItems,
    openRepositoryItemDetailsSelected
}: PromptInput) {
    const { t } = useTranslation();
    const [opened, { open, close }] = useDisclosure(false);
    const computedColorScheme = useComputedColorScheme('dark');
    const [value, setValue] = useState('');

    // Submit prompt
    const submitPrompt = async () => {
        if (value.length <= 0) return;

        setValue("");

        // Deep copy
        const threadUserOptions = JSON.parse(JSON.stringify(userPromptOptions));
        const thread = new Thread();
        thread.request.setText(value);
        thread.request.setUserPromptOptions(threadUserOptions);

        const modifier = repositorySelectedItems.find(i => i.type === 'modifier');
        if (modifier !== undefined) {
            thread.request.repositoryItems = [modifier];
        }

        setThreads([...threads, thread]);

        scrollIntoView({ alignment: 'start' });
    }

    const submitPromptByTextArea = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            await submitPrompt();
        }
    }

    return (
        <Box>
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
                    <Stack w={"100%"} gap={"xs"}>
                        {/* <Center>
                            {
                                technology.name !== "" &&
                                <SelectedOptionsWidget
                                    technology={technology}
                                    provider={provider}
                                    parameters={[]}
                                    modifiers={[]}
                                />
                            }
                        </Center> */}
                        {
                            repositorySelectedItems.length > 0 &&
                            repositorySelectedItems[0].type === "modifier" &&
                            <Center>
                                <Group gap={0}>
                                    <Button
                                        leftSection={<IconSparkles size={16} />}
                                        onClick={() => openRepositoryItemDetailsSelected(repositorySelectedItems[0])}
                                        size="compact-xs"
                                        variant="light"
                                        color={repositorySelectedItems[0].color}
                                    >
                                        Using {repositorySelectedItems.length} modifier(s)
                                    </Button>
                                    <ActionIcon onClick={() => setRepositorySelectedItems([])} variant="transparent" color={repositorySelectedItems[0].color} >
                                        <IconX size={14} />
                                    </ActionIcon>
                                </Group>
                            </Center>
                        }
                        <Group w={"100%"} wrap="nowrap">

                            <Popover position="top-start" classNames={{
                                dropdown: cx(computedColorScheme)
                            }}>
                                <Popover.Target>
                                    <ActionIcon
                                        variant="subtle"
                                        aria-label="Settings"
                                        size="lg"
                                        pos={"absolute"}
                                        left={"30px"}
                                        styles={{
                                            root: {
                                                zIndex: "1"
                                            }
                                        }}
                                        onClick={open}
                                    >
                                        {
                                            activeModifiers.length > 0
                                                ? <Indicator label={activeModifiers.length} size={16}>
                                                    <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                                </Indicator>
                                                :
                                                <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />

                                        }
                                    </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown p={"xs"}>
                                    <PromptOptionsPanel
                                        drawerOpened={opened}
                                        closeDrawer={close}
                                        promptOptions={promptOptions}
                                        technology={technology}
                                        technologies={technologies}
                                        handleOnChangeTechnology={handleOnChangeTechnology}
                                        provider={provider}
                                        providers={providers}
                                        handleOnChangeProvider={handleOnChangeProvider}
                                        parameters={parameters}
                                        userPromptOptions={userPromptOptions}
                                        setUserPromptOptions={setUserPromptOptions}
                                        modifiers={modifiers}
                                        activeModifiers={activeModifiers}
                                        setActiveModifiers={setActiveModifiers}
                                        aIMediatorClient={aIMediatorClient}
                                        refreshPromptOptions={refreshPromptOptions}
                                        user={user}
                                        repository={repository}
                                        language={language}
                                        filters={filters}
                                        setFilters={setFilters}
                                    />
                                </Popover.Dropdown>
                            </Popover>

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
                                    },

                                }}
                                radius={'xl'}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                onKeyDown={submitPromptByTextArea}
                                classNames={{
                                    input: cx(computedColorScheme)
                                }}
                            />
                            <ActionIcon
                                variant="filled"
                                size="lg"
                                aria-label="Submit"
                                pos={"absolute"}
                                right={"25px"}
                                onClick={submitPrompt}
                            >
                                <IconPlayerPlayFilled style={{ width: '50%', height: '50%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Stack>
                </Group>
            </Stack>
        </Box>
    )
}