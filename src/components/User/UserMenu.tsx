import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Divider, Group, Menu, Stack, Text, Title, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { IconActivity, IconBell, IconFileDescription, IconFlag, IconInfoCircle, IconLanguage, IconLogout, IconMail, IconPlus, IconPrompt, IconQuestionMark, IconSettings, IconSparkles, IconTemplate, IconUser, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { UserProfileModal } from "./UserProfileModal";
import { useDisclosure } from "@mantine/hooks";
import { UserFeedbackModal } from "./UserFeedbackModal";
import { Filters } from "../../model/Filters";
import { AIMediatorClient } from "../../clients/AIMediatorClient";

interface UserMenu {
    filters: Filters,
    setFilters: any,
    refreshRepository: any,
    aiMediatorClient: AIMediatorClient
}

export function UserMenu({
    filters,
    setFilters,
    refreshRepository,
    aiMediatorClient
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
                aiMediatorClient={aiMediatorClient}
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
                    <Menu.Item color="red" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Box>
    )
}