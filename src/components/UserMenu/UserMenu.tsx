import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Divider, Group, Menu, Stack, Text, Tooltip, rem } from "@mantine/core";
import { IconFlag, IconInfoCircle, IconLanguage, IconLogout, IconMail, IconQuestionMark, IconSettings } from "@tabler/icons-react";

const NOT_AVAILABLE = "Not available yet";

export function UserMenu() {
    const { user, logout } = useAuth0();

    return (
        <Box>
            <Menu position="bottom-end">
                <Menu.Target>
                    <Button fullWidth justify='flex-start' size="lg" variant="transparent" px={"xs"}>
                        <Group>
                            <Avatar src={user?.picture} />
                            {/* <Stack align='flex-start' gap={0}>
                                <Text style={{ color: 'var(--mantine-color-text)' }} size='md' fw={600}>{user !== undefined ? user.nickname : "User"}</Text>
                                <Text style={{ color: 'var(--mantine-color-text)' }} size='xs'>{user !== undefined ? user.email : "User"}</Text>
                            </Stack> */}
                        </Group>
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Tooltip label={NOT_AVAILABLE}>
                        <Menu.Item leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />}>
                            Give Feedback
                        </Menu.Item>
                    </Tooltip>

                    <Tooltip label={NOT_AVAILABLE}>
                        <Menu.Item leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                            About
                        </Menu.Item>
                    </Tooltip>

                    <Tooltip label={NOT_AVAILABLE}>
                        <Menu.Item leftSection={<IconFlag style={{ width: rem(14), height: rem(14) }} />}>
                            Whats new
                        </Menu.Item>
                    </Tooltip>

                    <Tooltip label={NOT_AVAILABLE}>
                        <Menu.Item leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
                            How to use
                        </Menu.Item>
                    </Tooltip>

                    <Tooltip label={NOT_AVAILABLE}>
                        <Menu.Item leftSection={<IconLanguage style={{ width: rem(14), height: rem(14) }} />}>
                            Language
                        </Menu.Item>
                    </Tooltip>

                    <Menu.Divider />

                    <Menu.Label>Administration</Menu.Label>
                    <Tooltip label={NOT_AVAILABLE}>
                        <Menu.Item
                            leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                        >
                            Configure Options
                        </Menu.Item>
                    </Tooltip>
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} leftSection={<IconLogout style={{ width: "70%", height: "70%" }} />}>
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Box>
    )
}