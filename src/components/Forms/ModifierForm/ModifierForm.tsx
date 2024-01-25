import { Type } from "../../../model/SelectedDatabaseType";
import { PromptRequest } from "../../../model/PromptRequest";
import { useCreateModifierMutation } from "../../../api/modifiersApi";
import { BaseForm } from "../BaseForm/BaseForm";

interface ModifierForm {
    promptRequest: PromptRequest | undefined
    handle: any
}

export function ModifierForm({ promptRequest, handle }: ModifierForm) {
    const createMutation = useCreateModifierMutation();

    return <BaseForm
        promptRequest={promptRequest}
        createMutation={createMutation}
        type={Type.MODIFIER}
        hasContent={true}
        hasTemplates={false}
        hasModifiers={false}
        handle={handle}
    />
}