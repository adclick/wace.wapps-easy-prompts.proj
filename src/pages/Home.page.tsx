import { useEffect } from 'react';
import { AppShell, Box, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { User } from '../model/User';
import { AppOverlay } from '../components/Layout/AppOverlay/AppOverlay';
import { useUser } from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useUsersLoginsQuery } from '../api/usersApi';
import { ThreadList } from '../components/Threads/ThreadList/ThreadList';
import { PromptContainer } from '../components/Prompt/PromptContainer/PromptContainer';
import classes from './Home.page.module.css';
import { DatabaseHeader } from '../components/Database/DatabaseHeader/DatabaseHeader';
import { DatabaseListContainer } from '../components/Database/DatabaseListContainer/DatabaseListContainer';
import { Header } from '../components/Layout/Header/Header';

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
    })

    return (
        <Box>
            <AppOverlay visible={overlayVisible} />
            <AppShell
                layout='alt'
                header={{ height: { base: 80 } }}
                footer={{ height: { base: 120 } }}
                navbar={{
                    width: { base: 300 },
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
                    <AppShell.Section grow component={ScrollArea} style={{ borderRadius: "1rem" }}>
                        <DatabaseListContainer />
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