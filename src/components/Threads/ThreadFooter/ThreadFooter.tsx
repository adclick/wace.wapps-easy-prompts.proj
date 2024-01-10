import { Group } from "@mantine/core";
import { ThreadSaveButton } from "../ThreadSaveButton/ThreadSaveButton";
import { ThreadInfoButton } from "../ThreadInfoButton/ThreadInfoButton";
import { PromptRequest } from "../../../model/PromptRequest";
import { ChatSavePromptModal } from "../../Chat/ChatSavePromptModal/ChatSavePromptModal";
import { useDisclosure } from "@mantine/hooks";
import { ThreadRegenerateButton } from "../ThreadRegenerateButton/ThreadRegenerateButton";

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
                    <ThreadSaveButton onClick={newPromptModalHandle.open} />
                    <ThreadRegenerateButton />
                </Group>
                <ThreadInfoButton promptRequest={promptRequest} />
            </Group>
        </>
    )
}