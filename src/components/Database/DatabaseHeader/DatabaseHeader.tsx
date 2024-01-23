import { useDisclosure } from "@mantine/hooks";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { useUser } from "../../../context/UserContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { ModifiersHeader } from "../Modifiers/ModifiersHeader/ModifiersHeader";
import { PromptsHeader } from "../Prompts/PromptsHeader/PromptsHeader";
import { Stack } from "@mantine/core";
import { useEffect } from "react";
import { TemplatesHeader } from "../Templates/TemplatesHeader/TemplatesHeader";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { SelectedFilters } from "../../../model/SelectedFilters";

interface DatabaseHeader {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
}

export function DatabaseHeader({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: DatabaseHeader) {
    const { user } = useUser();
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const [filtersOpened, filtersHandle] = useDisclosure(false);
        
    const selectedFiltersQuery = useFiltersQuery(user.id);
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();
    // Init selectedFilters
    useEffect(() => {
        if (selectedFilters.isEmpty && selectedFiltersQuery.data) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(selectedFiltersQuery.data);
            setSelectedFilters(newSelectedFilters);
        }
    }, [selectedFilters, selectedFiltersQuery]);


    let header = <></>;
    switch (selectedDatabaseType.type) {
        case Type.MODIFIER:
            header = <ModifiersHeader
                navbarMobileOpened={navbarMobileOpened}
                navbarDesktopOpened={navbarDesktopOpened}
                navbarMobileHandle={navbarMobileHandle}
                navbarDesktopHandle={navbarDesktopHandle}
                filtersHandle={filtersHandle}
            />
            break;
        case Type.TEMPLATE:
            header = <TemplatesHeader
                navbarMobileOpened={navbarMobileOpened}
                navbarDesktopOpened={navbarDesktopOpened}
                navbarMobileHandle={navbarMobileHandle}
                navbarDesktopHandle={navbarDesktopHandle}
                filtersHandle={filtersHandle}
            />
            break;
        case Type.PROMPT:
            header = <PromptsHeader
                navbarMobileOpened={navbarMobileOpened}
                navbarDesktopOpened={navbarDesktopOpened}
                navbarMobileHandle={navbarMobileHandle}
                navbarDesktopHandle={navbarDesktopHandle}
                filtersHandle={filtersHandle}
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
                selectedFiltersQuery={selectedFiltersQuery}
            />
        </Stack>
    )
}