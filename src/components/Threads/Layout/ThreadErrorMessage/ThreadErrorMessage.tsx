import { Group, Stack } from "@mantine/core";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";
import { AxiosError } from "axios";

interface ThreadErrorMessage {
    error: Error|AxiosError,
    reloadFn: any
}

export function ThreadErrorMessage({ error, reloadFn }: ThreadErrorMessage) {
    let message = error instanceof AxiosError ? error.response?.data.message : error.message;

    return (
        <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
            {message}
            <ThreadReloadButton reload={reloadFn} />
        </Stack>
    )
}