import { useEffect } from 'react';
import { AppShell, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { User } from '../models/User';
import { useAuth0 } from '@auth0/auth0-react';
import { useUsersLoginsQuery } from '../api/usersApi';
import classes from './Home.page.module.css';
import { Header } from '../components/Layout/Header/Header';
import { ThreadList } from '../components/Threads/Layout/ThreadList/ThreadList';
import { PromptContainer } from '../components/Prompt/PromptContainer/PromptContainer';
import { AppOverlay } from '../components/Layout/AppOverlay/AppOverlay';
import { useUser } from '../context/UserContext';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import { useStore } from '../stores/store';

export function HomePage() {
    const [navbarMobileOpened, navbarMobileHandle] = useDisclosure(false);
    const [navbarDesktopOpened, navbarDesktopHandle] = useDisclosure(true);
    const [overlayVisible, overlayHandle] = useDisclosure(true);
    
    const { user, setUser } = useUser();
    // const {user, setUser} = useStore();
    console.log(user);
    
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
            setUser({
                ...user,
                history_repository_id: userLoginQuery.data.history_repository_id,
                isLoggedIn: true
            });

            overlayHandle.close();
        }
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

                <Sidebar
                    navbarMobileOpened={navbarMobileOpened}
                    navbarDesktopOpened={navbarDesktopOpened}
                    navbarMobileHandle={navbarMobileHandle}
                    navbarDesktopHandle={navbarDesktopHandle}
                />

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