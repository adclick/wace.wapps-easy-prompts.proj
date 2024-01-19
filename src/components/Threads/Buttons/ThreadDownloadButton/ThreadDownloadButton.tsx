import { ActionIcon, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

interface ThreadDownloadButton {
    url: string
}

export function ThreadDownloadButton({ url }: ThreadDownloadButton) {
    console.log(url);
    return (
        <Tooltip label="Download">
            <ActionIcon
                component="a"
                href={url}
                variant="transparent"
                color="gray"
            >
                <IconDownload size={12} stroke={3} />
            </ActionIcon>
        </Tooltip>
    )
}