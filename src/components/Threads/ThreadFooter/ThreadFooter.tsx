import { Group } from "@mantine/core";
import { ThreadSaveButton } from "../ThreadSaveButton/ThreadSaveButton";
import { ThreadInfoButton } from "../ThreadInfoButton/ThreadInfoButton";
import { PromptRequest } from "../../../model/PromptRequest";
import { ThreadSaveModal } from "../ThreadSaveModal/ThreadSaveModal";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../../model/User";
import { useUser } from "../../../context/UserContext";
import { ThreadScoreButton } from "../ThreadScoreButton/ThreadScoreButton";

interface ThreadFooter {
    promptRequest: PromptRequest,
    userPromptRequest: PromptRequest
}

export function ThreadFooter({ promptRequest, userPromptRequest }: ThreadFooter) {
    const [newPromptModalOpened, newPromptModalHandle] = useDisclosure(false);
    const { user } = useUser();

    return (
        <>
            <ThreadSaveModal
                opened={newPromptModalOpened}
                handle={newPromptModalHandle}
                request={promptRequest}
            />
            {
                User.hasPrompt(user, promptRequest) && !promptRequest.isPlayable &&
                <Group justify="space-between">
                    <ThreadSaveButton onClick={newPromptModalHandle.open} />
                    <ThreadInfoButton promptRequest={promptRequest} />
                </Group>
            }
            {
                User.hasPrompt(user, promptRequest) && promptRequest.isPlayable &&
                <Group justify="space-between">
                    <ThreadScoreButton />
                    <ThreadInfoButton promptRequest={promptRequest} />
                </Group>
            }
            {
                !User.hasPrompt(user, promptRequest) && !promptRequest.isPlayable &&
                <Group justify="space-between">
                    <ThreadSaveButton onClick={newPromptModalHandle.open} />
                    <ThreadInfoButton promptRequest={promptRequest} />
                </Group>
            }
            {
                !User.hasPrompt(user, promptRequest) && promptRequest.isPlayable &&
                <Group>
                    <ThreadScoreButton />
                </Group>

            }
        </>
    )
}