import { Stack } from "@mantine/core";
import { FC, useEffect } from "react";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Thread } from "../../../models/Thread";
import { useThreadsQuery } from "../../../api/threadsApi";
import ThreadCard from "../ThreadCard/ThreadCard";

const ThreadList: FC = () => {
    const [
        user,
        selectedWorkspace,
        threads,
        setThreads,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedWorkspace,
        state.threads,
        state.setThreads,
    ]));

    const { data: threadsData } = useThreadsQuery(user, selectedWorkspace.id);

    // Sync server state threads from selected workspace
    useEffect(() => {
        if (threadsData) {
            setThreads(threadsData);
        }
    }, [threadsData, setThreads])

    return (
        <Stack gap={"xl"} my={"xs"}>
            {
                threads.map((thread: Thread) => (
                    <ThreadCard
                        key={thread.key}
                        thread={thread}
                    />
                ))
            }
        </Stack>
    )
}

export default ThreadList;