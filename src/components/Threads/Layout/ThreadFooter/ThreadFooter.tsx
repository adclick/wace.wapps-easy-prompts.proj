import { Button, Group } from "@mantine/core";
import { ThreadSaveButton } from "../../Buttons/ThreadSaveButton/ThreadSaveButton";
import { PromptRequest, PromptRequestType } from "../../../../models/PromptRequest";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../../../models/User";
import { SaveModal } from "../../../Common/SaveModal/SaveModal";
import { Prompt } from "../../../../models/Prompt";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

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

    const regenerate = () => {
        const newPromptRequest = Prompt.clone(promptRequest) as PromptRequest;
        newPromptRequest.key = promptRequest.key;
        newPromptRequest.isPlayable = true;
        newPromptRequest.type = PromptRequestType.Prompt;
        newPromptRequest.response = "";

        const newPromptsRequests = promptsRequests.filter(p => p.key !== promptRequest.key);
        newPromptsRequests.push(newPromptRequest);
        console.log(newPromptRequest);

        setPromptsRequests(newPromptsRequests);
    }

    return (
        <>
            <SaveModal
                opened={newPromptModalOpened}
                handle={newPromptModalHandle}
                promptRequest={promptRequest}
            />
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
            <Group>
                <Button variant="default" size="xs" onClick={regenerate}>
                    Regenerate
                </Button>
            </Group>
        </>
    )
}