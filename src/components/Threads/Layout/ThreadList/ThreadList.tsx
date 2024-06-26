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
import { useTechnologiesQuery } from "../../../../api/technologiesApi";
import { Technology } from "../../../../models/Technology";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { Provider } from "../../../../models/Provider";
import { useSelectedDatabaseType } from "../../../../context/SelectedDatabaseTypeContext";
import { Label, LabelPlural, SelectedDatabaseType, Type } from "../../../../models/SelectedDatabaseType";

export function ThreadList() {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
    const { setSelectedTemplates } = useSelectedTemplates()
    const { setSelectedModifiers } = useSelectedModifiers()
    const { setSelectedDatabaseType } = useSelectedDatabaseType();

    const [urlPromptId, setUrlPromptId] = useState(0);
    const [urlTemplateId, setUrlTemplateId] = useState(0);
    const [urlModifierId, setUrlModifierId] = useState(0);
    const { data: urlPrompt } = usePromptQuery(urlPromptId);
    const { data: urlTemplate } = useTemplateQuery(urlTemplateId);
    const { data: urlModifier } = useModifierQuery(urlModifierId);
    const [urlUsed, setUrlUsed] = useState(false);

    const technologiesQuery = useTechnologiesQuery();

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
                const newPromptRequest = Prompt.clone(urlPrompt) as PromptRequest;
                newPromptRequest.key = Date.now();
                newPromptRequest.isPlayable = true;
                newPromptRequest.type = PromptRequestType.Prompt;

                setPromptsRequests([
                    ...promptsRequests,
                    newPromptRequest
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

                const newType = new SelectedDatabaseType();
                newType.type = Type.TEMPLATE;
                newType.label = Label.Tempalate;
                newType.labelPlural = LabelPlural.Tempalates;
                setSelectedDatabaseType(newType);

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
                
                const newType = new SelectedDatabaseType();
                newType.type = Type.MODIFIER;
                newType.label = Label.Modifier;
                newType.labelPlural = LabelPlural.Modifiers;
                setSelectedDatabaseType(newType);

                setUrlUsed(true);
            }
        } else if (technologiesQuery.data) {
            technology = technologiesQuery.data[0];
        }

        if (userPromptRequest.technology.id <= 0) {
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.technology = Technology.clone(technology);
            newUserRequest.provider = Provider.clone(provider);
            setUserPromptRequest(newUserRequest);
        }
    }, [technologiesQuery, userPromptRequest, setUserPromptRequest])

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
            </Box>
        </Stack>
    )
}