import { useModifierssQuery } from "../../../api/modifiersApi";
import { usePromptsQuery } from "../../../api/promptsApi";
import { usePromptsSelectedFilters } from "../../../context/PromptsSelectedFiltersContext";
import { useModifiersSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext"
import { useUser } from "../../../context/UserContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { ModifiersList } from "../Templates/TemplatesList/ModifiersList/ModifiersList";
import { PromptsList } from "../Prompts/PromptsList/PromptsList";
import { TemplatesList } from "../Templates/TemplatesList/TemplatesList";
import { useTemplatesSelectedFilters } from "../../../context/TemplatesSelectedFiltersContext";
import { useTemplatessQuery } from "../../../api/templatesApi";

export function DatabaseListContainer() {
    const { user } = useUser();
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const { promptsSelectedFilters } = usePromptsSelectedFilters();
    const { modifiersSelectedFilters } = useModifiersSelectedFilters();
    const { templatesSelectedFilters } = useTemplatesSelectedFilters();
    const promptsQuery = usePromptsQuery(user.id, promptsSelectedFilters);
    const modifiersQuery = useModifierssQuery(user.id, modifiersSelectedFilters);
    const templatesQuery = useTemplatessQuery(user.id, templatesSelectedFilters);

    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            return <PromptsList promptsQuery={promptsQuery} />
        case Type.MODIFIER:
            return <ModifiersList modifiersQuery={modifiersQuery} />
        case Type.TEMPLATE:
            return <TemplatesList templatesQuery={templatesQuery} />
    }
}