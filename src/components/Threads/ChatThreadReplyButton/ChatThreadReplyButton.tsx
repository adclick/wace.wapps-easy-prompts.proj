import { Button } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";

interface ChatThreadReplyButton {
    onClick: any
}

export function ChatThreadReplyButton({ onClick }: ChatThreadReplyButton) {
    return (
        <Button
            onClick={onClick}
            variant="subtle"
            size="xs"
            leftSection={<IconArrowBackUp size={14} />}
        >
            Reply
        </Button>
    )
}