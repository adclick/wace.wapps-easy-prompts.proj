import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Divider, Group, Menu, Stack, Text, Title, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { IconActivity, IconBell, IconFileDescription, IconFlag, IconInfoCircle, IconLanguage, IconLogout, IconMail, IconPlus, IconPrompt, IconQuestionMark, IconSettings, IconSparkles, IconTemplate, IconUser, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { UserProfileModal } from "./UserProfileModal";
import { useDisclosure } from "@mantine/hooks";
import { UserFeedbackModal } from "./UserFeedbackModal";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { Thread } from "../../model/Thread";

interface UserMenu {
    refreshRepository: any,
    aiMediatorClient: AIMediatorClient,
    setFirstLogin: any,
    threads: Thread[],
    setThreads: any,
    scrollIntoView: any,
}

export function UserMenu({
    refreshRepository,
    aiMediatorClient,
    setFirstLogin,
    threads,
    setThreads,
    scrollIntoView,
}: UserMenu) {
    const { t } = useTranslation();
    const { user, logout } = useAuth0();
    const [userProfileOpened, userProfileHandle] = useDisclosure(false);
    const [userFeedbackModalOpened, userFeedbackModalHandle] = useDisclosure(false);

    const howItWorks = () => {
        const thread = new Thread();
        thread.request.intro = true;
        setThreads([...threads, thread]);
        scrollIntoView({ alignment: 'start' });
    }

    return (
        <Box>
            <UserProfileModal
                userProfileOpened={userProfileOpened}
                closeUserProfile={userProfileHandle.close}
                refreshRepository={refreshRepository}
                aiMediatorClient={aiMediatorClient}
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
                    <Menu.Item
                        color="blue"
                        leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />}
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
                    <Menu.Item onClick={howItWorks} leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
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