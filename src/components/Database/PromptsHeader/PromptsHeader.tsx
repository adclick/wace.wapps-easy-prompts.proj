import { Box, Group } from "@mantine/core";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../DatabaseMenu/DatabaseMenu";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";

interface PromptsHeader {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
    filtersHandle: any
}

export function PromptsHeader({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
    filtersHandle,
}: PromptsHeader) {
    return (
        <Group h={"100%"} justify='space-between' pt={"xs"}>
            <Group>
                <Box hiddenFrom="sm">
                    <HeaderBurgerMenu navbarOpened={navbarMobileOpened} navbarHandle={navbarMobileHandle} />
                </Box>
                <DatabaseMenu />
            </Group>
            <Group gap={"xs"}>
                <FiltersToggleIcon onClick={filtersHandle.open} />
                <Box visibleFrom="sm">
                    <NavbarToggleIcon navbarOpened={navbarDesktopOpened} navbarToggle={navbarDesktopHandle.toggle} />
                </Box>
            </Group>
        </Group>
    )
}