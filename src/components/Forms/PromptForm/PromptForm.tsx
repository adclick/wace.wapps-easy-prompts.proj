import { useCreatePromptMutation } from "../../../api/promptsApi";
import { Type } from "../../../model/SelectedDatabaseType";
import { PromptRequest } from "../../../model/PromptRequest";
import { BaseForm } from "../BaseForm/BaseForm";

interface PromptForm {
    promptRequest: PromptRequest | undefined,
    handle: any
}

export function PromptForm({ promptRequest, handle }: PromptForm) {
    const createMutation = useCreatePromptMutation();

    return <BaseForm
        promptRequest={promptRequest}
        createMutation={createMutation}
        type={Type.PROMPT}
        hasContent={true}
        hasTemplates={true}
        hasModifiers={true}
        handle={handle}
    />
}