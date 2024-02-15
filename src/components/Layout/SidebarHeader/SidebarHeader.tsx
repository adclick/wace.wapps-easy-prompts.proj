import { useDisclosure } from "@mantine/hooks";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { Collapse, Group, Stack } from "@mantine/core";
import { FC, useEffect } from "react";
import { usePrivateFiltersQuery } from "../../../api/filtersApi";
import { SelectedFilters } from "../../../models/SelectedFilters";
import SidebarHamburgerSwitcher from "../../../features/SidebarHamburgerSwitcher/SidebarHamburgerSwitcher";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import SidebarCollapseSwitcher from "../../../features/SidebarCollapseSwitcher/SidebarCollapseSwitcher";
import UserDatabseToggleMenu from "../../../features/UserDatabaseToggleMenu/UserDatabaseToggleMenu";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { DatabaseAddIcon } from "../../Common/Icons/DatabaseAddIcon/DatabaseAddIcon";
import { CreateUserItemSection } from "../../../features/CreateUserItemSection/CreateUserItemSection";
import { DesktopContainer, MobileContainer } from "../../UI/Layout";
import { BooleanHandle } from "../../../types";

interface SidebarHeaderProps {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: BooleanHandle,
    navbarDesktopHandle: BooleanHandle,
}

const SidebarHeader: FC<SidebarHeaderProps> = ({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: SidebarHeaderProps) => {
    const [
        selectedPrivateDatabaseType,
        setSelectedPrivateDatabaseType,
    ] = useStore(useShallow(state => [
        state.selectedPrivateDatabaseType,
        state.setSelectedPrivateDatabaseType,

    ]));
    const [filtersOpened, filtersHandle] = useDisclosure(false);
    const [createItemOpened, createItemHandle] = useDisclosure(false);

    return (
        <Stack gap={"lg"} pb={"xl"}>
            <Group justify='space-between' pt={"xs"}>
                <Group>
                    <MobileContainer>
                        <SidebarHamburgerSwitcher
                            navbarOpened={navbarMobileOpened}
                            navbarHandle={navbarMobileHandle}
                        />
                    </MobileContainer>
                    <UserDatabseToggleMenu
                        selectedDatabaseType={selectedPrivateDatabaseType}
                        setSelectedDatabaseType={setSelectedPrivateDatabaseType}
                    />
                </Group>
                <Group gap={"xs"}>
                    <DatabaseAddIcon
                        onClick={createItemHandle.toggle}
                        createItemOpened={createItemOpened}
                    />
                    <FiltersToggleIcon
                        onClick={filtersHandle.toggle}
                        filtersOpened={filtersOpened}
                    />
                    <DesktopContainer>
                        <SidebarCollapseSwitcher
                            navbarOpened={navbarDesktopOpened}
                            navbarToggle={navbarDesktopHandle.toggle}
                        />
                    </DesktopContainer>
                </Group>
            </Group>
            <CreateUserItemSection
                opened={createItemOpened}
                handle={createItemHandle}
            />
            <FiltersContainer
                opened={filtersOpened}
                handle={filtersHandle}
            />
        </Stack>
    )
}

export default SidebarHeader;