import { ActionIcon, Avatar, Button, Card, Center, Divider, Group, Loader, Space, Stack, Text, Textarea } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import favicon from "../../../favicon.svg";
import { PromptRequest } from "../../../model/PromptRequest";
import { IconArrowBackUp, IconPlayerPlayFilled, IconPlus, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ChatSavePromptModal } from "../ChatSavePromptModal/ChatSavePromptModal";
import { useEffect, useState } from "react";
import { chat } from "../../../api/aiApi";
import { Technology } from "../../../model/Technology";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";

interface ChatCard {
    promptRequest: PromptRequest,
    deleteThread: any
}

interface Message {
    id: number,
    request: string,
    response: string
}

export function ChatCard({ promptRequest, deleteThread }: ChatCard) {
    const { user } = useUser();
    const [newPromptModalOpened, newPromptModaHandle] = useDisclosure(false);
    const [replyOpened, replyHandle] = useDisclosure(false);
    const [replyValue, setReplyValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const updateMessages = (id: number, request: string, response: string) => {
        const exists = messages[id];

        if (exists) {
            exists.request = request;
            exists.response = response;
            messages[id] = exists;
            setMessages(messages);
            return;
        }

        setMessages([
            ...messages,
            {
                id: messages.length,
                request,
                response
            }
        ]);
    }

    useEffect(() => {
        if (messages.length === 0) {
            const message: Message = {
                id: messages.length,
                request: promptRequest.content,
                response: ""
            };
            updateMessages(message.id, message.request, "");
            fetch(message);
            return;
        }
    });

    const fetch = async (message: Message) => {
        try {
            const history = messages.filter(m => m.response !== "");

            const response = await chat(message.request, promptRequest.provider.id, history);

            updateMessages(message.id, message.request, response);
        } catch (error) {
            console.error(error);
        }
    }

    const save = () => {

    }

    const reply = () => {
        const message: Message = {
            id: messages.length,
            request: replyValue,
            response: ""
        };

        updateMessages(message.id, message.request, "");
        fetch(message);

        replyHandle.close();
        setReplyValue("");
    }

    return (
        <>
            <ChatSavePromptModal opened={newPromptModalOpened} handle={newPromptModaHandle} request={promptRequest} />
            <Card p={"lg"} shadow="sm" mx={"md"}>
                <Stack gap={"xl"}>
                    <ThreadHeader promptRequest={promptRequest} deleteThread={deleteThread} />
                    {
                        messages.map(message => {
                            return (
                                <Stack key={message.id} gap={"xl"}>
                                    <Group align="flex-start" wrap="nowrap">
                                        <Avatar src={user.picture} size={"sm"} />
                                        <Stack gap={"xs"}>
                                            <Text size="sm" fw={700}>{user.username}</Text>
                                            <Text size="sm" style={{ whiteSpace: "pre-line" }}>
                                                {message.request}
                                            </Text>
                                        </Stack>
                                    </Group>
                                    <Group w={"100%"} align="flex-start" wrap="nowrap">
                                        <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                                        <Stack gap={"xs"}>
                                            <Text size="sm" fw={700}>EasyPrompts</Text>
                                            {
                                                message.response === ""
                                                    ? <Center><Loader size={"xs"} type="bars" mt={"lg"} /></Center>
                                                    : <Text size="sm" style={{ whiteSpace: "pre-line" }}>{message.response}</Text>
                                            }
                                        </Stack>
                                    </Group>
                                </Stack>
                            )
                        })
                    }
                    <Stack>
                        {
                            replyOpened &&
                            <Group>
                                <Textarea
                                    placeholder="Write a message"
                                    autosize
                                    autoFocus
                                    minRows={1}
                                    maxRows={6}
                                    w={"100%"}
                                    styles={{
                                        input: {
                                            paddingRight: "50px",
                                        },

                                    }}
                                    radius={"xl"}
                                    value={replyValue}
                                    onChange={e => setReplyValue(e.target.value)}
                                />
                                <ActionIcon
                                    variant="filled"
                                    pos={"absolute"}
                                    right={"25px"}
                                    onClick={reply}
                                >
                                    <IconPlayerPlayFilled size={14} stroke={1.5} />
                                </ActionIcon>
                            </Group>
                        }
                        <Group justify="space-between">
                            <Group>
                                <Button
                                    onClick={newPromptModaHandle.open}
                                    variant="subtle"
                                    size="xs"
                                    leftSection={<IconPlus size={14} />}
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={replyHandle.toggle}
                                    variant="subtle"
                                    size="xs"
                                    leftSection={<IconArrowBackUp size={14} />}
                                >
                                    Reply
                                </Button>
                            </Group>
                            <Group gap={6}>
                                <Button size="xs" variant="subtle" leftSection={Technology.getIcon(promptRequest.technology.slug, 14)}>
                                    {promptRequest.provider.name}
                                </Button>
                            </Group>
                        </Group>
                    </Stack>
                </Stack>
            </Card>
        </>
    )
}