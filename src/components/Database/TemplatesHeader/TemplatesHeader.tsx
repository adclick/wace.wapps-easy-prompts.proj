import { Box, Group } from "@mantine/core";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../DatabaseMenu/DatabaseMenu";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";

interface TemplatesHeader {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
    filtersHandle: any,
}

export function TemplatesHeader({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
    filtersHandle,
}: TemplatesHeader) {
    return (
        <>
            <Group h={"100%"} justify='space-between' pt={"xs"}>
                <Group>
                    <Box hiddenFrom="sm">
                    <HeaderBurgerMenu navbarOpened={navbarMobileOpened} navbarHandle={navbarMobileHandle} />
                    </Box>
                    <DatabaseMenu />
                </Group>
                <Group gap={"xs"}>
                    <FiltersToggleIcon onClick={filtersHandle.toggle} />
                    <Box visibleFrom="sm">
                    <NavbarToggleIcon navbarOpened={navbarDesktopOpened} navbarToggle={navbarDesktopHandle.toggle} />
                    </Box>
                </Group>
            </Group>
        </>
    )
}