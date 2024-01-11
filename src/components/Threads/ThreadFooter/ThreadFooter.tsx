import { ActionIcon, Group } from "@mantine/core";
import { ThreadSaveButton } from "../ThreadSaveButton/ThreadSaveButton";
import { ThreadInfoButton } from "../ThreadInfoButton/ThreadInfoButton";
import { PromptRequest } from "../../../model/PromptRequest";
import { ThreadSaveModal } from "../ThreadSaveModal/ThreadSaveModal";
import { useDisclosure } from "@mantine/hooks";
import { IconReload, IconStar } from "@tabler/icons-react";
import { ThreadMenu } from "../ThreadMenu/ThreadMenu";
import { ThreadReloadButton } from "../ThreadReloadButton/ThreadReloadButton";

interface ThreadFooter {
    promptRequest: PromptRequest
}

export function ThreadFooter({ promptRequest }: ThreadFooter) {
    const [newPromptModalOpened, newPromptModalHandle] = useDisclosure(false);

    return (
        <>
            <ThreadSaveModal
                opened={newPromptModalOpened}
                handle={newPromptModalHandle}
                request={promptRequest}
            />
            <Group justify="space-between">
                <Group>
                    {
                        promptRequest.isPlayable
                            ? <ActionIcon variant="subtle">
                                <IconStar size={14} stroke={3} />
                            </ActionIcon>
                            : <ThreadSaveButton onClick={newPromptModalHandle.open} />
                    }
                    <ThreadReloadButton promptRequest={promptRequest} />
                    <ThreadMenu />
                </Group>
                <ThreadInfoButton promptRequest={promptRequest} />
            </Group>
        </>
    )
}