import { Box, VisuallyHidden } from "@mantine/core";
import { Request } from "./Request";
import { useScrollIntoView } from "@mantine/hooks";

interface ResponseContainerParams {
    requests: Request[],
    requestLoading: boolean,
    targetRef: any
}

export function RequestsPanel({ requests, requestLoading, targetRef }: ResponseContainerParams) {

    return (
        <Box>
            {
                requests.map((request: Request) => {
                    return (
                        <Request key={request.id} prompt={request.prompt} result={request.result} />
                    )
                })
            }
            <VisuallyHidden ref={targetRef}>Anchor</VisuallyHidden>
        </Box>
    )
}