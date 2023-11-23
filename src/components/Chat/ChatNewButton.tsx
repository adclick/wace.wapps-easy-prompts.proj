import { ActionIcon, Button, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface ChatNewButton {
    resetChat: any
}

export function ChatNewButton({resetChat}: ChatNewButton) {
    return (
        // <ActionIcon size={"lg"}>
        //     <IconPlus />
        // </ActionIcon>

        <Button
            leftSection={<IconPlus style={{ width: rem(18), height: rem(18) }} />}
            variant="subtle"
            onClick={resetChat}
            size="md"
        >
            New Chat
        </Button>
    )
}