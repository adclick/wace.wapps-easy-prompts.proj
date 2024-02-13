import { useDisclosure } from "@mantine/hooks";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { ActionIcon, Box, Card, Collapse, Group, Stack, Title } from "@mantine/core";
import { useEffect } from "react";
import { usePrivateFiltersQuery } from "../../../api/filtersApi";
import { SelectedFilters } from "../../../models/SelectedFilters";
import { HeaderBurgerMenu } from "../../Common/HeaderBurgerMenu/HeaderBurgerMenu";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";
import UserDatabseToggleMenu from "../../../features/UserDatabaseToggleMenu/UserDatabaseToggleMenu";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { CreateModifierButton } from "../../../features/CreateModifierButton/CreateModifierButton";
import { DatabaseAddIcon } from "../../Common/Icons/DatabaseAddIcon/DatabaseAddIcon";
import { CreateTemplateButton } from "../../../features/CreateTemplateButton/CreateTemplateButton";
import { iconClose } from "../../../utils/iconsUtils";

interface DatabaseHeader {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
}

export function SidebarHeader({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: DatabaseHeader) {
    const [
        user,
        selectedPrivateFilters,
        selectedPrivateDatabaseType,
        setSelectedPrivateFilters,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedPrivateFilters,
        state.selectedPrivateDatabaseType,
        state.setSelectedPrivateFilters,
        state.setSelectedPrivateDatabaseType,

    ]));
    const [filtersOpened, filtersHandle] = useDisclosure(false);
    const selectedFiltersQuery = usePrivateFiltersQuery(user);
    const [createItemOpened, createItemHandle] = useDisclosure(false);

    // Init selectedFilters
    useEffect(() => {
        if (selectedPrivateFilters.isEmpty && selectedFiltersQuery.data) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(selectedFiltersQuery.data);
            setSelectedPrivateFilters(newSelectedFilters);
        }
    }, [selectedPrivateFilters, selectedFiltersQuery]);

    return (
        <>
            <Stack gap={"lg"} pb={"xl"}>
                <Group h={"100%"} justify='space-between' pt={"xs"}>
                    <Group>
                        <Box hiddenFrom="sm">
                            <HeaderBurgerMenu navbarOpened={navbarMobileOpened} navbarHandle={navbarMobileHandle} />
                        </Box>
                        <UserDatabseToggleMenu
                            selectedDatabaseType={selectedPrivateDatabaseType}
                            setSelectedDatabaseType={setSelectedPrivateDatabaseType}
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
                    selectedFilters={selectedPrivateFilters}
                    setSelectedFilters={setSelectedPrivateFilters}
                />
            </Stack>
        </>
    )
}