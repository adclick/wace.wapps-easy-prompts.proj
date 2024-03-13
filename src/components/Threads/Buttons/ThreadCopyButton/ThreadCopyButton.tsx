import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface ThreadCopyButton {
    value: string,
}
export function ThreadCopyButton({ value }: ThreadCopyButton) {
    return (
        <CopyButton value={value} timeout={2000}>
            {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'}>
                    <ActionIcon color="gray" variant="transparent" onClick={copy}>
                        {copied ? (
                            <IconCheck size={12} stroke={3} />
                        ) : (
                            <IconCopy size={12} stroke={3} />
                        )}
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    )
}