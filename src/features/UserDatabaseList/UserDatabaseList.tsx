import { FC } from "react";
import { PromptsList } from "../../components/Database/Prompts/PromptsList/PromptsList";
import { usePrivatePromptsQuery } from "../../api/promptsApi";
import { usePrivateTemplatesQuery } from "../../api/templatesApi";
import { usePrivateModifiersQuery } from "../../api/modifiersApi";
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
    
    const promptsQuery = usePrivatePromptsQuery(user, selectedPrivateFilters);
    const templatesQuery = usePrivateTemplatesQuery(user, selectedPrivateFilters);
    const modifiersQuery = usePrivateModifiersQuery(user, selectedPrivateFilters);

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