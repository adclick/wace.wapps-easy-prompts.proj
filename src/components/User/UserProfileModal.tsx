import { Filters } from "../../model/Filters";
import { Box, Button, Card, Group, Input, Menu, Modal, Select, SimpleGrid, Stack, Switch, Tabs, Text, rem, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconMoonStars, IconPrompt, IconSparkles, IconSun, IconTemplate, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { useFilters } from "../../context/FiltersContext";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { useAuth0 } from "@auth0/auth0-react";

interface UserProfileModal {
    userProfileOpened: boolean,
    closeUserProfile: () => void,
    aiMediatorClient: AIMediatorClient
    refreshRepository: any
}

export function UserProfileModal({
    userProfileOpened,
    closeUserProfile,
    aiMediatorClient,
    refreshRepository
}: UserProfileModal) {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const { filters } = useFilters();
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();
    const mantineTheme = useMantineTheme();
    const [language, setLanguage] = useState(selectedFilters.language);
    const [theme, setTheme] = useState(computedColorScheme);
    const { user } = useAuth0();

    console.log(selectedFilters.language);

    const updateLanguage = (language: string | null) => {
        if (language) {
            const newSelectedFilters = {
                ...selectedFilters,
                language
            };
    
            setSelectedFilters(newSelectedFilters);
            refreshRepository(newSelectedFilters);
        }
    }

    const updateTheme = () => {
        const newTheme = computedColorScheme === 'light' ? 'dark' : 'light';
        setColorScheme(newTheme)
        setTheme(newTheme);
    }

    const apply = async () => {
        if (user !== undefined && "sub" in user && user.sub !== undefined) {
            closeUserProfile();

            await aiMediatorClient.updateUser(user.sub, selectedFilters.language, theme);

            notifications.show({
                title: 'Profile Saved',
                message: 'Your settings were saved',
            });
        }
    }

    const sunIcon = (
        <IconSun
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={mantineTheme.colors.yellow[4]}
        />
    );

    const moonIcon = (
        <IconMoonStars
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={mantineTheme.colors.blue[6]}
        />
    );

    const languagesOptions = filters.languages.map(l => {
        return {
            label: l.name,
            value: l.slug
        }
    });

    const nickname = user?.nickname !== undefined ? user.nickname : "";
    const email = user?.email !== undefined ? user.email : "";

    return (
        <Modal opened={userProfileOpened} onClose={closeUserProfile} title="Settings" size={"xl"}>
            <Card>
                <Stack gap={"lg"}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Text>Username</Text>
                        <Input value={nickname} disabled />
                        <Text>Email</Text>
                        <Input value={email} disabled />
                        <Text>Language</Text>
                        <Select
                            value={selectedFilters.language}
                            allowDeselect={false}
                            onChange={updateLanguage}
                            data={languagesOptions}
                        />
                        <Text>Theme</Text>
                        <Switch
                            size="md"
                            color="dark.4"
                            onLabel={sunIcon} offLabel={moonIcon}
                            onChange={updateTheme}
                        />

                    </SimpleGrid>
                    <Button onClick={apply} variant="light">Save</Button>
                </Stack>
            </Card>
        </Modal>
    );
}