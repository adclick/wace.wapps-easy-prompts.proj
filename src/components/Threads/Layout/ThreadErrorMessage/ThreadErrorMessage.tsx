import { Group, Stack } from "@mantine/core";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";

interface ThreadErrorMessage {
    message: string,
    reloadFn: any
}

export function ThreadErrorMessage({ message, reloadFn}: ThreadErrorMessage) {
    return (
        <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
            {message}
            <Group gap={"xs"}>
                <ThreadReloadButton reload={reloadFn} />
            </Group>
        </Stack>
    )
}