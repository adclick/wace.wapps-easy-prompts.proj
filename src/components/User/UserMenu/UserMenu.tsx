import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Menu, Stack, Text, UnstyledButton, rem } from "@mantine/core";
import { IconBell, IconExternalLink, IconFileDescription, IconLogout, IconQuestionMark, IconUser } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { UserProfile } from "../UserProfile/UserProfile";
import { useDisclosure } from "@mantine/hooks";

export function UserMenu() {
    const { t } = useTranslation();
    const { user, logout } = useAuth0();
    const [userProfileOpened, userProfileHandle] = useDisclosure(false);

    return (
        <Box>
            <UserProfile
                opened={userProfileOpened}
                handle={userProfileHandle}
            />
            <Menu position="bottom-end">
                <Menu.Target>
                    <UnstyledButton size="lg" px={"xs"} py={"xs"}>
                        <Avatar src={user?.picture} />
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />} onClick={userProfileHandle.open}>
                        <Stack gap={0} align="flex-start" >
                            <Text>{user?.nickname}</Text>
                            <Text size="xs">{user?.email}</Text>
                        </Stack>
                    </Menu.Item>
                    <Menu.Item
                        color="blue"
                        leftSection={<IconExternalLink style={{ width: rem(14), height: rem(14) }} />}
                        component="a"
                        href="https://forms.clickup.com/4647457/f/4duh1-67272/60RTTBEBOVWBR6QBYM"
                        target="_blank"
                    >
                        Give Feedback
                    </Menu.Item>

                    <Menu.Item disabled leftSection={<IconBell style={{ width: rem(14), height: rem(14) }} />}>
                        Notifications
                    </Menu.Item>
                    <Menu.Item disabled leftSection={<IconFileDescription style={{ width: rem(14), height: rem(14) }} />}>
                        Changelog
                    </Menu.Item>
                    <Menu.Item leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
                        How it works
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item color="red" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Box>
    )
}