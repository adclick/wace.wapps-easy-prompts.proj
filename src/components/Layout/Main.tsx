import { ThreadsPanel } from "../Panels/ThreadsPanel";
import { Thread } from "../../model/Thread";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";

interface Main {
    threads: Thread[],
    targetRef: any,
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions
}

export function Main({ threads, targetRef, aIMediatorClient, userPromptOptions }: Main) {
    return (
        <ThreadsPanel
            threads={threads}
            targetRef={targetRef}
            aIMediatorClient={aIMediatorClient}
            userPromptOptions={userPromptOptions}
        />
    )
}