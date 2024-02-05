import { Type } from "../../../models/SelectedDatabaseType";
import { PromptRequest } from "../../../models/PromptRequest";
import { useCreateTemplateMutation } from "../../../api/templatesApi";
import { BaseForm } from "../BaseForm/BaseForm";

interface TemplateForm {
    promptRequest: PromptRequest | undefined,
    handle: any
}

export function TemplateForm({ promptRequest, handle }: TemplateForm) {
    const createMutation = useCreateTemplateMutation();

    return <BaseForm 
        promptRequest={promptRequest}
        createMutation={createMutation}
        type={Type.TEMPLATE}
        hasContent={false}
        hasTemplates={false}
        hasModifiers={true}
        handle={handle}
    />
}