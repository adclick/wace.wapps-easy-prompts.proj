import { FC, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useTextGenerationQuery } from "../../../api/textGenerationApi";
import { Stack } from "@mantine/core";
import { Prompt } from "../../../models/Prompt";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { parseError } from "../../../services/ThreadService";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { Thread } from "../../../models/Thread";
import { useCreateThreadMutation, useDeleteThreadMutation, useUpdateThreadMutation } from "../../../api/threadsApi";
import { useCreatePromptMutation } from "../../../api/promptsApi";
import { PromptStatus } from "../../../enums";

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
    const [regeneratedThread, setRegeneratedThread] = useState<Thread>(thread);

    const regenerate = () => {
        const newThread = Thread.clone(thread);
        newThread.key = thread.key + 1;
        newThread.response = "";

        setRegeneratedThread(newThread);

        
        // const newThreads = threads.map(t => t.key === thread.key ? newThread : t);
        
        // setThreads(newThreads);
        // refetch();
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

    if (isSuccess) {
        if (!promptSaved && thread.prompt.id <= 0) {
            const defaultRepository = user.repositories.find(r => r.default === true);
            const defaultWorkspace = user.workspaces.find(w => w.default === true);

            if (defaultRepository && defaultWorkspace) {
                console.log(thread);
                createPromptMutation.mutate({
                    title: thread.prompt.content,
                    content: thread.prompt.content,
                    status: PromptStatus.DRAFT,
                    description: thread.prompt.content,
                    language_id: user.language.id.toString(),
                    repository_id: defaultRepository.id.toString(),
                    technology_id: thread.prompt.technology.id.toString(),
                    provider_id: thread.prompt.provider.id.toString(),
                    user_id: user.external_id,
                    templates_ids: thread.prompt.prompts_templates.map(t => t.template.id.toString()),
                    modifiers_ids: thread.prompt.prompts_modifiers.map(m => m.modifier.id.toString()),
                    prompt_chat_messages: [],
                    prompt_parameters: []
                });

                setPromptSaved(true);
            }

        }
    }

    if (thread.response !== "") {
        return <Stack gap={"lg"}>
            {
                thread.prompt.id > 0 &&
                <ThreadUserMessage
                    username={user.username}
                    userPicture={user.picture}
                    message={thread.prompt.content}
                />
            }
            <ThreadAssistantSuccessMessage message={thread.response.trim()} reloadFn={regenerate} />
            <ThreadFooter thread={thread} />
        </Stack>
    }

    if (data) {
        console.log("data");
        if (!threadSaved) {
            if (thread.response === "" && thread.prompt.id > 0) {
                updateThreadMutation.mutate({
                    title: thread.prompt.title,
                    prompt_id: thread.prompt.id.toString(),
                    response: data.trim(),
                    workspace_id: selectedWorkspace.id.toString(),
                    key: thread.key.toString(),
                    user_id: user.external_id
                });
            }
            // Create thread based on published prompt
            if (thread.prompt.status === PromptStatus.PUBLISHED) {
                createThreadMutation.mutate({
                    title: thread.prompt.title,
                    prompt_id: thread.prompt.id.toString(),
                    response: data.trim(),
                    workspace_id: selectedWorkspace.id.toString(),
                    key: thread.key.toString(),
                    user_id: user.external_id
                });

                setThreadSaved(true);
            }

            // Create thread on draft prompt
            if (createPromptMutation.data) {
                const prompt = createPromptMutation.data;

                createThreadMutation.mutate({
                    title: prompt.title,
                    prompt_id: prompt.id.toString(),
                    response: data.trim(),
                    workspace_id: selectedWorkspace.id.toString(),
                    key: thread.key.toString(),
                    user_id: user.external_id
                });

                setThreadSaved(true);
            }
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