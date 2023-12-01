import { Filters } from "../../model/Filters";
import { Box, Button, Card, Group, Input, Menu, Modal, Select, SimpleGrid, Stack, Switch, Tabs, Text, rem, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconPrompt, IconSparkles, IconSun, IconTemplate, IconUser } from "@tabler/icons-react";
import { useState } from "react";

interface UserProfileModal {
    user: any,
    userProfileOpened: boolean,
    closeUserProfile: () => void,
    filters: Filters,
    setFilters: any,
    refreshRepository: any
}

export function UserProfileModal({
    user,
    userProfileOpened,
    closeUserProfile,
    filters,
    setFilters,
    refreshRepository
}: UserProfileModal) {
    const updateLanguage = (value: string) => {
        setFilters({
            ...filters,
            language: value
        });
    }

    const apply = () => {
        refreshRepository(filters);
        closeUserProfile();
    }
    const theme = useMantineTheme();

    const sunIcon = (
        <IconSun
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.yellow[4]}
        />
    );

    const moonIcon = (
        <IconMoonStars
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.blue[6]}
        />
    );

    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <Modal opened={userProfileOpened} onClose={closeUserProfile} title="User Profile" size={"xl"}>
            <Card>
                <Stack gap={"lg"}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Text>Username</Text>
                        <Input value={user.nickname} disabled />
                        <Text>Email</Text>
                        <Input value={user.email} disabled />
                        <Text>Language</Text>
                        <Select
                            value={filters.language}
                            allowDeselect={false}
                            onChange={value => updateLanguage(value)}
                            data={[
                                { label: "English", value: "en" },
                                { label: "Portuguese", value: "pt" },
                            ]}
                        />
                        <Text>Theme</Text>
                        <Switch
                            size="md"
                            color="dark.4"
                            onLabel={sunIcon} offLabel={moonIcon}
                            onChange={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                        />

                    </SimpleGrid>
                    <Button onClick={apply} variant="light">Save</Button>
                </Stack>
            </Card>
        </Modal>
    );
}