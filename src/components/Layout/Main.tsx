import { ThreadsPanel } from "../Panels/ThreadsPanel";
import { Thread } from "../../model/Thread";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { Card } from "@mantine/core";

interface Main {
    threads: Thread[],
    targetRef: any,
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any
}

export function Main({
    threads,
    targetRef,
    aIMediatorClient,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions
}: Main) {
    return (
        <ThreadsPanel
            threads={threads}
            targetRef={targetRef}
            aIMediatorClient={aIMediatorClient}
            userPromptOptions={userPromptOptions}
            setUserPromptOptions={setUserPromptOptions}
            refreshPromptOptions={refreshPromptOptions}
        />
    )
}