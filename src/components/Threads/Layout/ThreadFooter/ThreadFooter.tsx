import { Badge, Button, Group, Modal } from "@mantine/core";
import { ThreadSaveButton } from "../../Buttons/ThreadSaveButton/ThreadSaveButton";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../../../models/User";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { PromptForm } from "../../../Forms/PromptForm/PromptForm";
import { useCreatePromptMutation, useUpdatePromptMutation } from "../../../../api/promptsApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { Template } from "../../../../models/Template";
import { Modifier } from "../../../../models/Modifier";
import { Thread } from "../../../../models/Thread";
import { PromptStatus } from "../../../../enums";
import { IconReload } from "@tabler/icons-react";

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
    const mutation = useUpdatePromptMutation(thread.prompt.id);

    // const regenerate = () => {
    //     console.log(thread);
    //     const newThread = Thread.clone(thread);
    //     newThread.id = 0;
    //     newThread.prompt.id = 0;
    //     newThread.key = thread.key + 1;
    //     newThread.response = "";

    //     setThreads([
    //         ...threads,
    //         newThread
    //     ]);
    // }

    return (
        <>
            <Modal opened={newPromptModalOpened} onClose={newPromptModalHandle.close} title="Create Prompt" size={"lg"}>
                <PromptForm handle={newPromptModalHandle} prompt={thread.prompt} mutation={mutation} />
            </Modal>
            <Group justify="space-between">
                <Group>

                    {
                        thread.prompt.status === PromptStatus.DRAFT &&
                        <ThreadSaveButton onClick={newPromptModalHandle.open} />
                    }
                    {/* <Button
                        variant="transparent"
                        color="--mantine-color-text"
                        size="xs"
                        leftSection={<IconReload size={14} />}
                        onClick={regenerate}
                    >
                        Regenerate
                    </Button> */}
                </Group>
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
        </>
    )
}