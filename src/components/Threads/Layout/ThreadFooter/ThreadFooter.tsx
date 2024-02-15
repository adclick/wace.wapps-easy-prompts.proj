import { Badge, Group, Modal } from "@mantine/core";
import { ThreadSaveButton } from "../../Buttons/ThreadSaveButton/ThreadSaveButton";
import { PromptRequest } from "../../../../models/PromptRequest";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../../../models/User";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { PromptForm } from "../../../Forms/PromptForm/PromptForm";
import { useCreatePromptMutation } from "../../../../api/promptsApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { Template } from "../../../../models/Template";
import { Modifier } from "../../../../models/Modifier";

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

    let templates: Template[] = [];
    let modifiers: Modifier[] = [];

    if ("metadata" in promptRequest && promptRequest.metadata) {
        if ("templates" in promptRequest.metadata) {
            templates = promptRequest.metadata.templates;
        }

        if ("modifiers" in promptRequest.metadata) {
            modifiers = promptRequest.metadata.modifiers;
        }
    }

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
                    <Badge size={"sm"} variant="dot" h={"auto"}>
                        <ProviderLabel
                            size="sm"
                            technology={promptRequest.technology}
                            provider={promptRequest.provider}
                            templates={templates}
                            modifiers={modifiers}
                        />
                    </Badge>
                </Group>
            }
            {
                !User.hasPrompt(user, promptRequest) && !promptRequest.isPlayable &&
                <Group justify="space-between">
                    <ThreadSaveButton onClick={newPromptModalHandle.open} />
                    <Badge size={"sm"} variant="dot" h={"auto"}>
                        <ProviderLabel
                            size="sm"
                            technology={promptRequest.technology}
                            provider={promptRequest.provider}
                            templates={templates}
                            modifiers={modifiers}
                        />
                    </Badge>
                </Group>
            }
        </>
    )
}