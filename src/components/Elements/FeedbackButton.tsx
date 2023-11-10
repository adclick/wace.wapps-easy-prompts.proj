import { Box, Button, Modal, Stack, Textarea, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMail } from "@tabler/icons-react";
import { useState } from "react";

export function FeedbackButton() {
    const [opened, { open, close }] = useDisclosure(false);
    const [feedback, setFeedback] = useState("");

    const send = () => {
        console.log('sending', feedback);
    }

    return (
        <Box>
            <Modal size={"lg"} opened={opened} onClose={close} title={"Give feedback"}>
                <Stack>
                    <Textarea autosize maxRows={10} minRows={5} value={feedback} onChange={e => setFeedback(e.target.value)} />
                    <Button onClick={send}>Send</Button>
                </Stack>

            </Modal>
            <Button onClick={open} variant='subtle' leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}>
                Give feedback
            </Button>
        </Box>
    )
}