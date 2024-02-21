import { FC, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useTextGenerationQuery } from "../../../api/textGenerationApi";
import { Stack } from "@mantine/core";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { parseError } from "../../../services/ThreadService";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { Thread } from "../../../models/Thread";
import { useCreateThreadMutation, useUpdateThreadMutation } from "../../../api/threadsApi";

interface ThreadTextGenerationProps {
    thread: Thread
}

const ThreadTextGeneration: FC<ThreadTextGenerationProps> = ({
    thread
}: ThreadTextGenerationProps) => {
    const [
        user,
        selectedWorkspace
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedWorkspace
    ]));

    const { data, error } = useTextGenerationQuery(thread);
    const createThreadMutation = useCreateThreadMutation();
    const updateThreadMutation = useUpdateThreadMutation(thread.id)
    const [threadProcessed, setThreadProcessed] = useState(false);
    const [processing, setProcessing] = useState(false);

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
        setProcessing(false);

        if (!threadProcessed) {
            if (thread.id > 0) {
                updateThreadResponse(data.trim());
            } else {
                createThread(data.trim());
            }
            setThreadProcessed(true);
        }

        return <Stack gap={"lg"}>
            {
                thread.id <= 0 &&
                <ThreadUserMessage
                    username={user.username}
                    userPicture={user.picture}
                    message={thread.content}
                />
            }
            <ThreadAssistantSuccessMessage message={data.trim()} reloadFn={regenerate} />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    return <Stack gap={"lg"}>
        {
            thread.id <= 0 &&
            <ThreadUserMessage
                username={user.username}
                userPicture={user.picture}
                message={thread.content}
            />
        }
        <ThreadAssistantLoadingMessage />
    </Stack>

}

export default ThreadTextGeneration;