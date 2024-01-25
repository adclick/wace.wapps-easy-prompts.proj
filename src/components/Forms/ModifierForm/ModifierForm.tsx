import { Type } from "../../../model/SelectedDatabaseType";
import { PromptRequest } from "../../../model/PromptRequest";
import { useCreateModifierMutation } from "../../../api/modifiersApi";
import { BaseForm } from "../BaseForm/BaseForm";

interface ModifierForm {
    promptRequest: PromptRequest | undefined
}

export function ModifierForm({ promptRequest }: ModifierForm) {
    const createMutation = useCreateModifierMutation();

    return <BaseForm
        promptRequest={promptRequest}
        createMutation={createMutation}
        type={Type.MODIFIER}
        hasContent={true}
        hasTemplates={false}
        hasModifiers={false}
    />
}