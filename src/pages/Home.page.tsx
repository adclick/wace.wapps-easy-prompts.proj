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
    const [navbarOpened, navbarHandle] = useDisclosure(false);
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
                footer={{ height: { base: 130 } }}
                navbar={{
                    width: { base: 350 },
                    breakpoint: 'sm',
                    collapsed: { mobile: !navbarOpened },
                }}
            >
                <AppShell.Header withBorder={false} p={"md"} >
                    <Header navbarOpened={navbarOpened} navbarHandle={navbarHandle} />
                </AppShell.Header>

                <AppShell.Navbar withBorder={false} p="md" className={classes.navbar}>
                    <AppShell.Section >
                        <DatabaseHeader navbarOpened={navbarOpened} navbarHandle={navbarHandle} />
                    </AppShell.Section>
                    <AppShell.Section grow component={ScrollArea} style={{ borderRadius: "1rem" }}>
                        <DatabaseListContainer />
                    </AppShell.Section>
                </AppShell.Navbar>

                <AppShell.Main>
                    <ThreadList />
                </AppShell.Main>

                <AppShell.Footer withBorder={false}>
                    <PromptContainer />
                </AppShell.Footer>
            </AppShell>
        </Box>
    );
}