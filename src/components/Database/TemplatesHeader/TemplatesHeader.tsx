import { Box, Group } from "@mantine/core";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../DatabaseMenu/DatabaseMenu";
import { useDisclosure } from "@mantine/hooks";
import { NewTemplateModal } from "../NewTemplateModal/NewTemplateModal";
import { FiltersToggleIcon } from "../../Common/Icons/FiltersToggleIcon/FiltersToggleIcon";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";

interface TemplatesHeader {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
    filtersHandle: any,
    filtersOpened: boolean
}

export function TemplatesHeader({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
    filtersHandle,
    filtersOpened
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
                    <FiltersToggleIcon filled={filtersOpened} onClick={filtersHandle.toggle} />
                    <Box visibleFrom="sm">
                    <NavbarToggleIcon navbarOpened={navbarDesktopOpened} navbarToggle={navbarDesktopHandle.toggle} />
                    </Box>
                </Group>
            </Group>
        </>
    )
}