import { FC } from "react";
import { PromptsList } from "../../components/Database/Prompts/PromptsList/PromptsList";
import { usePrivatePromptsQuery } from "../../api/promptsApi";
import { usePrivateTemplatesQuery } from "../../api/templatesApi";
import { usePrivateModifiersQuery } from "../../api/modifiersApi";
import { SelectedFilters } from "../../models/SelectedFilters";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";
import { TemplatesList } from "../../components/Database/Templates/TemplatesList/TemplatesList";
import { ModifiersList } from "../../components/Database/Modifiers/ModifiersList/ModifiersList";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Box } from "@mantine/core";

interface UserDatabaseListProps {
    selectedDatabaseType: SelectedDatabaseType,
    selectedFilters: SelectedFilters,
}

const UserDatabaseList: FC<UserDatabaseListProps> = ({
    selectedDatabaseType,
    selectedFilters
}: UserDatabaseListProps) => {
    const [user] = useStore(useShallow(state => [state.user]));
    const promptsQuery = usePrivatePromptsQuery(user, selectedFilters);
    const templatesQuery = usePrivateTemplatesQuery(user, selectedFilters);
    const modifiersQuery = usePrivateModifiersQuery(user, selectedFilters);

    return (
        <Box>
            {
                selectedDatabaseType.type === Type.PROMPT &&
                <PromptsList
                    promptsQuery={promptsQuery}
                    navbarMobileHandle={undefined}
                />
            }
            {
                selectedDatabaseType.type === Type.TEMPLATE &&
                <TemplatesList
                    templatesQuery={templatesQuery}
                />
            }
            {
                selectedDatabaseType.type === Type.MODIFIER &&
                <ModifiersList
                    modifiersQuery={modifiersQuery}
                />
            }
        </Box>

    )
}

export default UserDatabaseList;