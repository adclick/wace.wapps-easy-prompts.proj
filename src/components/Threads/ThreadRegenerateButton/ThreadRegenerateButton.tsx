import { Button } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

export function ThreadRegenerateButton() {
    return (
        <Button
            variant="subtle"
            size="xs"
            leftSection={<IconReload size={14} />}
        >
            Regenerate
        </Button>
    )
}