import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { TextInput, Button, Group, Modal, Stack, Textarea, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSend } from "@tabler/icons-react";
import { useState } from "react";

interface UserFeedbackModal {
    userFeedbackModalOpened: boolean,
    userFeedbackModalHandle: any,
    aiMediatorClient: AIMediatorClient
}

export function UserFeedbackModal({
    userFeedbackModalOpened,
    userFeedbackModalHandle,
    aiMediatorClient
}: UserFeedbackModal) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [feedback, setFeedback] = useState("");

    const send = async () => {
        await aiMediatorClient.sendFeedback(title, description);

        userFeedbackModalHandle.close();
        
        setTitle("");
        setDescription("");

        notifications.show({
            title: 'Feedback Sent',
            message: 'Thank you for your support!',
        })
    }

    return (
        <Modal size={"lg"} opened={userFeedbackModalOpened} onClose={userFeedbackModalHandle.close} title={"Give feedback"}>
            <Stack>
                <TextInput
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Give a name to your feedback"
                />
                <Textarea
                    autosize
                    autoFocus
                    maxRows={10}
                    minRows={5}
                    placeholder="Write your feedback here"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <Group>
                    <Button
                        size="compact-md"
                        variant="subtle"
                        leftSection={<IconSend style={{ width: rem(14), height: rem(14) }} />}
                        onClick={send}
                    >
                        Send
                    </Button>
                </Group>
            </Stack>

        </Modal>
    )
}