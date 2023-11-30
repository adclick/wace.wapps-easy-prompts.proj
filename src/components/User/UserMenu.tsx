import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Divider, Group, Menu, Stack, Text, Title, Tooltip, rem } from "@mantine/core";
import { IconActivity, IconBell, IconFileDescription, IconFlag, IconInfoCircle, IconLanguage, IconLogout, IconMail, IconPlus, IconPrompt, IconQuestionMark, IconSettings, IconSparkles, IconTemplate, IconUser, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { UserProfileModal } from "./UserProfileModal";
import { useDisclosure } from "@mantine/hooks";
import { UserFeedbackModal } from "./UserFeedbackModal";
import { Filters } from "@/model/Filters";

interface UserMenu {
    filters: Filters,
    setFilters: any,
    refreshRepository: any
}

export function UserMenu({
    filters,
    setFilters,
    refreshRepository
}: UserMenu) {
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
                filters={filters}
                setFilters={setFilters}
                refreshRepository={refreshRepository}
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
                    <Menu.Item color="blue" leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />} onClick={userFeedbackModalHandle.open}>
                        Give Feedback
                    </Menu.Item>
                    <Menu.Item disabled leftSection={<IconBell style={{ width: rem(14), height: rem(14) }} />}>
                        Notifications
                    </Menu.Item>
                    <Menu.Item disabled leftSection={<IconFileDescription style={{ width: rem(14), height: rem(14) }} />}>
                        Changelog
                    </Menu.Item>
                    <Menu.Item disabled leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
                        How it works
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