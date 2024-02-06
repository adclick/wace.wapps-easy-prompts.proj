import { Box, Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { PromptRequest, PromptRequestType } from "../../../../models/PromptRequest";
import { ThreadItem } from "../ThreadItem/ThreadItem";
import { useScrollIntoView } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { usePromptQuery } from "../../../../api/promptsApi";
import { Prompt } from "../../../../models/Prompt";
import { useSelectedTemplates } from "../../../../context/SelectedTemplatesContext";
import { useTemplateQuery } from "../../../../api/templatesApi";
import { Template } from "../../../../models/Template";
import { useModifierQuery } from "../../../../api/modifiersApi";
import { Modifier } from "../../../../models/Modifier";
import { useSelectedModifiers } from "../../../../context/SelectedModifiersContext";

export function ThreadList() {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
    const { setSelectedTemplates } = useSelectedTemplates()
    const { setSelectedModifiers } = useSelectedModifiers()

    const [urlPromptId, setUrlPromptId] = useState(0);
    const [urlTemplateId, setUrlTemplateId] = useState(0);
    const [urlModifierId, setUrlModifierId] = useState(0);
    const { data: urlPrompt } = usePromptQuery(urlPromptId);
    const { data: urlTemplate } = useTemplateQuery(urlTemplateId);
    const {data : urlModifier} = useModifierQuery(urlModifierId);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const promptId = params.get('prompt_id');
        const templateId = params.get('template_id');
        const modifierId = params.get('modifier_id');

        if (promptId && !isNaN(parseInt(promptId))) {
            setUrlPromptId(parseInt(promptId));

            if (urlPrompt) {
                const newPromptRequest = Prompt.clone(urlPrompt) as PromptRequest;
                newPromptRequest.key = Date.now();
                newPromptRequest.isPlayable = true;
                newPromptRequest.type = PromptRequestType.Prompt;

                setPromptsRequests([
                    ...promptsRequests,
                    newPromptRequest
                ]);
            }
        }

        if (templateId && !isNaN(parseInt(templateId))) {
            setUrlTemplateId(parseInt(templateId));

            if (urlTemplate) {
                const newTemplate = Template.clone(urlTemplate);
                setSelectedTemplates([
                    newTemplate
                ])
            }
        }

        if (modifierId && !isNaN(parseInt(modifierId))) {
            setUrlModifierId(parseInt(modifierId));

            if (urlModifier) {
                const newModifier = Modifier.clone(urlModifier);
                setSelectedModifiers([
                    newModifier
                ])
            }
        }
    }, [urlPrompt, urlTemplate, urlModifier])

    return (
        <Stack gap={"xl"} my={"xs"}>
            {
                promptsRequests.map((promptRequest: PromptRequest) => <ThreadItem
                    key={promptRequest.key}
                    promptRequest={promptRequest}
                    scrollIntoView={scrollIntoView}
                />)
            }
            <Box ref={targetRef}>
                {/* <ThreadsScrollToBottom /> */}
            </Box>
        </Stack>
    )
}