import { ActionIcon, Button, Group } from "@mantine/core";
import { ThreadSaveButton } from "../ThreadSaveButton/ThreadSaveButton";
import { ThreadInfoButton } from "../ThreadInfoButton/ThreadInfoButton";
import { PromptRequest } from "../../../model/PromptRequest";
import { ChatSavePromptModal } from "../../Chat/ChatSavePromptModal/ChatSavePromptModal";
import { useDisclosure } from "@mantine/hooks";
import { IconStar } from "@tabler/icons-react";

interface ThreadFooter {
    promptRequest: PromptRequest
}

export function ThreadFooter({ promptRequest }: ThreadFooter) {
    const [newPromptModalOpened, newPromptModalHandle] = useDisclosure(false);

    return (
        <>
            <ChatSavePromptModal
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


                </Group>
                <ThreadInfoButton promptRequest={promptRequest} />
            </Group>
        </>
    )
}