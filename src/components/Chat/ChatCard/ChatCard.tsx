import { ActionIcon, Avatar, Button, Card, Center, Group, Loader, Stack, Text, Textarea } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import favicon from "../../../favicon.svg";
import { PromptRequest } from "../../../model/PromptRequest";
import { IconPlayerPlayFilled, IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ChatSavePromptModal } from "../ChatSavePromptModal/ChatSavePromptModal";
import { useEffect, useState } from "react";
import { chat } from "../../../api/aiApi";

interface ChatCard {
    promptRequest: PromptRequest,
}

interface Message {
    id: number,
    request: string,
    response: string
}

export function ChatCard({ promptRequest }: ChatCard) {
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
            fetch(message)
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
            <Card p={"md"} shadow="sm">
                <Stack gap={"xl"}>
                    {
                        messages.map(message => {
                            return (
                                <Stack key={message.id}>
                                    <Stack py={"xs"}>
                                        <Group>
                                            <Avatar src={user.picture} size={"sm"} />
                                            <Text>{user.username}</Text>
                                        </Group>
                                        <Text style={{ whiteSpace: "pre-line" }}>
                                            {message.request}
                                        </Text>
                                    </Stack>
                                    <Stack>
                                        <Group>
                                            <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                                            <Text>EasyPrompts</Text>
                                        </Group>
                                        {
                                            message.response === ""
                                                ? <Center><Loader size={"xs"} type="bars" /></Center>
                                                : <Text style={{ whiteSpace: "pre-line" }}>{message.response}</Text>
                                        }
                                    </Stack>
                                </Stack>
                            )
                        })
                    }
                    <Stack>
                        {
                            promptRequest.technology.slug === "chat" && replyOpened &&
                            <Group>
                                <Textarea
                                    autosize
                                    autoFocus
                                    minRows={1}
                                    maxRows={6}
                                    w={"100%"}
                                    size={'lg'}
                                    radius={'xl'}
                                    value={replyValue}
                                    onChange={e => setReplyValue(e.target.value)}
                                />
                                <ActionIcon
                                    variant="filled"
                                    size="lg"
                                    pos={"absolute"}
                                    right={"25px"}
                                    onClick={reply}
                                >
                                    <IconPlayerPlayFilled size={16} stroke={1.5} />
                                </ActionIcon>
                            </Group>
                        }
                        <Group>
                            <Button
                                onClick={newPromptModaHandle.open}
                                variant="subtle"
                                leftSection={<IconPlus size={14} />}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={replyHandle.toggle}
                                variant="subtle"
                            >
                                Reply
                            </Button>
                        </Group>
                    </Stack>
                </Stack>
            </Card>
        </>
    )
}