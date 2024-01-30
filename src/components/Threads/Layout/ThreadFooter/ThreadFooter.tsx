import { Group, Modal } from "@mantine/core";
import { ThreadSaveButton } from "../../Buttons/ThreadSaveButton/ThreadSaveButton";
import { ThreadInfoButton } from "../../Buttons/ThreadInfoButton/ThreadInfoButton";
import { PromptRequest } from "../../../../model/PromptRequest";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../../../model/User";
import { useUser } from "../../../../context/UserContext";
import { ThreadScoreButton } from "../../Buttons/ThreadScoreButton/ThreadScoreButton";
import { SaveModal } from "../../../Common/SaveModal/SaveModal";

interface ThreadFooter {
    promptRequest: PromptRequest,
    userPromptRequest: PromptRequest
}

export function ThreadFooter({ promptRequest, userPromptRequest }: ThreadFooter) {
    const [newPromptModalOpened, newPromptModalHandle] = useDisclosure(false);

    const { user } = useUser();

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
        </>
    )
}