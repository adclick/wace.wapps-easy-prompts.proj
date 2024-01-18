import { ActionIcon, Tooltip } from "@mantine/core"
import { IconReload } from "@tabler/icons-react"

interface ThreadReloadButton {
    reload: any
}

export function ThreadReloadButton({ reload }: ThreadReloadButton) {
    return (
        <Tooltip label="Regenerate">
            <ActionIcon onClick={reload} variant="transparent" color="gray">
                <IconReload size={12} stroke={3} />
            </ActionIcon>
        </Tooltip>
    )
}