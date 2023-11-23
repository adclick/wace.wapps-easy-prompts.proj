import { Box, Button, Group, Modal, Stack, Textarea, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMail, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function FeedbackButton() {
    const { t } = useTranslation();
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
            <Button onClick={open} variant='transparent' leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}>
                {(t('give_feedback'))}
            </Button>
        </Box>
    )
}