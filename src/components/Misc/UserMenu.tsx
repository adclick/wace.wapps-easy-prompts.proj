import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Divider, Group, Menu, Stack, Text, Title, Tooltip, rem } from "@mantine/core";
import { IconFlag, IconInfoCircle, IconLanguage, IconLogout, IconMail, IconPrompt, IconQuestionMark, IconSettings, IconSparkles, IconTemplate, IconUser, IconUsers } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export function UserMenu() {
    const { t } = useTranslation();
    const { user, logout } = useAuth0();

    return (
        <Menu position="bottom-end" >
            <Menu.Target>
                <Button justify='flex-start' size="lg" variant="transparent" px={"xs"}>
                    <Avatar src={user?.picture} />
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IconUser style={{ width: "70%", height: "70%" }} />}
                >
                    <Stack gap={0}>
                        <Text>{user?.nickname}</Text>
                        <Text size="xs">{user?.email}</Text>
                    </Stack>
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconPrompt style={{ width: "70%", height: "70%" }} />}
                >
                    Prompts
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconSparkles style={{ width: "70%", height: "70%" }} />}
                >
                    Modifiers
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconTemplate style={{ width: "70%", height: "70%" }} />}
                >
                    Templates
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Teams</Menu.Label>
                <Menu.Item leftSection={<IconUsers style={{ width: rem(14), height: rem(14) }} />}>
                    Manage Teams
                </Menu.Item>
                <Menu.Item leftSection={<IconUsers style={{ width: rem(14), height: rem(14) }} />}>
                    Create new Team
                </Menu.Item>
                
                <Menu.Divider />
                <Menu.Item leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />}>
                    Give Feedback
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} leftSection={<IconLogout style={{ width: "70%", height: "70%" }} />}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}