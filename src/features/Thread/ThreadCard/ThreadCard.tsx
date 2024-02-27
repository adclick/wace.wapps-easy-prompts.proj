import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import { ThreadHeader } from "../../../components/Threads/Layout/ThreadHeader/ThreadHeader";
import { Card, Collapse, Group, Stack } from "@mantine/core";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import ThreadChat from "../ThreadChat/ThreadChat";
import ThreadTextGeneration from "../ThreadTextGeneration/ThreadTextGeneration";
import ThreadImageGeneration from "../ThreadImageGeneration/ThreadImageGeneration";
import { Thread } from "../../../models/Thread";
import { useCreateThreadMutation, useDeleteThreadMutation, useUpdateThreadMutation } from "../../../api/threadsApi";
import { FC } from "react";
import { PromptChatMessage } from "../../../models/PromptChatMessage";

interface ThreadCardProps {
    thread: Thread,
}

const ThreadCard: FC<ThreadCardProps> = ({ thread }: ThreadCardProps) => {
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

    const [
        user,
        selectedWorkspace,
        threads,
        setThreads,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedWorkspace,
        state.threads,
        state.setThreads
    ]));

    const [minimized, minimizeHandle] = useDisclosure(false);

    const createThreadMutation = useCreateThreadMutation();
    const updateThreadMutation = useUpdateThreadMutation(thread.id)
    const deleteThreadMutation = useDeleteThreadMutation(user);

    const createThread = (response: string, chatMessages: PromptChatMessage[] = []) => {
        createThreadMutation.mutate({
            title: thread.title,
            key: thread.key.toString(),
            content: thread.content,
            response: response,
            user_external_id: user.external_id,
            workspace_id: selectedWorkspace.id.toString(),
            technology_id: thread.technology.id.toString(),
            provider_id: thread.provider.id.toString(),
            templates_ids: thread.threads_templates.map(t => t.template.id.toString()),
            modifiers_ids: thread.threads_modifiers.map(t => t.modifier.id.toString()),
            chat_messages: chatMessages,
            thread_parameters: thread.threads_parameters
        });
    }

    const updateThreadResponse = (response?: string, chatMessages?: PromptChatMessage[], title?: string) => {
        updateThreadMutation.mutate({
            title: title ? title : thread.title,
            key: (Number(thread.key) + 1).toString(),
            content: thread.content,
            response: response ? response : thread.response,
            user_external_id: user.external_id,
            workspace_id: selectedWorkspace.id.toString(),
            technology_id: thread.technology.id.toString(),
            provider_id: thread.provider.id.toString(),
            templates_ids: thread.threads_templates.map(t => t.template.id.toString()),
            modifiers_ids: thread.threads_modifiers.map(t => t.modifier.id.toString()),
            chat_messages: chatMessages ? chatMessages : thread.threads_chat_messages,
            thread_parameters: thread.threads_parameters
        });
    }

    const deleteThread = (thread: Thread) => {
        setThreads(threads.filter((t) => t.key !== thread.key));
        deleteThreadMutation.mutate(thread.id);
    }

    let threadComponent = <></>;

    switch (thread.technology.slug) {
        case 'text-generation':
            threadComponent = <ThreadTextGeneration
                thread={thread}
                createThread={createThread}
                updateThreadResponse={updateThreadResponse}
                scrollIntoView={scrollIntoView}
            />;
            break;
        case 'chat':
            threadComponent = <ThreadChat
                thread={thread}
                createThread={createThread}
                updateThreadResponse={updateThreadResponse}
                // scrollIntoView={scrollIntoView}
            />
            break;
        case 'image-generation':
            threadComponent = <ThreadImageGeneration
                thread={thread}
                createThread={createThread}
                updateThreadResponse={updateThreadResponse}
                scrollIntoView={scrollIntoView}
            />;
            break;
    }

    return (
        <Group justify="center" ref={targetRef}>
            <Card
                p={"sm"}
                shadow="sm"
                mx={"md"}
                withBorder w={800}
            >
                <Stack gap={"xl"}>
                    <ThreadHeader
                        deleteThread={deleteThread}
                        minimized={minimized}
                        minimizeHandle={minimizeHandle}
                        thread={thread}
                        updateMutation={updateThreadResponse}

                    />
                    <Collapse in={!minimized}>
                        <Stack gap={"xl"}>
                            {threadComponent}
                        </Stack>
                    </Collapse>
                </Stack>
            </Card>
        </Group>
    )
}

export default ThreadCard;