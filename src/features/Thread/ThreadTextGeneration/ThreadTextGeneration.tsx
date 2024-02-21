import { FC, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useTextGenerationQuery } from "../../../api/textGenerationApi";
import { Stack } from "@mantine/core";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { parseError } from "../../../services/ThreadService";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { Thread } from "../../../models/Thread";

interface ThreadTextGenerationProps {
    thread: Thread,
    createThread: (response: string) => void,
    updateThreadResponse: (response: string) => void,
    scrollIntoView: any
}

const ThreadTextGeneration: FC<ThreadTextGenerationProps> = ({
    thread,
    createThread,
    updateThreadResponse,
    scrollIntoView
}: ThreadTextGenerationProps) => {
    const [user] = useStore(useShallow(state => [state.user]));

    const { data, isFetching, error } = useTextGenerationQuery(thread);
    const [threadProcessed, setThreadProcessed] = useState(false);
    const [processing, setProcessing] = useState(false);

    const regenerate = () => {
        updateThreadResponse("");
        setProcessing(true);
        setThreadProcessed(false);
    }

    if (error) {
        const message = parseError(error);

        return <Stack gap={"lg"}>
            {
                thread.id <= 0 &&
                <ThreadUserMessage
                    username={user.username}
                    userPicture={user.picture}
                    message={thread.content}
                />
            }
            <ThreadAssistantSuccessMessage message={message} reloadFn={regenerate} />
        </Stack>
    }

    if (isFetching) {
        scrollIntoView({alignment: 'start'});
    }

    if (!processing && thread.response !== "") {
        return <Stack gap={"lg"}>
            <ThreadUserMessage
                username={user.username}
                userPicture={user.picture}
                message={thread.content}
            />
            <ThreadAssistantSuccessMessage message={thread.response.trim()} reloadFn={regenerate} />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    if (data) {
        scrollIntoView({alignment: 'start'});

        if (!threadProcessed) {
            if (thread.id > 0) {
                updateThreadResponse(data.trim());
            } else {
                createThread(data.trim());
            }
            setThreadProcessed(true);
        }

        return <Stack gap={"lg"}>
            <ThreadUserMessage
                username={user.username}
                userPicture={user.picture}
                message={thread.content}
            />
            <ThreadAssistantSuccessMessage message={data.trim()} reloadFn={regenerate} />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    return <Stack gap={"lg"}>
        <ThreadUserMessage
            username={user.username}
            userPicture={user.picture}
            message={thread.content}
        />
        <ThreadAssistantLoadingMessage />
    </Stack>

}

export default ThreadTextGeneration;