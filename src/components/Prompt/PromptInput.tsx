import { ActionIcon, Box, Button, Center, Divider, Drawer, Group, Indicator, Loader, ScrollAreaAutosize, Stack, Tabs, Text, Textarea, Title, Tooltip, rem, useComputedColorScheme } from "@mantine/core";
import { IconAdjustmentsHorizontal, IconCheck, IconDeviceFloppy, IconPlayerPlayFilled, IconReload, IconSettings, IconTemplate } from "@tabler/icons-react";
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
    refreshPromptOptions: any
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
    refreshPromptOptions
}: PromptInput) {
    const { t } = useTranslation();
    const [opened, { open, close }] = useDisclosure(false);
    const computedColorScheme = useComputedColorScheme('dark');

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
            />
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
                    {/* {
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
                    } */}
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
                        {
                            activeModifiers.length > 0
                                ? <Indicator label={activeModifiers.length} size={16}>
                                    <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                </Indicator>
                                :
                                <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />

                        }
                    </ActionIcon>

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
                            }

                        }}
                        radius={'xl'}
                        value={userPrompt}
                        onChange={e => setUserPrompt(e.target.value)}
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
                        <IconPlayerPlayFilled style={{ width: '60%', height: '60%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Stack>
        </Box>
    )
}