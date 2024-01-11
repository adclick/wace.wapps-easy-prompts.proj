import { ActionIcon, Button } from "@mantine/core";
import { PromptRequest } from "../../../model/PromptRequest";
import { IconInfoCircle } from "@tabler/icons-react";
import iconsUtils from "../../../utils/iconsUtils";

interface ThreadInfoButton {
    promptRequest: PromptRequest
}

export function ThreadInfoButton({ promptRequest }: ThreadInfoButton) {
    return (
        promptRequest.isPlayable
            ? <ActionIcon variant="subtle">
                <IconInfoCircle size={18} />
            </ActionIcon>
            : <Button
                size="xs"
                variant="subtle"
                leftSection={iconsUtils.getTechnologyIcon(promptRequest.technology.slug, 14)}
            >
                {promptRequest.provider.name}
            </Button>

    )
}