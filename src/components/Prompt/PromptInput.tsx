import { Select, Menu, ActionIcon, Popover, Box, Badge, Button, Center, Divider, Drawer, Group, Indicator, Loader, ScrollAreaAutosize, Stack, Tabs, Text, Textarea, Title, Tooltip, rem, useComputedColorScheme } from "@mantine/core";
import { IconX, IconSparkles, IconAdjustmentsHorizontal, IconCheck, IconDeviceFloppy, IconPlayerPlayFilled, IconReload, IconSettings, IconTemplate, IconExclamationMark, IconLanguage, IconListSearch, IconPhoto, IconPencil, IconClipboardCheck, IconClipboardText, IconHeadphones, IconLayersSubtract } from "@tabler/icons-react";
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
import { User } from "../../model/User"
import { Repository } from "../../model/Repository";
import { Language } from "../../model/Language";
import { useState } from "react";
import { Filters } from "../../model/Filters";
import { RepositoryItem } from "../../model/RepositoryItem";
import { useFilters } from "../../context/FiltersContext";


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
    refreshPromptOptions: any,
    user: User,
    repository: Repository,
    language: Language,
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
    refreshPromptOptions,
    user,
    repository,
    language,
    repositorySelectedItems,
    setRepositorySelectedItems,
    openRepositoryItemDetailsSelected
}: PromptInput) {
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

                            <Menu shadow="md" position='bottom-start'>
                                <Menu.Target>
                                    <Tooltip label="Switch mode">

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
                                        >
                                            {
                                                Technology.getIcon(technology.slug, "70%")
                                            }
                                        </ActionIcon>
                                    </Tooltip>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item
                                        onClick={() => handleOnChangeTechnology('text-generation')}
                                        rightSection={
                                            technology.slug === "text-generation" &&
                                            <IconCheck style={{ width: rem(14), height: rem(14) }} />
                                        }
                                        leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                        Text Generation
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => handleOnChangeTechnology('image-generation')}
                                        rightSection={
                                            technology.slug === "image-generation" &&
                                            <IconCheck style={{ width: rem(14), height: rem(14) }} />
                                        }
                                        leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                        Image Generation
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => handleOnChangeTechnology('keywords-extraction')}
                                        rightSection={
                                            technology.slug === "keywords-extraction" &&
                                            <IconCheck style={{ width: rem(14), height: rem(14) }} />
                                        }
                                        leftSection={<IconListSearch style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                        Keywords Extraction
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => handleOnChangeTechnology('translation')}
                                        rightSection={
                                            technology.slug === "translation" &&
                                            <IconCheck style={{ width: rem(14), height: rem(14) }} />
                                        }
                                        leftSection={<IconLanguage style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                        Translation
                                    </Menu.Item>
                                    <Menu.Item
                                        disabled
                                        rightSection={
                                            technology.slug === "topic-extraction" &&
                                            <IconCheck style={{ width: rem(14), height: rem(14) }} />
                                        }
                                        leftSection={<IconLayersSubtract style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                        Topic Extraction
                                    </Menu.Item>
                                    <Menu.Item
                                        disabled
                                        rightSection={
                                            technology.slug === "summarization" &&
                                            <IconCheck style={{ width: rem(14), height: rem(14) }} />
                                        }
                                        leftSection={<IconClipboardText style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                        Summarize
                                    </Menu.Item>
                                    <Menu.Item
                                        disabled
                                        rightSection={
                                            technology.slug === "text-to-speech" &&
                                            <IconCheck style={{ width: rem(14), height: rem(14) }} />
                                        }
                                        leftSection={<IconHeadphones style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                        Text to Speech
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>

                            <Popover position="top-start" classNames={{
                                dropdown: cx(computedColorScheme)
                            }}>
                                <Popover.Target>
                                    <Tooltip label="Adjust parameters">
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
                                            {
                                                activeModifiers.length > 0
                                                    ? <Indicator label={activeModifiers.length} size={16}>
                                                        <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                                    </Indicator>
                                                    :
                                                    <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />

                                            }
                                        </ActionIcon>
                                    </Tooltip>
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