import { ResponseCard } from "./ResponseCard/ResponseCard";
import { Box, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RequestCard } from "./RequestCard/RequestCard";
import { Request } from "./Request";

interface ResponseContainerParams {
    requests: Request[],
    requestLoading: boolean
}

export function ResponseContainer({ requests, requestLoading }: ResponseContainerParams) {
    return (
        <Box>
            {
                requestLoading
                    ? <LoadingOverlay visible={requestLoading} zIndex={10000} overlayProps={{ radius: "sm", blur: 2 }} />
                    : requests.map((request: Request) => <Request key={request.id} prompt={request.prompt} result={request.result} />)

            }
        </Box>
    )
}