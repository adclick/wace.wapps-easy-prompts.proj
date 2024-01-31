import { ActionIcon, Anchor, Box, Button, Group, Title } from "@mantine/core";
import { HeaderBurgerMenu } from "../HeaderBurgerMenu/HeaderBurgerMenu";
import { ThreadsMenu } from "../../Threads/Layout/ThreadsMenu/ThreadsMenu";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { UserMenu } from "../../User/UserMenu/UserMenu";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";
import { IconClearAll, IconHome, IconPlayerPlayFilled } from "@tabler/icons-react";

interface Header {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
}

export function Header({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: Header) {
    return (
        <Group h={"100%"} justify="space-between" align="center">
            <Group h={"100%"} gap={"xs"}>
                <Box visibleFrom="sm" >
                    {
                        !navbarDesktopOpened && <NavbarToggleIcon navbarOpened={navbarDesktopOpened} navbarToggle={navbarDesktopHandle.toggle} />
                    }
                </Box>
                <Box hiddenFrom="sm" mb={3}>
                    <HeaderBurgerMenu navbarOpened={navbarMobileOpened} navbarHandle={navbarMobileHandle} />
                </Box>
                <Anchor c={"gray"} underline="never" href="/">
                    <Title order={3}>
                        EasyPrompts
                    </Title>
                </Anchor>
                <ActionIcon>
                    <IconClearAll />
                </ActionIcon>
                {/* <ThreadsMenu /> */}
            </Group>
            <Group>
                <ColorSchemeToggle />
                <UserMenu />
            </Group>
        </Group>
    )
}