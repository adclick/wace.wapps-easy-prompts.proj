import { Box } from "@mantine/core";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { ChatPrompt } from "../ChatPrompt/ChatPrompt";
import { UserPromptOptions } from "../../..//model/UserPromptOptions";
import { Thread } from "../../..//model/Thread";
import { PromptOptions } from "../../..//model/PromptOptions";
import { Technology } from "../../..//model/Technology";
import { Provider } from "../../..//model/Provider";
import { Modifier } from "../../..//model/Modifier";
import { Parameter } from "../../..//model/Parameter";
import { User } from "../../..//model/User";
import { Repository } from "../../..//model/Repository";
import { Language } from "../../..//model/Language";
import { RepositoryItem } from "../../..//model/RepositoryItem";


interface ChatToolbar {
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    scrollIntoView: any,
    threads: Thread[],
    setThreads: any,
    promptOptions: PromptOptions,
    technology: Technology,
    technologies: Technology[],
    handleOnChangeTechnology: any,
    provider: Provider,
    providers: Provider[],
    handleOnChangeProvider: any,
    modifiers: Modifier[],
    activeModifiers: Modifier[],
    setActiveModifiers: any
    setUserPromptOptions: any,
    parameters: Parameter[],
    refreshPromptOptions: any,
    user: User,
    repository: Repository,
    language: Language,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any,
    openRepositoryItemDetailsSelected: any
}

export function ChatToolbar({
    aIMediatorClient,
    scrollIntoView,
    threads,
    setThreads,
    promptOptions,
    technology,
    technologies,
    handleOnChangeTechnology,
    provider,
    providers,
    handleOnChangeProvider,
    modifiers,
    activeModifiers,
    setActiveModifiers,
    userPromptOptions,
    setUserPromptOptions,
    parameters,
    refreshPromptOptions,
    user,
    repository,
    language,
    repositorySelectedItems,
    setRepositorySelectedItems,
    openRepositoryItemDetailsSelected
}: ChatToolbar) {
    return (
        <Box>
            <ChatPrompt
                aIMediatorClient={aIMediatorClient}
                userPromptOptions={userPromptOptions}
                scrollIntoView={scrollIntoView}
                threads={threads}
                setThreads={setThreads}
                promptOptions={promptOptions}
                technology={technology}
                technologies={technologies}
                handleOnChangeTechnology={handleOnChangeTechnology}
                provider={provider}
                providers={providers}
                modifiers={modifiers}
                handleOnChangeProvider={handleOnChangeProvider}
                activeModifiers={activeModifiers}
                setActiveModifiers={setActiveModifiers}
                setUserPromptOptions={setUserPromptOptions}
                parameters={parameters}
                refreshPromptOptions={refreshPromptOptions}
                user={user}
                repository={repository}
                language={language}
                repositorySelectedItems={repositorySelectedItems}
                setRepositorySelectedItems={setRepositorySelectedItems}
                openRepositoryItemDetailsSelected={openRepositoryItemDetailsSelected}
            />
        </Box>
    )
}