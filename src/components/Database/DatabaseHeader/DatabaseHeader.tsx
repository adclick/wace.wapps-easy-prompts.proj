import { useDisclosure } from "@mantine/hooks";
import { useUser } from "../../../context/UserContext";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { Box, Group, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useFiltersQuery, usePrivateFiltersQuery } from "../../../api/filtersApi";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { SelectedFilters } from "../../../models/SelectedFilters";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../DatabaseMenu/DatabaseMenu";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";
import { DatabaseAddIcon } from "../../Common/Icons/DatabaseAddIcon/DatabaseAddIcon";
import UserDatabseToggleMenu from "../../../features/UserDatabaseToggleMenu/UserDatabaseToggleMenu";

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
    const [filtersOpened, filtersHandle] = useDisclosure(false);
        
    const selectedFiltersQuery = usePrivateFiltersQuery(user);
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();
    
    // Init selectedFilters
    useEffect(() => {
        if (selectedFilters.isEmpty && selectedFiltersQuery.data) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(selectedFiltersQuery.data);
            setSelectedFilters(newSelectedFilters);
        }
    }, [selectedFilters, selectedFiltersQuery]);

    return (
        <Stack gap={"lg"} pb={"xl"}>
            <Group h={"100%"} justify='space-between' pt={"xs"}>
                <Group>
                    <Box hiddenFrom="sm">
                        <HeaderBurgerMenu navbarOpened={navbarMobileOpened} navbarHandle={navbarMobileHandle} />
                    </Box>
                    <UserDatabseToggleMenu />
                </Group>
                <Group gap={"xs"}>
                    <DatabaseAddIcon />
                    <FiltersToggleIcon onClick={filtersHandle.toggle} filtersOpened={filtersOpened} />
                    <Box visibleFrom="sm">
                        <NavbarToggleIcon navbarOpened={navbarDesktopOpened} navbarToggle={navbarDesktopHandle.toggle} />
                    </Box>
                </Group>
            </Group>
            <FiltersContainer
                opened={filtersOpened}
                handle={filtersHandle}
                selectedFiltersQuery={selectedFiltersQuery}
            />
        </Stack>
    )
}