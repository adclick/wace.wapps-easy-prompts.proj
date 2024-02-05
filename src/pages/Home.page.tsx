import { useEffect, useRef } from 'react';
import { AppShell, Box, ScrollArea } from '@mantine/core';
import { useDisclosure, useIntersection } from '@mantine/hooks';
import { User } from '../models/User';
import { useAuth0 } from '@auth0/auth0-react';
import { useUsersLoginsQuery } from '../api/usersApi';
import classes from './Home.page.module.css';
import { Header } from '../components/Layout/Header/Header';
import { DatabaseHeader } from '../components/Database/DatabaseHeader/DatabaseHeader';
import { DatabaseListContainer } from '../components/Database/DatabaseListContainer/DatabaseListContainer';
import { ThreadList } from '../components/Threads/Layout/ThreadList/ThreadList';
import { PromptContainer } from '../components/Prompt/PromptContainer/PromptContainer';
import { AppOverlay } from '../components/Layout/AppOverlay/AppOverlay';
import { useUser } from '../context/UserContext';

export function HomePage() {
    const [navbarMobileOpened, navbarMobileHandle] = useDisclosure(false);
    const [navbarDesktopOpened, navbarDesktopHandle] = useDisclosure(true);
    const [overlayVisible, overlayHandle] = useDisclosure(true);
    const { user, setUser } = useUser();
    const auth0 = useAuth0();
    const userLoginQuery = useUsersLoginsQuery(user);

    // Initialize User with Auth0 info
    useEffect(() => {
        if (user.isEmpty) {
            setUser(User.buildFromAuth0(auth0.user))
        }
    });

    // Login User on Database
    useEffect(() => {
        if (userLoginQuery.data) {
            setUser({ ...user, isLoggedIn: true });

            overlayHandle.close();
        }
    });



    const databaseListContainerRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
        root: databaseListContainerRef.current,
        threshold: 1,
    });

    return (
        <Box>
            <AppOverlay visible={overlayVisible} />
            <AppShell
                layout='alt'
                header={{ height: { base: 80 } }}
                footer={{ height: { base: 130 } }}
                navbar={{
                    width: { base: 350 },
                    breakpoint: 'sm',
                    collapsed: { mobile: !navbarMobileOpened, desktop: !navbarDesktopOpened },
                }}
            >
                <AppShell.Header withBorder={false} p={"md"} className={classes.header} >
                    <Header
                        navbarMobileOpened={navbarMobileOpened}
                        navbarDesktopOpened={navbarDesktopOpened}
                        navbarMobileHandle={navbarMobileHandle}
                        navbarDesktopHandle={navbarDesktopHandle}
                    />
                </AppShell.Header>

                <AppShell.Navbar withBorder={false} p="md" className={classes.navbar}>
                    <AppShell.Section >
                        <DatabaseHeader
                            navbarMobileOpened={navbarMobileOpened}
                            navbarDesktopOpened={navbarDesktopOpened}
                            navbarMobileHandle={navbarMobileHandle}
                            navbarDesktopHandle={navbarDesktopHandle}
                        />
                    </AppShell.Section>
                    <AppShell.Section ref={databaseListContainerRef} grow component={ScrollArea} style={{ borderRadius: "1rem" }}>
                        <DatabaseListContainer navbarMobileHandle={navbarMobileHandle} databaseListContainerRef={databaseListContainerRef} />
                    </AppShell.Section>
                </AppShell.Navbar>

                <AppShell.Main className={classes.main}>
                    <ThreadList />
                </AppShell.Main>

                <AppShell.Footer withBorder={false} className={classes.footer}>
                    <PromptContainer />
                </AppShell.Footer>
            </AppShell>
        </Box>
    );
}