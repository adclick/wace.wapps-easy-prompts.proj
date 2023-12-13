import { Box, Group, Stack, VisuallyHidden } from "@mantine/core"
import { Thread } from "../../model/Thread"
import { ChatCard } from "./ChatCard"
import { Ref } from "react"
import { AIMediatorClient } from "@/clients/AIMediatorClient"
import { UserPromptOptions } from "@/model/UserPromptOptions"
import { ChatCardIntro } from "./ChatCardIntro"
import { User } from "../../model/User"
import { Repository } from "../../model/Repository"
import { Language } from "../../model/Language"
import { Filters } from "../../model/Filters"

interface ChatPanel {
    threads: Thread[],
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
    filters: Filters,
    refreshRepository: any,
    firstLogin: boolean,
    setFirstLogin: any
    theme: string
}

export function ChatPanel({
    threads,
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
    filters,
    refreshRepository,
    firstLogin,
    setFirstLogin,
    theme
}: ChatPanel) {
    return (
        <Stack gap={"md"} my={"xs"}>
            {
                threads.map((thread: Thread) => {
                    return (
                        <ChatCard
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