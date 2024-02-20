import { Box, Stack } from "@mantine/core";
import { ThreadItem } from "../ThreadItem/ThreadItem";
import { useScrollIntoView } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { usePromptQuery } from "../../../../api/promptsApi";
import { Prompt } from "../../../../models/Prompt";
import { useTemplateQuery } from "../../../../api/templatesApi";
import { Template } from "../../../../models/Template";
import { useModifierQuery } from "../../../../api/modifiersApi";
import { Modifier } from "../../../../models/Modifier";
import { useTechnologiesQuery } from "../../../../api/technologiesApi";
import { Technology } from "../../../../models/Technology";
import { Provider } from "../../../../models/Provider";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Thread } from "../../../../models/Thread";
import { useThreadsQuery } from "../../../../api/threadsApi";

export function ThreadList() {
    const [
        user,
        selectedWorkspace,
        threads,
        nextThread,
        setThreads,
        setSelectedTemplates,
        setSelectedModifiers,
        setNextThread
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedWorkspace,
        state.threads,
        state.nextThread,
        state.setThreads,
        state.setSelectedTemplates,
        state.setSelectedModifiers,
        state.setNextThread
    ]));

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

    const [urlPromptId, setUrlPromptId] = useState(0);
    const [urlTemplateId, setUrlTemplateId] = useState(0);
    const [urlModifierId, setUrlModifierId] = useState(0);
    const { data: urlPrompt } = usePromptQuery(urlPromptId);
    const { data: urlTemplate } = useTemplateQuery(urlTemplateId);
    const { data: urlModifier } = useModifierQuery(urlModifierId);
    const [urlUsed, setUrlUsed] = useState(false);

    const {data: threadsData} = useThreadsQuery(user, selectedWorkspace.id);

    useEffect(() => {
        if (threadsData) {
            setThreads(threadsData);
        }
    }, [threadsData, setThreads])

    const technologiesQuery = useTechnologiesQuery(user);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const promptId = params.get('prompt_id');
        const templateId = params.get('template_id');
        const modifierId = params.get('modifier_id');
        let technology = new Technology();
        let provider = new Provider();

        if (promptId && !isNaN(parseInt(promptId)) && !urlUsed) {
            setUrlPromptId(parseInt(promptId));

            if (urlPrompt) {
                const newNextThread = Thread.clone(nextThread);
                newNextThread.prompt = Prompt.clone(urlPrompt);
                newNextThread.key = Date.now();

                setThreads([
                    ...threads,
                    newNextThread
                ]);

                setUrlUsed(true);
            }
        } else if (templateId && !isNaN(parseInt(templateId)) && !urlUsed) {
            setUrlTemplateId(parseInt(templateId));

            if (urlTemplate) {
                const newTemplate = Template.clone(urlTemplate);
                setSelectedTemplates([
                    newTemplate
                ]);

                technology = Technology.clone(urlTemplate.technology);

                if (urlTemplate.provider) {
                    provider = Provider.clone(urlTemplate.provider);
                }


                setUrlUsed(true);
            }
        } else if (modifierId && !isNaN(parseInt(modifierId)) && !urlUsed) {
            setUrlModifierId(parseInt(modifierId));

            if (urlModifier) {
                const newModifier = Modifier.clone(urlModifier);
                setSelectedModifiers([
                    newModifier
                ])

                technology = Technology.clone(newModifier.technology);

                if (newModifier.provider) {
                    provider = Provider.clone(newModifier.provider);
                }
                

                setUrlUsed(true);
            }
        } else if (technologiesQuery.data) {
            technology = technologiesQuery.data[0];
        }

        if (technology.id > 0 && nextThread.prompt.technology.id <= 0) {
            const newNextThread = Thread.clone(nextThread);
            newNextThread.prompt.technology = Technology.clone(technology);
            newNextThread.prompt.provider = Provider.clone(provider);
            setNextThread(newNextThread);
        }
    }, [technologiesQuery, nextThread, setNextThread])

    return (
        <Stack gap={"xl"} my={"xs"}>
            {
                threads.map((thread: Thread) => <ThreadItem
                    key={thread.key}
                    thread={thread}
                    scrollIntoView={scrollIntoView}
                />)
            }
            <Box ref={targetRef}>
            </Box>
        </Stack>
    )
}