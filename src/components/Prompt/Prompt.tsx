import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ActionIcon, Box, Center, Group, Input, List, Loader, Modal, Stack, Textarea, ThemeIcon, Tooltip, VisuallyHidden } from "@mantine/core";
import { IconArrowRight, IconCircleCheck, IconCircleDashed, IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useDisclosure, useFocusReturn, useFocusTrap, useMergedRef } from "@mantine/hooks";
import { Request } from "../RequestsPanel/Request";
import { PromptsModal } from "./PromptsModal";

interface PromptParams {
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    requests: Request[],
    setRequests: any,
    setRequestLoading: any,
    requestLoading: boolean,
    scrollIntoView: any
}

export function Prompt({ aIMediatorClient, userPromptOptions, setRequestLoading, requests, setRequests, requestLoading, scrollIntoView }: PromptParams) {
    const [userPrompt, setUserPrompt] = useState("");
    const [openedPrompts, { open, close }] = useDisclosure(false);

    // Submit prompt
    const submitPrompt = async () => {
        if (userPrompt.length <= 0) return;

        setRequestLoading(true);
        setUserPrompt("");

        const result = await aIMediatorClient.submitPrompt(userPrompt, userPromptOptions);
        const request: Request = {
            id: requests.length + 1,
            userPrompt,
            userPromptOptions,
            result
        };
        setRequests([...requests, request]);
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
                    <Tooltip label="Search Optimized Prompts">
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
                            <IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>

                    <Textarea
                        placeholder="Ask me anything"
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