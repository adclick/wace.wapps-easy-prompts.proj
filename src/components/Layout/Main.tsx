import { ThreadsPanel } from "../Panels/ThreadsPanel";
import { Thread } from "../../model/Thread";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";

interface Main {
    threads: Thread[],
    targetRef: any,
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function Main({ threads, targetRef, aIMediatorClient, userPromptOptions, setUserPromptOptions }: Main) {
    return (
        <ThreadsPanel
            threads={threads}
            targetRef={targetRef}
            aIMediatorClient={aIMediatorClient}
            userPromptOptions={userPromptOptions}
            setUserPromptOptions={setUserPromptOptions}
        />
    )
}