import { Badge, Group, Modal } from "@mantine/core";
import { ThreadSaveButton } from "../../Buttons/ThreadSaveButton/ThreadSaveButton";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../../../models/User";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { PromptForm } from "../../../Forms/PromptForm/PromptForm";
import { useCreatePromptMutation } from "../../../../api/promptsApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { Template } from "../../../../models/Template";
import { Modifier } from "../../../../models/Modifier";
import { Thread } from "../../../../models/Thread";

interface ThreadFooter {
    thread: Thread,
}

export function ThreadFooter({ thread }: ThreadFooter) {
    const [
        user,
        threads,
        setThreads,
    ] = useStore(useShallow(state => [
        state.user,
        state.threads,
        state.setThreads,
    ]));

    let templates: Template[] = [];
    let modifiers: Modifier[] = [];

    if ("metadata" in thread.prompt && thread.prompt.metadata) {
        if ("templates" in thread.prompt.metadata) {
            templates = thread.prompt.metadata.templates;
        }

        if ("modifiers" in thread.prompt.metadata) {
            modifiers = thread.prompt.metadata.modifiers;
        }
    }

    const [newPromptModalOpened, newPromptModalHandle] = useDisclosure(false);
    const createMutation = useCreatePromptMutation();

    return (
        <>
            <Modal opened={newPromptModalOpened} onClose={newPromptModalHandle.close} title="Create Prompt" size={"lg"}>
                <PromptForm handle={newPromptModalHandle} prompt={thread.prompt} mutation={createMutation} />
            </Modal>
            {
                User.hasPrompt(user, thread.prompt) && thread.prompt.id <= 0 &&
                <Group justify="space-between">
                    <ThreadSaveButton onClick={newPromptModalHandle.open} />
                    <Badge size={"sm"} variant="dot" h={"auto"}>
                        <ProviderLabel
                            size="sm"
                            technology={thread.prompt.technology}
                            provider={thread.prompt.provider}
                            templates={templates}
                            modifiers={modifiers}
                        />
                    </Badge>
                </Group>
            }
            {
                !User.hasPrompt(user, thread.prompt) && thread.prompt.id <= 0 &&
                <Group justify="space-between">
                    <ThreadSaveButton onClick={newPromptModalHandle.open} />
                    <Badge size={"sm"} variant="dot" h={"auto"}>
                        <ProviderLabel
                            size="sm"
                            technology={thread.prompt.technology}
                            provider={thread.prompt.provider}
                            templates={templates}
                            modifiers={modifiers}
                        />
                    </Badge>
                </Group>
            }
        </>
    )
}