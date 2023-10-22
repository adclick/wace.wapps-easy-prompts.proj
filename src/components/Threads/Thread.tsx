import { Stack } from "@mantine/core";
import { Request } from "./Request";
import { TextResponse } from "./TextResponse";

export interface Thread {
    request: Request,
    textResponse: TextResponse
}

export function Thread() {
    return (
        <Stack gap={0}>
            <Request />
            <TextResponse />
        </Stack>
    )
}