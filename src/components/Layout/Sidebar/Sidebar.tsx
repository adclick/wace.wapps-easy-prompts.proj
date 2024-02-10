import { AppShell, Divider, ScrollArea } from "@mantine/core";
import { FC } from "react";
import { DatabaseHeader } from "../../Database/DatabaseHeader/DatabaseHeader";
import { PublicDatabasePanel, UserDatabaseList } from "../../../features";
import classes from './Sidebar.module.css'

interface Handle {
    open: () => void,
    close: () => void,
    toggle: () => void,
}

interface SidebarProps {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: Handle,
    navbarDesktopHandle: Handle
}

const Sidebar: FC<SidebarProps> = ({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle
}: SidebarProps) => {
    return (
        <AppShell.Navbar withBorder={false} p="md" className={classes.navbar}>
            <AppShell.Section >
                <DatabaseHeader
                    navbarMobileOpened={navbarMobileOpened}
                    navbarDesktopOpened={navbarDesktopOpened}
                    navbarMobileHandle={navbarMobileHandle}
                    navbarDesktopHandle={navbarDesktopHandle}
                />
            </AppShell.Section>
            <AppShell.Section grow component={ScrollArea} style={{ borderRadius: "1rem" }}>
                <UserDatabaseList />
            </AppShell.Section>
            <AppShell.Section >
                <Divider my={"xs"} />
                <PublicDatabasePanel />
            </AppShell.Section>
        </AppShell.Navbar>
    )
}

export default Sidebar;