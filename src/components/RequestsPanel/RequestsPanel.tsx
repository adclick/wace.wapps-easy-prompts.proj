import { Box, Divider, VisuallyHidden } from "@mantine/core";
import { Request } from "./Request";
import { useScrollIntoView } from "@mantine/hooks";

interface ResponseContainerParams {
    requests: Request[],
    targetRef: any
}

export function RequestsPanel({ requests, targetRef }: ResponseContainerParams) {

    return (
        <Box>
            {
                requests.map((request: Request) => {
                    return (
                        <Request
                            key={request.id}
                            userPrompt={request.userPrompt}
                            userPrmptOptions={request.userPromptOptions}
                            result={request.result}
                        />
                    )
                })
            }
            <VisuallyHidden ref={targetRef}>Anchor</VisuallyHidden>
        </Box>
    )
}