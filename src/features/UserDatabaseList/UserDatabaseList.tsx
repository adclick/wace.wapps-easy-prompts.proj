import { FC } from "react";
import { usePromptsHistoryQuery } from "../../api/promptsApi";
import { useUser } from "../../context/UserContext";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { PromptsList } from "../../components/Database/Prompts/PromptsList/PromptsList";

const UserDatabaseList: FC = () => {
    const { selectedFilters } = useSelectedFilters();
    const { user } = useUser();
    const promptsQuery = usePromptsHistoryQuery(user, selectedFilters);

    return (
        <PromptsList
            promptsQuery={promptsQuery}
            navbarMobileHandle={undefined}
            databaseListContainerRef={undefined}
        />
    )
}

export default UserDatabaseList;