import { Type } from "../../../model/SelectedDatabaseType";
import { PromptRequest } from "../../../model/PromptRequest";
import { useCreateTemplateMutation } from "../../../api/templatesApi";
import { BaseForm } from "../BaseForm/BaseForm";

interface TemplateForm {
    promptRequest: PromptRequest | undefined
}

export function TemplateForm({ promptRequest }: TemplateForm) {
    const createMutation = useCreateTemplateMutation();

    return <BaseForm 
        promptRequest={promptRequest}
        createMutation={createMutation}
        type={Type.TEMPLATE}
        hasContent={false}
        hasTemplates={false}
        hasModifiers={true}
    />
}