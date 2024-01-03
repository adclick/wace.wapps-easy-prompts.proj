import { useEffect } from 'react';
import { AppShell, Box, Burger, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { User } from '../model/User';
import { Options } from '../model/Options';
import { AppOverlay } from '../components/Layout/AppOverlay/AppOverlay';
import { CraftsContainer } from '../components/Crafts/CraftsContainer/CraftsContainer';
import { CraftsContainerHeader } from '../components/Crafts/CraftsContainerHeader/CraftsContainerHeader';
import { useUser } from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useUsersLoginsQuery } from '../api/usersApi';
import { useOptionsQuery } from '../api/optionsApi';
import { useOptions } from '../context/OptionsContext';
import { ColorSchemeToggle } from '../components/Layout/ColorSchemeToggle/ColorSchemeToggle';
import classes from './Home.page.module.css';
import { ChatMenu } from '../components/Chat/ChatMenu/ChatMenu';
import { useThreads } from '../context/ThreadsContext';
import { ChatContainer } from '../components/Chat/ChatContainer/ChatContainer';

export function HomePage() {
    const [navbarOpened, navbarHandle] = useDisclosure();
    const [overlayVisible, overlayHandle] = useDisclosure(true);
    const { user, setUser } = useUser();
    const { options, setOptions } = useOptions();
    const auth0 = useAuth0();
    const userLoginQuery = useUsersLoginsQuery(user);
    const optionsQuery = useOptionsQuery();

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
                isLoggedIn: true
            });

            overlayHandle.close();
        }
    })

    // Set options
    useEffect(() => {
        if (optionsQuery.data) {
            setOptions(Options.buildFromQuery(optionsQuery.data))
        }
    })

    return (
        <Box>
            <AppOverlay visible={overlayVisible} />
            <AppShell
                layout='alt'
                header={{
                    height: { base: 80 },
                }}
                navbar={{
                    width: { base: 350 },
                    breakpoint: 'sm',
                    collapsed: { mobile: !navbarOpened },
                }}
                footer={{
                    height: { base: 110 }
                }}
            >
                <AppShell.Header withBorder={false} p={"md"} >
                    <Group h={"100%"} justify="space-between" align="center">
                        <Group align="center" gap={"xs"}>
                            <Burger
                                opened={navbarOpened}
                                onClick={navbarHandle.toggle}
                                hiddenFrom="sm"
                                size="sm"
                            />
                            <ChatMenu />
                        </Group>
                        <Group>
                            <ColorSchemeToggle />
                            {/* <UserMenu
                                threads={threads}
                                setThreads={setThreads}
                                scrollIntoView={scrollIntoView}
                            /> */}
                        </Group>
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar withBorder={false} p="md" className={classes.navbar}>
                    <AppShell.Section >
                        <CraftsContainerHeader
                            navbarOpened={navbarOpened}
                            toggleNavbar={navbarHandle.toggle}
                        />
                    </AppShell.Section>
                    <AppShell.Section grow component={ScrollArea} style={{ borderRadius: "1rem" }}>
                        <CraftsContainer />
                    </AppShell.Section>
                </AppShell.Navbar>

                <AppShell.Main>
                    <ChatContainer />
                </AppShell.Main>

                <AppShell.Footer withBorder={false}>
                    {/* <ChatToolbar
                        aIMediatorClient={aIMediatorClient}
                        scrollIntoView={scrollIntoView}
                        threads={threads}
                        setThreads={setThreads}
                        user={currentUser}
                        repository={repository}
                        repositorySelectedItems={repositorySelectedItems}
                        setRepositorySelectedItems={setRepositorySelectedItems}
                        openRepositoryItemDetailsSelected={openRepositoryItemDetailsSelected}
                    /> */}
                </AppShell.Footer>
            </AppShell>
        </Box>
    );
}