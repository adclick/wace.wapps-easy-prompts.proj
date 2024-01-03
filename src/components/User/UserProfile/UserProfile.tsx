import { Card, Input, Modal, SimpleGrid, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";

interface UserProfile {
    opened: boolean,
    handle: any,
}

export function UserProfile({
    opened,
    handle,
}: UserProfile) {
    const { user } = useUser();

    return (
        <Modal opened={opened} onClose={handle.close} title="Profile" size={"lg"}>
            <Card>
                <Stack gap={"lg"}>
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        <Text>Username</Text>
                        <Input value={user.username} disabled />
                        <Text>Email</Text>
                        <Input value={user.email} disabled />
                    </SimpleGrid>
                </Stack>
            </Card>
        </Modal>
    );
}