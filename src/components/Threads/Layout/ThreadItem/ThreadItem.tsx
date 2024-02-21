import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { Card, Collapse, Group, Stack } from "@mantine/core";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../../stores/store";
import ThreadChat from "../../../../features/Thread/ThreadChat/ThreadChat";
import ThreadTextGeneration from "../../../../features/Thread/ThreadTextGeneration/ThreadTextGeneration";
import ThreadImageGeneration from "../../../../features/Thread/ThreadImageGeneration/ThreadImageGeneration";
import { Thread } from "../../../../models/Thread";
import { useCreateThreadMutation, useDeleteThreadMutation, useUpdateThreadMutation } from "../../../../api/threadsApi";

interface ThreadItem {
    thread: Thread,
}

export function ThreadItem({ thread }: ThreadItem) {
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
    const deleteThreadMutation = useDeleteThreadMutation();

    const createThread = (response: string) => {
        createThreadMutation.mutate({
            title: thread.title,
            key: thread.key.toString(),
            content: thread.content,
            response: response,
            user_external_id: user.external_id,
            workspace_id: selectedWorkspace.id.toString(),
            technology_id: thread.technology.id.toString(),
            provider_id: thread.provider.id.toString(),
            templates_ids: thread.metadata.templates.map(t => t.id.toString()),
            modifiers_ids: thread.metadata.modifiers.map(t => t.id.toString()),
            chat_messages: [],
            thread_parameters: []
        });
    }

    const updateThreadResponse = (response: string) => {
        updateThreadMutation.mutate({
            title: thread.title,
            key: (Number(thread.key) + 1).toString(),
            content: thread.content,
            response,
            user_external_id: user.external_id,
            workspace_id: selectedWorkspace.id.toString(),
            technology_id: thread.technology.id.toString(),
            provider_id: thread.provider.id.toString(),
            templates_ids: [],
            modifiers_ids: [],
            chat_messages: [],
            thread_parameters: []
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