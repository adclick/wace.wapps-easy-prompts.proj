import { Select, Menu, ActionIcon, Popover, Box, Badge, Button, Center, Divider, Drawer, Group, Indicator, Loader, ScrollAreaAutosize, Stack, Tabs, Text, Textarea, Title, Tooltip, rem, useComputedColorScheme } from "@mantine/core";
import { IconX, IconSparkles, IconAdjustmentsHorizontal, IconCheck, IconDeviceFloppy, IconPlayerPlayFilled, IconReload, IconSettings, IconTemplate, IconExclamationMark, IconLanguage, IconListSearch, IconPhoto, IconPencil, IconClipboardCheck, IconClipboardText, IconHeadphones, IconLayersSubtract } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import cx from 'clsx';
import { AIMediatorClient } from "../../../clients/AIMediatorClient";
import { UserPromptOptions } from "../../../model/UserPromptOptions";
import { Thread } from "../../../model/Thread";
import { useTranslation } from "react-i18next";
import { PromptOptions } from "../../../model/PromptOptions";
import { Technology } from "../../../model/Technology";
import { Provider } from "../../../model/Provider";
import { Modifier } from "../../../model/Modifier";
import { Parameter } from "../../../model/Parameter";
import { PromptOptionsPanel } from "../../Prompt/PromptOptionsPanel";
import { User } from "../../../model/User"
import { Repository } from "../../../model/Repository";
import { Language } from "../../../model/Language";
import { useState } from "react";
import { RepositoryItem } from "../../../model/RepositoryItem";
import { useFilters } from "../../../context/FiltersContext";
import { TechnologiesMenu } from "../../Layout/Menus/TechnologiesMenu/TechnologiesMenu";


interface ChatPrompt {
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
    refreshPromptOptions: any,
    user: User,
    repository: Repository,
    language: Language,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any,
    openRepositoryItemDetailsSelected: any
}

export function ChatPrompt({
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
    refreshPromptOptions,
    user,
    repository,
    language,
    repositorySelectedItems,
    setRepositorySelectedItems,
    openRepositoryItemDetailsSelected
}: ChatPrompt) {
    const { filters, setFilters } = useFilters();
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
                    <Stack w={"100%"} gap={6}>
                        {
                            repositorySelectedItems.length > 0 &&
                            repositorySelectedItems[0].type === "modifier" &&
                            <Center>
                                <Tooltip label={repositorySelectedItems[0].name}>
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
                                </Tooltip>
                            </Center>
                        }
                        <Group w={"100%"} wrap="nowrap">

                            <TechnologiesMenu
                                technology={technology}
                                handleOnChangeTechnology={handleOnChangeTechnology}
                            />

                            <Popover position="top-start">
                                <Popover.Target>
                                    <ActionIcon
                                        variant="subtle"
                                        aria-label="Settings"
                                        size="lg"
                                        pos={"absolute"}
                                        left={"70px"}
                                        styles={{
                                            root: {
                                                zIndex: "1"
                                            }
                                        }}
                                        onClick={open}
                                    >
                                        <Tooltip label="Adjust parameters">
                                            <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </Tooltip>

                                    </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown p={0}>
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
                                        paddingLeft: "100px",
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