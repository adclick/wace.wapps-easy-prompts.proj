import { Stack } from "@mantine/core";
import { ThreadItem } from "../ThreadItem/ThreadItem";
import { useEffect } from "react";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Thread } from "../../../../models/Thread";
import { useThreadsQuery } from "../../../../api/threadsApi";

export function ThreadList() {
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

    const {data: threadsData} = useThreadsQuery(user, selectedWorkspace.id);

    useEffect(() => {
        if (threadsData) {
            setThreads(threadsData);
        }
    }, [threadsData, setThreads])


    return (
        <Stack gap={"xl"} my={"xs"}>
            {
                threads.map((thread: Thread) => <ThreadItem
                    key={thread.key}
                    thread={thread}
                />)
            }
        </Stack>
    )
}