import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Prompt } from "../Prompt/Prompt";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { Thread } from "../../model/Thread";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { Modifier } from "../../model/Modifier";
import { Parameter } from "../../model/Parameter";

interface Footer {
    aiMediatorClient: AIMediatorClient,
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
    userPrompt: string,
    setUserPrompt: any,
    refreshPromptOptions: any
}

export function Footer({
    aiMediatorClient,
    userPromptOptions,
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
    setUserPromptOptions,
    parameters,
    userPrompt,
    setUserPrompt,
    refreshPromptOptions
}: Footer) {
    return (
        <Prompt
            aIMediatorClient={aiMediatorClient}
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
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            refreshPromptOptions={refreshPromptOptions}
        />
    )
}