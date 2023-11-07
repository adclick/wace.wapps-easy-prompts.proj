import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Prompt } from "../Prompt/Prompt";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { Request } from "../RequestsPanel/Request";

interface Footer {
    aiMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setRequestLoading: any,
    requests: Request[],
    setRequests: any,
    requestLoading: boolean,
    scrollIntoView: any
}

export function Footer({
    aiMediatorClient,
    userPromptOptions,
    setRequestLoading,
    requests,
    setRequests,
    requestLoading,
    scrollIntoView
}: Footer) {
    return (
        <Prompt
            aIMediatorClient={aiMediatorClient}
            userPromptOptions={userPromptOptions}
            setRequestLoading={setRequestLoading}
            requests={requests}
            setRequests={setRequests}
            requestLoading={requestLoading}
            scrollIntoView={scrollIntoView}
        />
    )
}