import { useDisclosure } from "@mantine/hooks";
import { useModifiersFiltersQuery } from "../../../api/modifiersApi";
import { usePromptsFiltersQuery } from "../../../api/promptsApi";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { useUser } from "../../../context/UserContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { ModifiersHeader } from "../ModifiersHeader/ModifiersHeader";
import { PromptsHeader } from "../PromptsHeader/PromptsHeader";
import { Stack } from "@mantine/core";
import { useEffect } from "react";
import { ModifiersSelectedFilters } from "../../../model/ModifiersSelectedFilters";
import { PromptsSelectedFilters } from "../../../model/PromptsSelectedFilters";
import { useModifiersSelectedFilters } from "../../../context/PromptsSelectedFiltersContext";
import { usePromptsSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";

interface DatabaseHeader {
    navbarOpened: boolean,
    navbarHandle: any,
}

export function DatabaseHeader({ navbarOpened, navbarHandle }: DatabaseHeader) {
    const { user } = useUser();
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const promptsFiltersQuery = usePromptsFiltersQuery(user.id);
    const modifiersFiltersQuery = useModifiersFiltersQuery(user.id);
    const [filtersOpened, filtersHandle] = useDisclosure(false);
    const { modifiersSelectedFilters, setModifiersSelectedFilters } = useModifiersSelectedFilters();

    const { promptsSelectedFilters, setPromptsSelectedFilters } = usePromptsSelectedFilters();

    // Init selectedFilters
    useEffect(() => {
        if (promptsSelectedFilters.isEmpty && promptsFiltersQuery.data) {
            const newSelectedFilters = PromptsSelectedFilters.buildFromQuery(promptsFiltersQuery.data);
            setPromptsSelectedFilters(newSelectedFilters);
        }
    }, [promptsSelectedFilters, promptsFiltersQuery])

    // Init selectedFilters
    useEffect(() => {
        if (modifiersSelectedFilters.isEmpty && modifiersFiltersQuery.data) {
            const newSelectedFilters = ModifiersSelectedFilters.buildFromQuery(modifiersFiltersQuery.data);
            setModifiersSelectedFilters(newSelectedFilters);
        }
    }, [modifiersSelectedFilters, modifiersFiltersQuery])

    let header = <></>;
    switch (selectedDatabaseType.type) {
        case Type.MODIFIER:
            header = <ModifiersHeader
                navbarOpened={navbarOpened}
                navbarHandle={navbarHandle}
                filtersHandle={filtersHandle}
                filtersQuery={modifiersFiltersQuery}
            />
            break;
        case Type.PROMPT:
            header = <PromptsHeader
                navbarOpened={navbarOpened}
                navbarHandle={navbarHandle}
                filtersHandle={filtersHandle}
                filtersQuery={promptsFiltersQuery}
            />
            break;
        default:
            header = <></>
    }

    return (
        <Stack gap={"lg"} pb={"xl"}>
            {header}
            <FiltersContainer
                opened={filtersOpened}
                handle={filtersHandle}
                promptsFiltersQuery={promptsFiltersQuery}
                modifiersFiltersQuery={modifiersFiltersQuery}
            />
        </Stack>
    )
}