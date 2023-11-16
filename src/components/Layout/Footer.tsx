import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Prompt } from "../Prompt/Prompt";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { Thread } from "../../model/Thread";

interface Footer {
    aiMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setRequestLoading: any,
    setRequests: any,
    requestLoading: boolean,
    scrollIntoView: any,
    threads: Thread[],
    setThreads: any
}

export function Footer({
    aiMediatorClient,
    userPromptOptions,
    setRequestLoading,
    setRequests,
    requestLoading,
    scrollIntoView,
    threads,
    setThreads
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
        />
    )
}