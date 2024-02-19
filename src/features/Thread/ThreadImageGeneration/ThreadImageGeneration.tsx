import { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useImageGenerationQuery } from "../../../api/imageGenerationApi";
import { Prompt } from "../../../models/Prompt";
import { parseError } from "../../../services/ThreadService";
import { Image, Stack } from "@mantine/core";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { ThreadDownloadButton } from "../../../components/Threads/Buttons/ThreadDownloadButton/ThreadDownloadButton";
import { Thread } from "../../../models/Thread";

interface ThreadImageGenerationProps {
    thread: Thread
}

const ThreadImageGeneration: FC<ThreadImageGenerationProps> = ({
    thread
}: ThreadImageGenerationProps) => {
    const [
        user,
        threads,
        setThreads
    ] = useStore(useShallow(state => [
        state.user,
        state.threads,
        state.setThreads
    ]));

    const { data, error } = useImageGenerationQuery(thread);

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
            <ThreadUserMessage username={user.username} userPicture={user.picture} message={thread.prompt.content} />
            <ThreadAssistantSuccessMessage message={message} reloadFn={regenerate} />
        </Stack>
    }

    if (data) {
        const message = <Stack>
            {
                typeof data === "object" &&
                data.map((src: string) => {
                    return (
                        <Stack gap={"xs"} key={src}>
                            <Image src={src} />
                            <ThreadDownloadButton url={src} />
                        </Stack>
                    )
                })
            }
        </Stack>

        return <Stack gap={"lg"}>
            <ThreadUserMessage username={user.username} userPicture={user.picture} message={thread.prompt.content} />
            <ThreadAssistantSuccessMessage message={message} copyButton={false} reloadFn={regenerate}  />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    return <Stack gap={"lg"}>
        <ThreadUserMessage username={user.username} userPicture={user.picture} message={thread.prompt.content} />
        <ThreadAssistantLoadingMessage />
    </Stack>
}

export default ThreadImageGeneration;