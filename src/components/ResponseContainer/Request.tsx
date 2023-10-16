import { Stack } from "@mantine/core"
import { RequestCard } from "./RequestCard/RequestCard"
import { ResponseCard } from "./ResponseCard/ResponseCard"

interface RequestParams {
    prompt: string,
    result: string
}

export interface Request {
    id: number
    prompt: string,
    result: string
}

export function Request({prompt, result}: RequestParams) {
    return (
        <Stack>
            <RequestCard prompt={prompt} />
            <ResponseCard result={result} />
        </Stack>
    )
}