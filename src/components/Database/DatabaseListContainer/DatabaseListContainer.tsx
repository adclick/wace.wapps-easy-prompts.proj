import { usePromptsQuery } from "../../../api/promptsApi";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext"
import { useUser } from "../../../context/UserContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { ModifiersList } from "../Modifiers/ModifiersList/ModifiersList";
import { PromptsList } from "../Prompts/PromptsList/PromptsList";
import { TemplatesList } from "../Templates/TemplatesList/TemplatesList";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { useModifiersQuery } from "../../../api/modifiersApi";
import { useTemplatesQuery } from "../../../api/templatesApi";

export function DatabaseListContainer() {
    const { user } = useUser();
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const { selectedFilters } = useSelectedFilters();
    const promptsQuery = usePromptsQuery(user.id, selectedFilters);
    const modifiersQuery = useModifiersQuery(user.id, selectedFilters);
    const templatesQuery = useTemplatesQuery(user.id, selectedFilters);

    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            return <PromptsList promptsQuery={promptsQuery} />
        case Type.MODIFIER:
            return <ModifiersList modifiersQuery={modifiersQuery} />
        case Type.TEMPLATE:
            return <TemplatesList templatesQuery={templatesQuery} />
    }
}