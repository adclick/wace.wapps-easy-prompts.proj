import { useModifierssQuery } from "../../../api/modifiersApi";
import { usePromptsQuery } from "../../../api/promptsApi";
import { usePromptsSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";
import { useModifiersSelectedFilters } from "../../../context/PromptsSelectedFiltersContext";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext"
import { useUser } from "../../../context/UserContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { ModifiersList } from "../ModifiersList/ModifiersList";
import { PromptsList } from "../PromptsList/PromptsList";

export function DatabaseListContainer() {
    const { user } = useUser();
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const { promptsSelectedFilters } = usePromptsSelectedFilters();
    const { modifiersSelectedFilters } = useModifiersSelectedFilters();
    const promptsQuery = usePromptsQuery(user.id, promptsSelectedFilters);
    const modifiersQuery = useModifierssQuery(user.id, modifiersSelectedFilters);

    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            return <PromptsList promptsQuery={promptsQuery} />
        case Type.MODIFIER:
            return <ModifiersList modifiersQuery={modifiersQuery} />
    }
}