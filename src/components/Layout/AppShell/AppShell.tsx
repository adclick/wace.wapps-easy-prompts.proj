import { AppShell as MantineAppShell, ScrollArea } from '@mantine/core';
import { FC } from "react";
import Sidebar from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { useDisclosure } from '@mantine/hooks';
import classes from './AppShell.module.css';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';
import { SidebarFooter } from '../SidebarFooter/SidebarFooter';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';

export const AppShell: FC = () => {
    const [navbarMobileOpened, navbarMobileHandle] = useDisclosure(false);
    const [navbarDesktopOpened, navbarDesktopHandle] = useDisclosure(true);

    return (
        <MantineAppShell
            layout='alt'
            header={{ height: { base: 80 } }}
            footer={{ height: { base: 130 } }}
            navbar={{
                width: { base: 350 },
                breakpoint: 'sm',
                collapsed: { mobile: !navbarMobileOpened, desktop: !navbarDesktopOpened },
            }}
        >
            <MantineAppShell.Header withBorder={false} p={"md"} className={classes.header} >
                <Header
                    navbarMobileOpened={navbarMobileOpened}
                    navbarDesktopOpened={navbarDesktopOpened}
                    navbarMobileHandle={navbarMobileHandle}
                    navbarDesktopHandle={navbarDesktopHandle}
                />
            </MantineAppShell.Header>

            <MantineAppShell.Navbar withBorder={false} p="md" className={classes.navbar}>
                <MantineAppShell.Section >
                    <SidebarHeader
                        navbarMobileOpened={navbarMobileOpened}
                        navbarDesktopOpened={navbarDesktopOpened}
                        navbarMobileHandle={navbarMobileHandle}
                        navbarDesktopHandle={navbarDesktopHandle}
                    />
                </MantineAppShell.Section>

                <MantineAppShell.Section grow component={ScrollArea} style={{ borderRadius: "1rem" }}>
                    <Sidebar />
                </MantineAppShell.Section>

                <MantineAppShell.Section >
                    <SidebarFooter />
                </MantineAppShell.Section>
            </MantineAppShell.Navbar>

            <MantineAppShell.Main className={classes.main}>
                <Main />
            </MantineAppShell.Main>

            <MantineAppShell.Footer withBorder={false} className={classes.footer}>
                <Footer />
            </MantineAppShell.Footer>
        </MantineAppShell>
    )
}