import { Box, Button, Card, Group, Menu, Modal, Select, Stack, Tabs, Text } from "@mantine/core";

interface UserProfileModal {
    userProfileOpened: boolean,
    closeUserProfile: () => void
}

export function UserProfileModal({ userProfileOpened, closeUserProfile }: UserProfileModal) {
    return (
        <Modal opened={userProfileOpened} onClose={closeUserProfile} title="User Profile" size={"xl"}>
            <Tabs defaultValue="general" orientation="vertical" my={"md"}>
                <Tabs.List>
                    <Tabs.Tab py={"md"} value="general">General</Tabs.Tab>
                    <Tabs.Tab py={"md"} value="prompts">Prompts</Tabs.Tab>
                    <Tabs.Tab py={"md"} value="templates">Templates</Tabs.Tab>
                    <Tabs.Tab py={"md"} value="modifiers">Modifiers</Tabs.Tab>
                    <Tabs.Tab py={"md"} value="advanced">Advanced</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="general" px={"md"}>
                    <Card>
                        <Stack gap={"md"}>
                            <Group gap={"xs"} justify="space-between">
                                <Text size="sm"  fw={600}>Language</Text>
                                <Select
                                    variant="unstyled"
                                    value={"en"}
                                    data={[
                                        { label: "English", value: "en" },
                                        { label: "Portuguese", value: "pt" },
                                    ]}
                                />
                            </Group>
                        </Stack>
                    </Card>
                </Tabs.Panel>
                <Tabs.Panel value="advanced">

                </Tabs.Panel>
            </Tabs>
        </Modal>
    );
}