import { ActionIcon, Avatar, Box, Button, Card, CopyButton, Group, Loader, Menu, Popover, Stack, Text, Tooltip, em, rem } from "@mantine/core";
import { IconCheck, IconDownload, IconCopy, IconDotsVertical, IconMoodSad, IconMoodSadFilled, IconMoodSmile, IconMoodSmileFilled, IconPrompt, IconSparkles, IconTemplate, IconTrash, IconThumbUp } from "@tabler/icons-react";
import { useState } from "react";
import { SelectedOptionsWidget } from "../../Prompt/SelectedOptionsWidget";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Repository } from "../../../model/Repository";
import { User } from "../../../model/User";
import { Thread } from "../../../model/Thread";

interface ChatMessage {
    thread: Thread,
    threads: Thread[],
    setThreads: any,
    threadIndex: number,
    user: User,
}

export function ChatMessage({
    thread,
    threads,
    setThreads,
    threadIndex,
    user,
}: ChatMessage) {
    const [result, setResult] = useState(<Loader size={"sm"} type="dots" />);
    const [responseAsText, setResponseAsText] = useState('');
    const [vote, setVote] = useState(0);
    const [savePromptModalOpened, savePromptModalHandle] = useDisclosure(false);

    const deleteThread = () => {
        setThreads(threads.filter((t, i) => i !== threadIndex));
    }

    // Once loaded, get the response from the user request

    const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

    return (
        <Card mx={isMobile ? "0" : "xl"} radius={isMobile ? "0" : "lg"} p={"md"} shadow="sm">
            <Stack gap={0}>
                {
                    thread.request.intro === false &&
                    <Box py={"xs"}>
                        <Group justify="space-between">
                            <Group>
                                <Avatar src={user?.picture} size={"sm"} />
                                <Text size="md" style={{ whiteSpace: "pre-line" }}>
                                    {request.text}
                                </Text>
                            </Group>
                            <Group>
                                <SelectedOptionsWidget
                                    technology={request.userPromptOptions.technology}
                                    provider={request.userPromptOptions.provider}
                                    parameters={request.userPromptOptions.parameters}
                                    modifiers={request.userPromptOptions.modifiers}
                                />
                            </Group>
                        </Group>
                    </Box>
                }
                <Box py={"xl"} px={0}>
                    <Group justify="space-between" wrap="wrap" align="flex-start" gap={"xl"}>
                        <Group align="flex-start">
                            <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                            {result}
                        </Group>
                    </Group>
                </Box>
            </Stack>
            <Card.Section inheritPadding mt={"lg"} mb={0}>
                <Group justify="space-between" wrap="wrap">
                    {
                        request.intro ?
                            <Button
                                onClick={confirmIntro}
                                variant="subtle"
                                size="xs"
                                leftSection={<IconThumbUp style={{ width: rem(16), height: rem(16) }} />}
                            >
                                Got it!
                            </Button>
                            :
                            <Group gap={"xs"} wrap="nowrap">
                                <Tooltip label="Good Response" withArrow>
                                    <ActionIcon disabled variant='subtle'>
                                        {
                                            vote > 0
                                                ? <IconMoodSmileFilled size={"16"} />
                                                : <IconMoodSmile size={"16"} />
                                        }
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Bad Response" withArrow>
                                    <ActionIcon disabled color='red' variant='subtle'>
                                        {
                                            vote < 0
                                                ? <IconMoodSadFilled size={"16"} />
                                                : <IconMoodSad size={"16"} />
                                        }
                                    </ActionIcon>
                                </Tooltip>
                                <CopyButton value={responseAsText} timeout={2000}>
                                    {({ copied, copy }) => (
                                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
                                            <ActionIcon color={copied ? 'blue' : 'gray'} variant="subtle" onClick={copy}>
                                                {copied ? (
                                                    <IconCheck size={16} />
                                                ) : (
                                                    <IconCopy size={16} />
                                                )}
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                </CopyButton>

                                <Menu withinPortal position="top" shadow="sm">
                                    <Menu.Target>
                                        <ActionIcon variant="subtle" color="gray">
                                            <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Item onClick={savePromptModalHandle.open} leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
                                            Save Prompt
                                        </Menu.Item>
                                        <Menu.Item color="red" onClick={deleteThread} leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                                            Delete this card
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                    }

                    <Group>
                        {
                            request.repositoryItems.length
                            &&
                            <Popover position="top">
                                <Popover.Target>
                                    <ActionIcon
                                        variant="subtle"
                                        color={request.repositoryItems[0].color}
                                    >
                                        {
                                            request.repositoryItems[0].type === "prompt" && <IconPrompt size={16} />
                                        }
                                        {
                                            request.repositoryItems[0].type === "template" && <IconTemplate size={16} />
                                        }
                                        {
                                            request.repositoryItems[0].type === "modifier" && <IconSparkles size={16} />
                                        }
                                    </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Text size="xs">{request.repositoryItems[0].name}</Text>
                                </Popover.Dropdown>
                            </Popover>
                        }
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}