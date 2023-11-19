import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Prompt } from "../Prompt/Prompt";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { Thread } from "../../model/Thread";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { Modifier } from "../../model/Modifier";

interface Footer {
    aiMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setRequestLoading: any,
    requestLoading: boolean,
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
}

export function Footer({
    aiMediatorClient,
    userPromptOptions,
    setRequestLoading,
    requestLoading,
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
    setUserPromptOptions
}: Footer) {
    return (
        <Prompt
            aIMediatorClient={aiMediatorClient}
            userPromptOptions={userPromptOptions}
            setRequestLoading={setRequestLoading}
            requestLoading={requestLoading}
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
        />
    )
}