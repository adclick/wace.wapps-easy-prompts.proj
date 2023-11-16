import { ActionIcon, Box, Center, Group, Loader, Stack, Text, Textarea, Tooltip } from "@mantine/core";
import { IconArrowRight, IconList } from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { PromptsModal } from "./PromptsModal";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Thread } from "../../model/Thread";
import { useTranslation } from "react-i18next";

interface PromptParams {
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setRequestLoading: any,
    requestLoading: boolean,
    scrollIntoView: any,
    threads: Thread[],
    setThreads: any
}

export function Prompt({
    aIMediatorClient,
    userPromptOptions,
    setRequestLoading,
    requestLoading,
    scrollIntoView,
    threads,
    setThreads
}: PromptParams) {
    const { t } = useTranslation();
    const [userPrompt, setUserPrompt] = useState("");
    const [openedPrompts, { open, close }] = useDisclosure(false);

    // Submit prompt
    const submitPrompt = async () => {
        if (userPrompt.length <= 0) return;

        setRequestLoading(true);
        setUserPrompt("");

        const thread = new Thread();
        thread.request.setText(userPrompt)

        setThreads([...threads, thread]);

        setRequestLoading(false);
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
            <PromptsModal openedPrompts={openedPrompts} close={close} />
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
                        requestLoading &&
                        <Center
                            styles={{
                                root: {
                                    width: "100%",
                                    position: "absolute",
                                    left: "0",
                                    bottom: "100px"
                                }
                            }}
                        >
                            <Loader size={"sm"} type="bars" />
                        </Center>
                    }
                    <ActionIcon
                        variant="filled"
                        size="lg"
                        disabled={requestLoading}
                        aria-label="Submit"
                        pos={"absolute"}
                        left={"25px"}
                        styles={{
                            root: {
                                zIndex: "1"
                            }
                        }}
                        onClick={open}
                    >
                        <IconList style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>

                    <Textarea
                        placeholder={t("write_a_message")}
                        autosize
                        autoFocus
                        disabled={requestLoading}
                        minRows={1}
                        maxRows={6}
                        w={"100%"}
                        size={'lg'}
                        styles={{
                            input: {
                                paddingLeft: "60px",
                                paddingRight: "50px"
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
                        disabled={requestLoading}
                        aria-label="Submit"
                        pos={"absolute"}
                        right={"25px"}
                        onClick={submitPrompt}
                    >
                        <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Stack>
        </Box>
    )
}