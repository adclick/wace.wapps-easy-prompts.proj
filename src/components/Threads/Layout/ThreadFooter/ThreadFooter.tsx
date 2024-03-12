import { Badge, Box, Divider, Group, Modal, Radio, Stack, Text, rem } from "@mantine/core";
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
import { useState } from "react";
import { useCreateTemplateMutation } from "../../../../api/templatesApi";
import { useCreateModifierMutation } from "../../../../api/modifiersApi";
import { ThreadTemplateForm } from "../../../Forms/ThreadTemplateForm/ThreadTemplateForm";
import { ThreadModifierForm } from "../../../Forms/ThreadModifierForm/ThreadModifierForm";

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
    const promptCreateMutation = useCreatePromptMutation();
    const templateCreateMutation = useCreateTemplateMutation();
    const modifierCreateMutation = useCreateModifierMutation();

    const [formType, setFormType] = useState('prompt');

    return (
        <>
            <Modal opened={newPromptModalOpened} onClose={newPromptModalHandle.close} title="Create Prompt" size={"lg"}>
                <Stack>

                    <Radio.Group
                        value={formType}
                        onChange={setFormType}
                        withAsterisk
                    >
                        <Group>
                            <Radio value="prompt" label="Prompt" />
                            <Radio value="template" label="Template" />
                            <Radio value="modifier" label="Modifier" />
                        </Group>
                    </Radio.Group>

                    {
                        formType === 'prompt' && <ThreadForm handle={newPromptModalHandle} thread={thread} mutation={promptCreateMutation} />
                    }
                    {
                        formType === 'template' && <ThreadTemplateForm handle={newPromptModalHandle} thread={thread} mutation={templateCreateMutation} />
                    }
                    {
                        formType === 'modifier' && <ThreadModifierForm handle={newPromptModalHandle} thread={thread} mutation={modifierCreateMutation} />
                    }
                </Stack>

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