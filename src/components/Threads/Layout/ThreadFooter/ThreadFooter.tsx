import { Badge, Box, Divider, Group, Modal, Text, rem } from "@mantine/core";
import { ThreadSaveButton } from "../../Buttons/ThreadSaveButton/ThreadSaveButton";
import { useDisclosure } from "@mantine/hooks";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { PromptForm } from "../../../Forms/PromptForm/PromptForm";
import { useCreatePromptMutation } from "../../../../api/promptsApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { Thread } from "../../../../models/Thread";
import { IconSparkles, IconTemplate } from "@tabler/icons-react";
import { ThreadForm } from "../../../Forms/ThreadForm/ThreadForm";

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

    const [newPromptModalOpened, newPromptModalHandle] = useDisclosure(false);
    const mutation = useCreatePromptMutation();

    return (
        <>
            <Modal opened={newPromptModalOpened} onClose={newPromptModalHandle.close} title="Create Prompt" size={"lg"}>
                <ThreadForm handle={newPromptModalHandle} thread={thread} mutation={mutation} />
            </Modal>
            <Group justify="space-between">
                <ThreadSaveButton onClick={newPromptModalHandle.open} />
                <Badge size={"sm"} variant="dot" h={"auto"}>
                    <Group p={3} gap={"xs"} justify="space-between" wrap="wrap">
                        {thread.technology.name}
                        {
                            thread.provider &&
                            <>
                                <Divider orientation="vertical" />
                                {thread.provider.model_name}
                            </>
                        }
                        
                    </Group>
                </Badge>
            </Group>
        </>
    )
}