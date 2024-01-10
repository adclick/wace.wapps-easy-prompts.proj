import { Button } from "@mantine/core";
import { IconPlus, IconTool, IconTools } from "@tabler/icons-react";

interface ThreadSaveButton {
    onClick: any
}

export function ThreadSaveButton({ onClick }: ThreadSaveButton) {
    return (
        <Button
            onClick={onClick}
            variant="filled"
            size="xs"
            leftSection={<IconPlus size={14} stroke={3} />}
        >
            Create
        </Button>
    )
}