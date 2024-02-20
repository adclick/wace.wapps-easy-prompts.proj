import { useDisclosure } from "@mantine/hooks";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { Card, Collapse, Group, Stack } from "@mantine/core";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../../stores/store";
import ThreadChat from "../../../../features/Thread/ThreadChat/ThreadChat";
import ThreadTextGeneration from "../../../../features/Thread/ThreadTextGeneration/ThreadTextGeneration";
import ThreadImageGeneration from "../../../../features/Thread/ThreadImageGeneration/ThreadImageGeneration";
import { Thread } from "../../../../models/Thread";
import { useDeleteThreadMutation } from "../../../../api/threadsApi";

interface ThreadItem {
    thread: Thread,
    scrollIntoView: any
}

export function ThreadItem({ thread, scrollIntoView }: ThreadItem) {
    const [
        threads,
        setThreads,
    ] = useStore(useShallow(state => [
        state.threads,
        state.setThreads
    ]));

    const [minimized, minimizeHandle] = useDisclosure(false);
    const deleteThreadMutation = useDeleteThreadMutation();

    const deleteThread = (thread: Thread) => {
        setThreads(threads.filter((t) => t.key !== thread.key));
        deleteThreadMutation.mutate(thread.id);
    }

    let threadComponent = <></>;

    switch (thread.prompt.technology.slug) {
        case 'text-generation':
            threadComponent = <ThreadTextGeneration
                thread={thread}
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
            />;
            break;
    }

    return (
        <Group justify="center" >
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