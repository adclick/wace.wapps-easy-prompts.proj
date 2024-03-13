import { FC } from "react";
import { PromptsList } from "../../components/Database/Prompts/PromptsList/PromptsList";
import { usePromptsQuery } from "../../api/promptsApi";
import { useTemplatesQuery } from "../../api/templatesApi";
import { useModifiersQuery } from "../../api/modifiersApi";
import { Type } from "../../models/SelectedDatabaseType";
import { TemplatesList } from "../../components/Database/Templates/TemplatesList/TemplatesList";
import { ModifiersList } from "../../components/Database/Modifiers/ModifiersList/ModifiersList";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Box } from "@mantine/core";

const UserDatabaseList: FC = () => {
    const [
        user,
        selectedPrivateFilters,
        selectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedPrivateFilters,
        state.selectedPrivateDatabaseType
    ]));
    
    const promptsQuery = usePromptsQuery(user, selectedPrivateFilters);
    const templatesQuery = useTemplatesQuery(user, selectedPrivateFilters);
    const modifiersQuery = useModifiersQuery(user, selectedPrivateFilters);

    return (
        <Box>
            {
                selectedPrivateDatabaseType.type === Type.PROMPT &&
                <PromptsList
                    promptsQuery={promptsQuery}
                    navbarMobileHandle={undefined}
                />
            }
            {
                selectedPrivateDatabaseType.type === Type.TEMPLATE &&
                <TemplatesList
                    templatesQuery={templatesQuery}
                />
            }
            {
                selectedPrivateDatabaseType.type === Type.MODIFIER &&
                <ModifiersList
                    modifiersQuery={modifiersQuery}
                />
            }
        </Box>

    )
}

export default UserDatabaseList;