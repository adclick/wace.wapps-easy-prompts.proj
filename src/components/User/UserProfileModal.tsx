import { Box, Button, Menu, Modal, Select, Stack, Tabs, Text } from "@mantine/core";

interface UserProfileModal {
    userProfileOpened: boolean,
    closeUserProfile: () => void
}

export function UserProfileModal({ userProfileOpened, closeUserProfile }: UserProfileModal) {
    return (
        <>
            <Modal opened={userProfileOpened} onClose={closeUserProfile} title="User Profile" size={"xl"}>
                <Tabs defaultValue="general" orientation="vertical" my={"md"}>
                    <Tabs.List>
                        <Tabs.Tab py={"md"} value="general">General</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="general" px={"md"}>
                        <Stack gap={"md"}>
                            <Stack>
                                <Text>Language</Text>
                                <Select
                                    value={"en"}
                                    data={[
                                        { label: "English", value: "en" },
                                        { label: "Portuguese", value: "pt" },
                                    ]}
                                />
                            </Stack>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Modal>
        </>
    );
}