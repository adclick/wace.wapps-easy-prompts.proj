import { Box, Stack, VisuallyHidden } from "@mantine/core"
import { Thread } from "../../model/Thread"
import { ThreadWidget } from "../Elements/ThreadWidget"
import { Ref } from "react"
import { AIMediatorClient } from "@/clients/AIMediatorClient"
import { UserPromptOptions } from "@/model/UserPromptOptions"

interface ThreadsPanel {
    threads: Thread[],
    targetRef: Ref<HTMLDivElement> | undefined
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any,
    scrollIntoView: any
}

export function ThreadsPanel({
    threads,
    targetRef,
    aIMediatorClient,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions,
    scrollIntoView
}: ThreadsPanel) {
    return (
        <Stack gap={"md"}>
            {
                threads.map((thread: Thread) => {
                    return (
                        <ThreadWidget
                            key={thread.request.timestamp}
                            request={thread.request}
                            response={thread.response}
                            aIMediatorClient={aIMediatorClient}
                            userPromptOptions={userPromptOptions}
                            setUserPromptOptions={setUserPromptOptions}
                            refreshPromptOptions={refreshPromptOptions}
                            scrollIntoView={scrollIntoView}
                        />
                    )
                })
            }
            <Box pos={"relative"}>
                <VisuallyHidden ref={targetRef}>Anchor</VisuallyHidden>
            </Box>
        </Stack>
    )
}