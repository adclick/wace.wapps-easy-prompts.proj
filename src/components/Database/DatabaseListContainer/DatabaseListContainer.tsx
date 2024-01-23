import { useModifierssQuery } from "../../../api/modifiersApi";
import { usePromptsQuery } from "../../../api/promptsApi";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext"
import { useUser } from "../../../context/UserContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { ModifiersList } from "../Modifiers/ModifiersList/ModifiersList";
import { PromptsList } from "../Prompts/PromptsList/PromptsList";
import { TemplatesList } from "../Templates/TemplatesList/TemplatesList";
import { useTemplatessQuery } from "../../../api/templatesApi";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";

export function DatabaseListContainer() {
    const { user } = useUser();
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const { selectedFilters } = useSelectedFilters();
    const promptsQuery = usePromptsQuery(user.id, selectedFilters);
    const modifiersQuery = useModifierssQuery(user.id, selectedFilters);
    const templatesQuery = useTemplatessQuery(user.id, selectedFilters);

    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            return <PromptsList promptsQuery={promptsQuery} />
        case Type.MODIFIER:
            return <ModifiersList modifiersQuery={modifiersQuery} />
        case Type.TEMPLATE:
            return <TemplatesList templatesQuery={templatesQuery} />
    }
}