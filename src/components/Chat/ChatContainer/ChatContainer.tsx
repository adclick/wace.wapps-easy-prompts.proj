import { Box, Group, Stack, VisuallyHidden } from "@mantine/core"
import { Thread } from "../../../model/Thread"
import { ChatMessage } from "../ChatMessage/ChatMessage"
import { Ref } from "react"
import { User } from "../../../model/User"
import { Repository } from "../../../model/Repository"
import { Language } from "../../../model/Language"
import { AIMediatorClient } from "../../../clients/AIMediatorClient"
import { UserPromptOptions } from "../../../model/UserPromptOptions"

interface ChatContainer {
    threads: Thread[],
    setThreads: any,
    targetRef: Ref<HTMLDivElement> | undefined
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any,
    scrollIntoView: any,
    user: User,
    repository: Repository,
    language: Language,
    openRepositoryItemDetailsSelected: any,
    refreshRepository: any,
    firstLogin: boolean,
    setFirstLogin: any
    theme: string
}

export function ChatContainer({
    threads,
    setThreads,
    targetRef,
    aIMediatorClient,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions,
    scrollIntoView,
    user,
    repository,
    language,
    openRepositoryItemDetailsSelected,
    refreshRepository,
    firstLogin,
    setFirstLogin,
    theme
}: ChatContainer) {
    return (
        <Stack gap={"md"} my={"xs"}>
            {
                threads.map((thread: Thread, index: number) => {
                    return (
                        <ChatMessage
                            threads={threads}
                            setThreads={setThreads}
                            thread={thread}
                            threadIndex={index}
                            key={thread.request.timestamp}
                            request={thread.request}
                            response={thread.response}
                            aIMediatorClient={aIMediatorClient}
                            userPromptOptions={userPromptOptions}
                            setUserPromptOptions={setUserPromptOptions}
                            refreshPromptOptions={refreshPromptOptions}
                            scrollIntoView={scrollIntoView}
                            user={user}
                            repository={repository}
                            language={language}
                            openRepositoryItemDetailsSelected={openRepositoryItemDetailsSelected}
                            refreshRepository={refreshRepository}
                            firstLogin={firstLogin}
                            setFirstLogin={setFirstLogin}
                            theme={theme}
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