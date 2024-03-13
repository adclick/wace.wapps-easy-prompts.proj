import { FC, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";
import { useSearchParams } from "react-router-dom";
import { usePromptQuery } from "../../api/promptsApi";
import { Thread } from "../../models/Thread";
import { getDefaultProvider } from "../../api/providersApi";
import { Workspace } from "../../models/Workspace";
import { useCreateThreadMutation } from "../../api/threadsApi";
import { useTemplateQuery } from "../../api/templatesApi";
import { useModifierQuery } from "../../api/modifiersApi";
import { Technology } from "../../models/Technology";
import { Provider } from "../../models/Provider";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";

const ShareableLinks: FC = () => {
    const [
        user,
        selectedModifiers,
        selectedTemplates,
        nextThread,
        threads,
        selectedWorkspace,
        setSelectedTemplates,
        setSelectedModifiers,
        setThreads,
        setSelectedPrivateDatabaseType
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedModifiers,
        state.selectedTemplates,
        state.nextThread,
        state.threads,
        state.selectedWorkspace,
        state.setSelectedTemplates,
        state.setSelectedModifiers,
        state.setThreads,
        state.setSelectedPrivateDatabaseType
    ]));

    const [searchParams] = useSearchParams();

    const promptId = searchParams.get('prompt_id') || '';
    const templateId = searchParams.get('template_id') || '';
    const modifierId = searchParams.get('modifier_id') || '';

    const { data: prompt } = usePromptQuery(user, searchParams.get('prompt_id') || '');
    const { data: template } = useTemplateQuery(templateId);
    const { data: modifier } = useModifierQuery(modifierId);


    const [shareableLinkExecuted, setShareableLinkExecuted] = useState(false);
    const createThreadMutation = useCreateThreadMutation();


    const executeShareablePrompt = async () => {
        if (!shareableLinkExecuted && prompt) {
            setShareableLinkExecuted(true);

            const thread = Thread.buildFromPrompt(prompt);
            thread.threads_chat_messages.pop();
            thread.key = Date.now();

            // If there is no provider, get the default one
            if (!thread.provider) {
                thread.provider = await getDefaultProvider(thread.technology);
            }

            console.log(thread);

            createThreadMutation.mutate({
                title: thread.title,
                key: thread.key.toString(),
                content: thread.content,
                response: '',
                collapsed: false,
                user_external_id: user.external_id,
                workspace_id: selectedWorkspace.uuid,
                technology_id: thread.technology.uuid,
                provider_id: thread.provider.uuid,
                templates_ids: thread.threads_templates.map(t => t.template.uuid),
                modifiers_ids: thread.threads_modifiers.map(t => t.modifier.uuid),
                chat_messages: [],
                thread_parameters: thread.threads_parameters
            });

            setSelectedPrivateDatabaseType(new SelectedDatabaseType(Type.PROMPT));
        }
    }

    const executeShareableTemplate = async () => {
        if (!shareableLinkExecuted && template) {
            setShareableLinkExecuted(true);

            setSelectedTemplates([
                ...selectedTemplates,
                template
            ]);

            setSelectedPrivateDatabaseType(new SelectedDatabaseType(Type.TEMPLATE));
        }
    }

    const executeShareableModifier = async () => {
        if (!shareableLinkExecuted && modifier) {
            setShareableLinkExecuted(true);

            setSelectedModifiers([
                ...selectedModifiers,
                modifier
            ])

            setSelectedPrivateDatabaseType(new SelectedDatabaseType(Type.MODIFIER))
        }
    }

    useEffect(() => {
        executeShareablePrompt();
        executeShareableTemplate();
        executeShareableModifier();
    }, [prompt, template, modifier])

    return <></>
}

export default ShareableLinks;