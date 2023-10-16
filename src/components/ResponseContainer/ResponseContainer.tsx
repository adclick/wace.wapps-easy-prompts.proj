import { Box, LoadingOverlay } from "@mantine/core";
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
                    ? <LoadingOverlay visible={requestLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    : requests.map((request: Request) => {
                        return (
                            <Request key={request.id} prompt={request.prompt} result={request.result} />
                        )
                    })
            }
        </Box>
    )
}