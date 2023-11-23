import { ChatPanel } from "../Chat/ChatPanel";
import { Thread } from "../../model/Thread";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";

interface Main {
    threads: Thread[],
    targetRef: any,
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any,
    scrollIntoView: any
}

export function Main({
    threads,
    targetRef,
    aIMediatorClient,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions,
    scrollIntoView
}: Main) {
    return (
        <ChatPanel
            threads={threads}
            targetRef={targetRef}
            aIMediatorClient={aIMediatorClient}
            userPromptOptions={userPromptOptions}
            setUserPromptOptions={setUserPromptOptions}
            refreshPromptOptions={refreshPromptOptions}
            scrollIntoView={scrollIntoView}
        />
    )
}