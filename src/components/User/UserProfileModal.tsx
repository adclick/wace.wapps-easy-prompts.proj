import { Box, Button, Card, Group, Input, Menu, Modal, Select, SimpleGrid, Stack, Tabs, Text, rem } from "@mantine/core";
import { IconPrompt, IconSparkles, IconTemplate, IconUser } from "@tabler/icons-react";

interface UserProfileModal {
    user: any,
    userProfileOpened: boolean,
    closeUserProfile: () => void
}

export function UserProfileModal({ user, userProfileOpened, closeUserProfile }: UserProfileModal) {
    return (
        <Modal opened={userProfileOpened} onClose={closeUserProfile} title="User Profile" size={"xl"}>
            <Tabs defaultValue="general" orientation="vertical" my={"md"}>
                <Tabs.List>
                    <Tabs.Tab py={"md"} value="general">
                        <Group gap={"xs"} align="center" wrap="nowrap">
                            <IconUser style={{ width: rem(18), height: rem(18) }} />
                            <Text>General</Text>
                        </Group>
                    </Tabs.Tab>
                    <Tabs.Tab disabled py={"md"} value="prompts">
                        <Group gap={"xs"} align="center" wrap="nowrap">
                            <IconPrompt style={{ width: rem(18), height: rem(18) }} />
                            <Text>Prompts</Text>
                        </Group>
                    </Tabs.Tab>
                    <Tabs.Tab disabled py={"md"} value="templates">
                        <Group gap={"xs"} align="center" wrap="nowrap">
                            <IconTemplate style={{ width: rem(18), height: rem(18) }} />
                            <Text>Templates</Text>
                        </Group>
                    </Tabs.Tab>
                    <Tabs.Tab disabled py={"md"} value="modifiers">
                        <Group gap={"xs"} align="center" wrap="nowrap">
                            <IconSparkles style={{ width: rem(18), height: rem(18) }} />
                            <Text>Modifiers</Text>
                        </Group>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="general" px={"md"}>
                    <Card>
                        <Stack gap={"md"}>
                            <SimpleGrid cols={{base: 1, sm: 2}}>
                                <Text>Username</Text>
                                <Input value={user.nickname} disabled />
                                <Text>Email</Text>
                                <Input value={user.email} disabled />
                                <Text size="sm" fw={600}>Language</Text>
                                <Select
                                    value={"en"}
                                    data={[
                                        { label: "English", value: "en" },
                                        { label: "Portuguese", value: "pt" },
                                    ]}
                                />
                            </SimpleGrid>
                        </Stack>
                    </Card>
                </Tabs.Panel>
                <Tabs.Panel value="advanced">

                </Tabs.Panel>
            </Tabs>
        </Modal>
    );
}