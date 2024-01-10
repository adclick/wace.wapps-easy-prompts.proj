import { Group } from "@mantine/core";
import { ThreadSaveButton } from "../ThreadSaveButton/ThreadSaveButton";
import { ThreadInfoButton } from "../ThreadInfoButton/ThreadInfoButton";
import { PromptRequest } from "../../../model/PromptRequest";
import { ChatSavePromptModal } from "../../Chat/ChatSavePromptModal/ChatSavePromptModal";
import { useDisclosure } from "@mantine/hooks";

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
                </Group>
                <Group gap={6}>
                    <ThreadInfoButton promptRequest={promptRequest} />
                </Group>
            </Group>
        </>
    )
}