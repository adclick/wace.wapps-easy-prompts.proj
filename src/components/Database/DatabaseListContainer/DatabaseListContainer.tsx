import { usePromptsQuery } from "../../../api/promptsApi";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext"
import { useUser } from "../../../context/UserContext";
import { Type } from "../../../models/SelectedDatabaseType";
import { ModifiersList } from "../Modifiers/ModifiersList/ModifiersList";
import { PromptsList } from "../Prompts/PromptsList/PromptsList";
import { TemplatesList } from "../Templates/TemplatesList/TemplatesList";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { useModifiersQuery } from "../../../api/modifiersApi";
import { useTemplatesQuery } from "../../../api/templatesApi";
import { RefObject } from "react";

interface DatabaseListContainer {
    navbarMobileHandle: any,
    databaseListContainerRef: RefObject<HTMLDivElement>
}

export function DatabaseListContainer({ navbarMobileHandle, databaseListContainerRef }: DatabaseListContainer) {
    const { user } = useUser();
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const { selectedFilters } = useSelectedFilters();
    const promptsQuery = usePromptsQuery(user.id, selectedFilters, selectedDatabaseType.type === Type.PROMPT);
    const templatesQuery = useTemplatesQuery(user.id, selectedFilters, selectedDatabaseType.type === Type.TEMPLATE);
    const modifiersQuery = useModifiersQuery(user.id, selectedFilters, selectedDatabaseType.type === Type.MODIFIER);

    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            return <PromptsList
                databaseListContainerRef={databaseListContainerRef}
                promptsQuery={promptsQuery}
                navbarMobileHandle={navbarMobileHandle}
            />
        case Type.MODIFIER:
            return <ModifiersList
                databaseListContainerRef={databaseListContainerRef}
                modifiersQuery={modifiersQuery}
            />
        case Type.TEMPLATE:
            return <TemplatesList
                databaseListContainerRef={databaseListContainerRef}
                templatesQuery={templatesQuery}
            />
    }
}