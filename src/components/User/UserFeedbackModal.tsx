import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { Button, Group, Modal, Stack, Textarea, rem } from "@mantine/core";
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
    const [feedback, setFeedback] = useState("");

    const send = async () => {
        setFeedback('');

        userFeedbackModalHandle.close();
        
        await aiMediatorClient.sendFeedback('New Feedback', feedback);

        notifications.show({
            title: 'Feedback Sent',
            message: 'Thank you for your support!',
        })
    }

    return (
        <Modal size={"lg"} opened={userFeedbackModalOpened} onClose={userFeedbackModalHandle.close} title={"Give feedback"}>
            <Stack>
                <Textarea autosize autoFocus maxRows={10} minRows={5} value={feedback} onChange={e => setFeedback(e.target.value)} />
                <Group>
                    <Button
                        size="compact-md"
                        variant="transparent"
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