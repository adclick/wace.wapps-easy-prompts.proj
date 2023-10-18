import { EasyPromptsApiClient } from "@/clients/EasyPromptsApiClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ActionIcon, Box, Center, Group, Input, List, Loader, Modal, Stack, Textarea, ThemeIcon, Tooltip, VisuallyHidden } from "@mantine/core";
import { IconArrowRight, IconCircleCheck, IconCircleDashed, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Request } from "../RequestsPanel/Request";

interface PromptParams {
    apiClient: EasyPromptsApiClient,
    userPromptOptions: UserPromptOptions,
    requests: Request[],
    setRequests: any,
    setRequestLoading: any,
    requestLoading: boolean,
    scrollIntoView: any
}

export function Prompt({ apiClient, userPromptOptions, setRequestLoading, requests, setRequests, requestLoading, scrollIntoView }: PromptParams) {
    const [userPrompt, setUserPrompt] = useState("");
    const [openedPrompts, { open, close }] = useDisclosure(false);

    // Submit prompt
    const submitPrompt = async () => {
        if (userPrompt.length <= 0) return;

        setRequestLoading(true);
        setUserPrompt("");

        const result = await apiClient.submitPrompt(userPrompt, userPromptOptions);
        console.log(result);
        const request: Request = {
            id: requests.length + 1,
            prompt: userPrompt,
            result: result
        };
        setRequests([...requests, request]);

        setRequestLoading(false);

        scrollIntoView({});
    }

    const submitPromptByTextArea = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            await submitPrompt();
        }
    }

    return (
        <Box>
            <Modal
                size={"xl"}
                opened={openedPrompts}
                onClose={close}
                title={"Optimized Prompts"}
                transitionProps={{
                    duration: 100
                }}
            >
                <Stack gap={"md"}>
                    <Input placeholder="Search" leftSection={<IconSearch size={16} />} />
                    <List
                        spacing="xs"
                        size="sm"
                        center
                        icon={
                            <ThemeIcon color="teal" size={24} radius="xl">
                                <IconCircleCheck size="1rem" />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>Clone or download repository from GitHub</List.Item>
                        <List.Item>Install dependencies with yarn</List.Item>
                        <List.Item>To start development server run npm start command</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item
                            icon={
                                <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconCircleDashed size="1rem" />
                                </ThemeIcon>
                            }
                        >
                            Submit a pull request once you are done
                        </List.Item>
                    </List>
                </Stack>

            </Modal>
            <Stack>
                <Group
                    wrap='nowrap'
                    align={'center'}
                    gap={'sm'}
                    pos={"absolute"}
                    bottom={"0"}
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
                        placeholder="Ask me something"
                        autosize
                        disabled={requestLoading}
                        autoFocus
                        minRows={1}
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