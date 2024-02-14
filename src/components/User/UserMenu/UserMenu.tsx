import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Stack, Text, UnstyledButton } from "@mantine/core";
import { UserProfile } from "../UserProfile/UserProfile";
import { useDisclosure } from "@mantine/hooks";
import { Menu } from "../../UI/Menu";
import { IconExternalLink, IconLogout, IconUser } from "@tabler/icons-react";
import { Color, MenuType, Position } from "../../../enums";

export function UserMenu() {
    const { user, logout } = useAuth0();
    const [userProfileOpened, userProfileHandle] = useDisclosure(false);

    return (
        <Box>
            <UserProfile
                opened={userProfileOpened}
                handle={userProfileHandle}
            />

            <Menu
                target={(
                    <UnstyledButton size="lg" px={"xs"} py={"xs"}>
                        <Avatar src={user?.picture} />
                    </UnstyledButton>
                )}
                position={Position.bottom_end}
                items={[
                    {
                        type: MenuType.button,
                        id: 1,
                        label: (
                            <Stack gap={0} align="flex-start" >
                                <Text>{user?.nickname}</Text>
                                <Text size="xs">{user?.email}</Text>
                            </Stack>
                        ),
                        onClick: userProfileHandle.open,
                        icon: <IconUser size={14} />,
                    },
                    {
                        type: MenuType.divider,
                        id: 2,
                    },
                    {
                        type: MenuType.link,
                        id: 3,
                        label: 'Give Feedback',
                        href: 'https://forms.clickup.com/4647457/f/4duh1-67272/60RTTBEBOVWBR6QBYM',
                        targetBlank: true,
                        icon: <IconExternalLink size={14} />,
                    },
                    {
                        type: MenuType.divider,
                        id: 4,
                    },
                    {
                        type: MenuType.button,
                        id: 5,
                        label: 'Logout',
                        onClick: () => logout({ logoutParams: { returnTo: window.location.origin } }),
                        color: Color.red,
                        icon: <IconLogout size={14} />
                    },
                ]}
            />
        </Box>
    )
}