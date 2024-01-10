import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface ThreadSaveButton {
    onClick: any
}

export function ThreadSaveButton({ onClick }: ThreadSaveButton) {
    return (
        <Button
            onClick={onClick}
            variant="subtle"
            size="xs"
            leftSection={<IconPlus size={14} />}
        >
            Save
        </Button>
    )
}