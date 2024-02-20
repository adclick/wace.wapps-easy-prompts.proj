import { FC, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useTextGenerationQuery } from "../../../api/textGenerationApi";
import { Stack } from "@mantine/core";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { parseError } from "../../../services/ThreadService";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { Thread } from "../../../models/Thread";
import { useCreateThreadMutation, useDeleteThreadMutation, useUpdateThreadMutation } from "../../../api/threadsApi";
import { useCreatePromptMutation } from "../../../api/promptsApi";

interface ThreadTextGenerationProps {
    thread: Thread
}

const ThreadTextGeneration: FC<ThreadTextGenerationProps> = ({
    thread
}: ThreadTextGenerationProps) => {
    const [
        user,
        threads,
        setThreads,
        selectedWorkspace
    ] = useStore(useShallow(state => [
        state.user,
        state.threads,
        state.setThreads,
        state.selectedWorkspace
    ]));

    const { data, refetch, isSuccess, error } = useTextGenerationQuery(thread);
    const createPromptMutation = useCreatePromptMutation();
    const createThreadMutation = useCreateThreadMutation();
    const updateThreadMutation = useUpdateThreadMutation(thread.id)
    const deleteThreadMutation = useDeleteThreadMutation();
    const [promptSaved, setPromptSaved] = useState(false);
    const [threadSaved, setThreadSaved] = useState(false);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [regeneratedThread, setRegeneratedThread] = useState<Thread>(thread);

    const regenerate = () => {
        // console.log(thread);
        // const newThread = Thread.clone(thread);
        // newThread.id = 0;
        // newThread.key = thread.key + 1;
        // newThread.response = "";

        // const newThreads = threads.map(t => t.id === thread.id ? newThread : t);

        // setThreads(newThreads);
        refetch();
        setNeedUpdate(true);
    }

    if (isSuccess) {
        if (thread.id <= 0) {
            createThreadMutation.mutate({
                title: thread.title,
                key: thread.key.toString(),
                content: thread.content,
                response: data.trim(),
                user_external_id: user.external_id,
                workspace_id: selectedWorkspace.id.toString(),
                technology_id: thread.technology.id.toString(),
                provider_id: thread.provider.id.toString(),
                templates_ids: thread.metadata.templates.map(t => t.id.toString()),
                modifiers_ids: thread.metadata.modifiers.map(t => t.id.toString()),
                chat_messages: [],
                thread_parameters: []
            });

            setThreadSaved(true);
        } else if (needUpdate) {
            console.log('update with', data.trim());
            updateThreadMutation.mutate({
                title: thread.title,
                key: (thread.key + 1).toString(),
                content: thread.content,
                response: data.trim(),
                user_external_id: user.external_id,
                workspace_id: selectedWorkspace.id.toString(),
                technology_id: thread.technology.id.toString(),
                provider_id: thread.provider.id.toString(),
                templates_ids: [],
                modifiers_ids: [],
                chat_messages: [],
                thread_parameters: []
            });

            setNeedUpdate(false);
        }
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

    if (thread.response !== "") {
        return <Stack gap={"lg"}>
            {
                thread.id > 0 &&
                <ThreadUserMessage
                    username={user.username}
                    userPicture={user.picture}
                    message={thread.content}
                />
            }
            <ThreadAssistantSuccessMessage message={thread.response.trim()} reloadFn={regenerate} />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    if (data) {
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