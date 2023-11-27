import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Divider, Group, Menu, Stack, Text, Title, Tooltip, rem } from "@mantine/core";
import { IconFlag, IconInfoCircle, IconLanguage, IconLogout, IconMail, IconPlus, IconPrompt, IconQuestionMark, IconSettings, IconSparkles, IconTemplate, IconUser, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { UserProfileModal } from "../User/UserProfileModal";
import { useDisclosure } from "@mantine/hooks";
import { UserFeedbackModal } from "../User/UserFeedbackModal";

export function UserMenu() {
    const { t } = useTranslation();
    const { user, logout } = useAuth0();
    const [userProfileOpened, userProfileHandle] = useDisclosure(false);
    const [userFeedbackModalOpened, userFeedbackModalHandle] = useDisclosure(false);

    return (
        <Box>
            <UserProfileModal
                user={user}
                userProfileOpened={userProfileOpened}
                closeUserProfile={userProfileHandle.close}
            />
            <UserFeedbackModal
                userFeedbackModalOpened={userFeedbackModalOpened}
                userFeedbackModalHandle={userFeedbackModalHandle}
            />
            <Menu position="bottom-end" >
                <Menu.Target>
                    <Button justify='flex-start' size="lg" variant="transparent" px={"xs"}>
                        <Avatar src={user?.picture} />
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<IconUser style={{ width: "70%", height: "70%" }} />} onClick={userProfileHandle.open}>
                        <Stack gap={0} >
                            <Text>{user?.nickname}</Text>
                            <Text size="xs">{user?.email}</Text>
                        </Stack>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>Teams</Menu.Label>
                    <Menu.Item leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                        Create new Team
                    </Menu.Item>
                    <Menu.Item leftSection={<IconUserPlus style={{ width: rem(14), height: rem(14) }} />}>
                        Invite Member
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                        Manage Teams
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Item color="blue" leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />} onClick={userFeedbackModalHandle.open}>
                        Give Feedback
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Item color="red" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} leftSection={<IconLogout style={{ width: "70%", height: "70%" }} />}>
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Box>
    )
}