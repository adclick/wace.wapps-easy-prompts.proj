import { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useTextGenerationQuery } from "../../../api/textGenerationApi";
import { Stack } from "@mantine/core";
import { Prompt } from "../../../models/Prompt";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { parseError } from "../../../services/ThreadService";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { Thread } from "../../../models/Thread";

interface ThreadTextGenerationProps {
    thread: Thread
}

const ThreadTextGeneration: FC<ThreadTextGenerationProps> = ({
    thread
}: ThreadTextGenerationProps) => {
    const [
        user,
        threads,
        setThreads
    ] = useStore(useShallow(state => [
        state.user,
        state.threads,
        state.setThreads
    ]));

    const { data, error } = useTextGenerationQuery(thread);

    const regenerate = () => {
        const newThread = new Thread();
        newThread.prompt = Prompt.clone(thread.prompt);
        newThread.key = thread.key + 1;
        newThread.response = "";

        const newThreads = threads.map(t => t.key === thread.key ? newThread : t);

        setThreads(newThreads);
    }

    if (error) {
        const message = parseError(error);

        return <Stack gap={"lg"}>
            {
                thread.prompt.id <= 0 &&
                <ThreadUserMessage
                    username={user.username}
                    userPicture={user.picture}
                    message={thread.prompt.content}
                />
            }
            <ThreadAssistantSuccessMessage message={message} reloadFn={regenerate} />
        </Stack>
    }

    if (data) {
        return <Stack gap={"lg"}>
            {
                thread.prompt.id <= 0 &&
                <ThreadUserMessage
                    username={user.username}
                    userPicture={user.picture}
                    message={thread.prompt.content}
                />
            }
            <ThreadAssistantSuccessMessage message={data.trim()} reloadFn={regenerate} />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    return <Stack gap={"lg"}>
        {
            thread.prompt.id <= 0 &&
            <ThreadUserMessage
                username={user.username}
                userPicture={user.picture}
                message={thread.prompt.content}
            />
        }
        <ThreadAssistantLoadingMessage />
    </Stack>

}

export default ThreadTextGeneration;