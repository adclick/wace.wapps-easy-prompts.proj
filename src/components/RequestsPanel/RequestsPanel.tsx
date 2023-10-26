import { Box, Divider, VisuallyHidden } from "@mantine/core";
import { Request } from "./Request";
import { PromptOptions } from "../../model/PromptOptions";

interface ResponseContainerParams {
    promptOptions: PromptOptions
    requests: Request[],
    targetRef: any
}

export function RequestsPanel({ promptOptions, requests, targetRef }: ResponseContainerParams) {

    return (
        <Box>
            {
                requests.map((request: Request) => {
                    return (
                        <Request
                            key={request.id}
                            promptOptions={promptOptions}
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