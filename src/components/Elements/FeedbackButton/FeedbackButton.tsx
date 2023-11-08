import { Box, Button, Modal, Stack, Textarea, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMail } from "@tabler/icons-react";

export function FeedbackButton() {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Box>
            <Modal opened={opened} onClose={close} title={"Give feedback"}>
                <Stack>
                    <Textarea autosize maxRows={10} minRows={3} />
                    <Button>Send</Button>
                </Stack>

            </Modal>
            <Button onClick={open} variant='subtle' leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}>
                Give feedback
            </Button>
        </Box>
    )
}