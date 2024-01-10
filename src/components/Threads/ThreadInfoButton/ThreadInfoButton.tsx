import { Button } from "@mantine/core";
import { Technology } from "../../../model/Technology";
import { PromptRequest } from "../../../model/PromptRequest";

interface ThreadInfoButton {
    promptRequest: PromptRequest
}

export function ThreadInfoButton({ promptRequest }: ThreadInfoButton) {
    return (
        <Button
            size="xs"
            variant="subtle"
            leftSection={Technology.getIcon(promptRequest.technology.slug, 14)}
        >
            {promptRequest.provider.name}
        </Button>
    )
}