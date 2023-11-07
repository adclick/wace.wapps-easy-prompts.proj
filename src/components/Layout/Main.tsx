import { PromptOptions } from "../../model/PromptOptions";
import { RequestsPanel } from "../RequestsPanel/RequestsPanel";
import { Request } from "../RequestsPanel/Request";

interface Main {
    promptOptions: PromptOptions,
    requests: Request[],
    targetRef: any
}

export function Main({ promptOptions, requests, targetRef }: Main) {
    return (
        <RequestsPanel
            promptOptions={promptOptions}
            requests={requests}
            targetRef={targetRef}
        />
    )
}