import { Button, Group, Modal, Stack, Textarea, rem } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useState } from "react";

interface UserFeedbackModal {
    userFeedbackModalOpened: boolean
    userFeedbackModalHandle: any
}

export function UserFeedbackModal({
    userFeedbackModalOpened,
    userFeedbackModalHandle
}: UserFeedbackModal) {
    const [feedback, setFeedback] = useState("");

    const send = () => {
        console.log('sending', feedback);
    }

    return (
        <Modal size={"lg"} opened={userFeedbackModalOpened} onClose={userFeedbackModalHandle.close} title={"Give feedback"}>
            <Stack>
                <Textarea autosize maxRows={10} minRows={5} value={feedback} onChange={e => setFeedback(e.target.value)} />
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