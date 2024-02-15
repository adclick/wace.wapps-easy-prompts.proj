import { useDisclosure } from "@mantine/hooks";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { ActionIcon, Box, Card, Collapse, Group, Stack, Title } from "@mantine/core";
import { useEffect } from "react";
import { usePrivateFiltersQuery } from "../../../api/filtersApi";
import { SelectedFilters } from "../../../models/SelectedFilters";
import { HeaderBurgerMenu } from "../../../features/SidebarHamburgerSwitcher/SidebarHamburgerSwitcher";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import { NavbarToggleIcon } from "../../../features/SidebarCollapseSwitcher/SidebarCollapseSwitcher";
import UserDatabseToggleMenu from "../../../features/UserDatabaseToggleMenu/UserDatabaseToggleMenu";
import { SelectedDatabaseType } from "../../../models/SelectedDatabaseType";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { CreateModifierButton } from "../../../features/CreateModifierButton/CreateModifierButton";
import { DatabaseAddIcon } from "../../Common/Icons/DatabaseAddIcon/DatabaseAddIcon";
import { CreateTemplateButton } from "../../../features/CreateTemplateButton/CreateTemplateButton";
import { iconClose } from "../../../utils/iconsUtils";

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
    const [createItemOpened, createItemHandle] = useDisclosure(false);

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
                        <DatabaseAddIcon onClick={createItemHandle.toggle} createItemOpened={createItemOpened} />
                        <FiltersToggleIcon onClick={filtersHandle.toggle} filtersOpened={filtersOpened} />
                        <Box visibleFrom="sm">
                            <NavbarToggleIcon navbarOpened={navbarDesktopOpened} navbarToggle={navbarDesktopHandle.toggle} />
                        </Box>
                    </Group>
                </Group>
                <Collapse in={createItemOpened}>
                    <Card>
                        <Stack>
                            <Group justify="space-between">
                                <Title order={5}>Create a new Item</Title>
                                <ActionIcon
                                    color="gray"
                                    variant="transparent"
                                    onClick={createItemHandle.close}
                                >

                                    {iconClose(14)}
                                </ActionIcon>
                            </Group>
                        <CreateTemplateButton />
                        <CreateModifierButton />
                        </Stack>
                    </Card>
                </Collapse>
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