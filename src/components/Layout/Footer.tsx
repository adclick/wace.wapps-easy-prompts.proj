import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Prompt } from "../Prompt/Prompt";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { Request } from "../RequestsPanel/Request";
import { Thread } from "../../model/Thread";

interface Footer {
    aiMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setRequestLoading: any,
    requests: Request[],
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
    requests,
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
            setRequests={setRequests}
            requestLoading={requestLoading}
            scrollIntoView={scrollIntoView}
            threads={threads}
            setThreads={setThreads}
        />
    )
}