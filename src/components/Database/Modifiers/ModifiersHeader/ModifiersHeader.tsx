import { Box, Group } from "@mantine/core";
import { HeaderBurgerMenu } from "../../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../../DatabaseMenu/DatabaseMenu";
import { NavbarToggleIcon } from "../../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";
import { FiltersToggleIcon } from "../../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";

interface ModifiersHeader {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
    filtersHandle: any,
}

export function ModifiersHeader({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
    filtersHandle,
}: ModifiersHeader) {
    return (
        <Group h={"100%"} justify='space-between' pt={"xs"}>
            <Group>
                <Box hiddenFrom="sm">
                    <HeaderBurgerMenu navbarOpened={navbarMobileOpened} navbarHandle={navbarMobileHandle} />
                </Box>
                <DatabaseMenu />
            </Group>
            <Group gap={"xs"}>
                {/* <DatabaseAddIcon onClick={newModifierModalHandle.open} /> */}
                <FiltersToggleIcon onClick={filtersHandle.toggle} />
                <Box visibleFrom="sm">
                    <NavbarToggleIcon navbarOpened={navbarDesktopOpened} navbarToggle={navbarDesktopHandle.toggle} />
                </Box>
            </Group>
        </Group>
    )
}