import { useDisclosure } from "@mantine/hooks";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { Box, Collapse, Group, Stack } from "@mantine/core";
import { useEffect } from "react";
import { usePrivateFiltersQuery } from "../../../api/filtersApi";
import { SelectedFilters } from "../../../models/SelectedFilters";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";
import UserDatabseToggleMenu from "../../../features/UserDatabaseToggleMenu/UserDatabaseToggleMenu";
import { SelectedDatabaseType } from "../../../models/SelectedDatabaseType";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { CreateModifierButton } from "../../../features/CreateModifierButton/CreateModifierButton";

interface DatabaseHeader {
    selectedDatabaseType: SelectedDatabaseType,
    setSelectedDatabaseType: React.Dispatch<React.SetStateAction<SelectedDatabaseType>>
    selectedFilters: SelectedFilters,
    setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
}

export function DatabaseHeader({
    selectedDatabaseType,
    setSelectedDatabaseType,
    selectedFilters,
    setSelectedFilters,
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: DatabaseHeader) {
    const [user] = useStore(useShallow(state => [state.user]));

    const [filtersOpened, filtersHandle] = useDisclosure(false);

    const selectedFiltersQuery = usePrivateFiltersQuery(user);

    // Init selectedFilters
    useEffect(() => {
        if (selectedFilters.isEmpty && selectedFiltersQuery.data) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(selectedFiltersQuery.data);
            setSelectedFilters(newSelectedFilters);
        }
    }, [selectedFilters, selectedFiltersQuery]);

    return (
        <>
            <Stack gap={"lg"} pb={"xl"}>
                <Group h={"100%"} justify='space-between' pt={"xs"}>
                    <Group>
                        <Box hiddenFrom="sm">
                            <HeaderBurgerMenu navbarOpened={navbarMobileOpened} navbarHandle={navbarMobileHandle} />
                        </Box>
                        <UserDatabseToggleMenu
                            selectedDatabaseType={selectedDatabaseType}
                            setSelectedDatabaseType={setSelectedDatabaseType}
                        />
                    </Group>
                    <Group gap={"xs"}>
                        <CreateModifierButton />
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
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
            </Stack>
        </>
    )
}