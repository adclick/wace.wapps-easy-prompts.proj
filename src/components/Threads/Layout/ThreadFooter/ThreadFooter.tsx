import { Group, Modal } from "@mantine/core";
import { ThreadSaveButton } from "../../Buttons/ThreadSaveButton/ThreadSaveButton";
import { PromptRequest } from "../../../../models/PromptRequest";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../../../models/User";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { PromptForm } from "../../../Forms/PromptForm/PromptForm";
import { useCreatePromptMutation } from "../../../../api/promptsApi";

interface ThreadFooter {
    promptRequest: PromptRequest,
    userPromptRequest: PromptRequest
}

export function ThreadFooter({ promptRequest, userPromptRequest }: ThreadFooter) {
    const [
        user,
        promptsRequests,
        setPromptsRequests,
    ] = useStore(useShallow(state => [
        state.user,
        state.promptsRequests,
        state.setPromptsRequests,
    ]));

    const [newPromptModalOpened, newPromptModalHandle] = useDisclosure(false);
    const createMutation = useCreatePromptMutation();

    return (
        <>
            <Modal opened={newPromptModalOpened} onClose={newPromptModalHandle.close} title="Create Prompt" size={"lg"}>
                <PromptForm handle={newPromptModalHandle} prompt={promptRequest} mutation={createMutation} />
            </Modal>
            {
                User.hasPrompt(user, promptRequest) && !promptRequest.isPlayable &&
                <Group justify="space-between">
                    <ThreadSaveButton onClick={newPromptModalHandle.open} />
                </Group>
            }
            {
                !User.hasPrompt(user, promptRequest) && !promptRequest.isPlayable &&
                <Group justify="space-between">
                    <ThreadSaveButton onClick={newPromptModalHandle.open} />
                </Group>
            }
        </>
    )
}