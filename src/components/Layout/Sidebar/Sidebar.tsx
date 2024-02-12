import { AppShell, Divider, ScrollArea } from "@mantine/core";
import { FC, useState } from "react";
import { DatabaseHeader } from "../../Database/DatabaseHeader/DatabaseHeader";
import { PublicDatabasePanel, UserDatabaseList } from "../../../features";
import { SelectedFilters } from "../../../models/SelectedFilters";
import { SelectedDatabaseType } from "../../../models/SelectedDatabaseType";
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
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(new SelectedFilters());
    const [selectedDatabaseType, setSelectedDatabaseType] = useState<SelectedDatabaseType>(new SelectedDatabaseType());
    
    return (
        <AppShell.Navbar withBorder={false} p="md" className={classes.navbar}>
            <AppShell.Section >
                <DatabaseHeader
                    selectedDatabaseType={selectedDatabaseType}
                    setSelectedDatabaseType={setSelectedDatabaseType}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    navbarMobileOpened={navbarMobileOpened}
                    navbarDesktopOpened={navbarDesktopOpened}
                    navbarMobileHandle={navbarMobileHandle}
                    navbarDesktopHandle={navbarDesktopHandle}
                />
            </AppShell.Section>
            <AppShell.Section grow component={ScrollArea} style={{ borderRadius: "1rem" }}>
                <UserDatabaseList
                    selectedDatabaseType={selectedDatabaseType}
                    selectedFilters={selectedFilters}
                />
            </AppShell.Section>
            <AppShell.Section >
                <Divider my={"xs"} />
                <PublicDatabasePanel />
            </AppShell.Section>
        </AppShell.Navbar>
    )
}

export default Sidebar;