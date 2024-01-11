import { ActionIcon } from "@mantine/core"
import { PromptRequest } from "../../../model/PromptRequest"
import { IconReload } from "@tabler/icons-react"
import { usePromptsRequests } from "../../../context/PromptsRequestsContext"

interface ThreadReloadButton {
    promptRequest: PromptRequest
}

export function ThreadReloadButton({ promptRequest }: ThreadReloadButton) {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();

    const reload = () => {
        const newPromptRequest = PromptRequest.clone(promptRequest);

        for (const [p, index] of Object.entries(promptsRequests)) {
            console.log("here", p, index);
        }
        
    }

    return (
        <ActionIcon onClick={reload} variant="subtle">
            <IconReload size={14} stroke={3} />
        </ActionIcon>
    )
}