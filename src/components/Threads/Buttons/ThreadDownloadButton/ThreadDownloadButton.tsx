import { ActionIcon, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

interface ThreadDownloadButton {
    url: string
}

export function ThreadDownloadButton({ url }: ThreadDownloadButton) {
    return (
        <Tooltip label="Download">
            <ActionIcon
                component="a"
                href={url}
                variant="transparent"
                color="gray"
                target="_blank"
            >
                <IconDownload size={12} stroke={3} />
            </ActionIcon>
        </Tooltip>
    )
}