import { Box, VisuallyHidden } from "@mantine/core"
import { Thread } from "../../model/Thread"
import { ThreadWidget } from "../Elements/ThreadWidget"
import { Ref } from "react"
import { AIMediatorClient } from "@/clients/AIMediatorClient"
import { UserPromptOptions } from "@/model/UserPromptOptions"

interface ThreadsPanel {
    threads: Thread[],
    targetRef: Ref<HTMLDivElement> | undefined
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions
}

export function ThreadsPanel({ threads, targetRef, aIMediatorClient, userPromptOptions }: ThreadsPanel) {
    return (
        <Box>
            {
                threads.map((thread: Thread) => {
                    return (
                        <ThreadWidget
                            key={thread.request.timestamp}
                            request={thread.request}
                            response={thread.response}
                            aIMediatorClient={aIMediatorClient}
                            userPromptOptions={userPromptOptions}
                        />
                    )
                })
            }
            <VisuallyHidden ref={targetRef}>Anchor</VisuallyHidden>
        </Box>
    )
}