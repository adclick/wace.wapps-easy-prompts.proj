import { FC, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useImageGenerationQuery } from "../../../api/imageGenerationApi";
import { parseError } from "../../../services/ThreadService";
import { Image, Stack } from "@mantine/core";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { ThreadDownloadButton } from "../../../components/Threads/Buttons/ThreadDownloadButton/ThreadDownloadButton";
import { Thread } from "../../../models/Thread";

interface ThreadImageGenerationProps {
    thread: Thread,
    createThread: (response: string) => void,
    updateThreadResponse: (response: string) => void,
    scrollIntoView: any
}

const ThreadImageGeneration: FC<ThreadImageGenerationProps> = ({
    thread,
    createThread,
    updateThreadResponse,
    scrollIntoView
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

    const [threadProcessed, setThreadProcessed] = useState(false);
    const [processing, setProcessing] = useState(false);

    const { data, isFetching, error } = useImageGenerationQuery(thread);

    const regenerate = () => {
        updateThreadResponse("");
        setProcessing(true);
        setThreadProcessed(false);
    }

    const getMessageFromThreadResponse = (content: string) => {
        const images = JSON.parse(content);
        console.log(images);

        return (
            <Stack>
                {
                    images.map((src: string) => {
                        return (
                            <Stack gap={"xs"} key={src}>
                                <Image src={src} />
                                <ThreadDownloadButton url={src} />
                            </Stack>
                        )
                    })
                }
            </Stack>
        )
    }

    if (error) {
        const message = parseError(error);

        return <Stack gap={"lg"}>
            <ThreadUserMessage
                username={user.username}
                userPicture={user.picture}
                message={thread.content}
            />
            <ThreadAssistantSuccessMessage message={message} reloadFn={regenerate} />
        </Stack>
    }

    if (isFetching) {
        scrollIntoView({ alignment: 'start' });
    }

    if (!processing && thread.response !== "") {
        const message = getMessageFromThreadResponse(thread.response);

        return <Stack gap={"lg"}>
            <ThreadUserMessage
                username={user.username}
                userPicture={user.picture}
                message={thread.content}
            />
            <ThreadAssistantSuccessMessage message={message} copyButton={false} reloadFn={regenerate} />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    if (data) {
        scrollIntoView({ alignment: 'start' });
        const content = JSON.stringify(data);

        if (!threadProcessed) {
            if (thread.id > 0) {
                updateThreadResponse(content);
            } else {
                createThread(content);
            }
            setThreadProcessed(true);
        }

        const message = getMessageFromThreadResponse(content);

        return <Stack gap={"lg"}>
            <ThreadUserMessage username={user.username} userPicture={user.picture} message={thread.content} />
            <ThreadAssistantSuccessMessage message={message} copyButton={false} reloadFn={regenerate} />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    return <Stack gap={"lg"}>
        <ThreadUserMessage username={user.username} userPicture={user.picture} message={thread.content} />
        <ThreadAssistantLoadingMessage />
    </Stack>
}

export default ThreadImageGeneration;