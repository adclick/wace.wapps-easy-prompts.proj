import { Box, Button, Divider, Group, Select, Text, Title, rem } from "@mantine/core";
import { Language } from "../../model/Language";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { IconArrowBack, IconPlus, IconReload } from "@tabler/icons-react";
import { LanguageSwitcher } from "../Misc/LanguageSwitcher";
import { TeamSwitcher } from "../Misc/TeamSwitcher";
import { UserMenu } from "../Misc/UserMenu";

interface NavbarFooter {
    language: Language,
    setLanguage: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any,
    setThreads: any,
    navbarToggle: any
}

export function NavbarFooter({
    language,
    setLanguage,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions,
    navbarToggle,
    setThreads
}: NavbarFooter) {
    const reset = () => {
        setThreads([]);
        navbarToggle();
    }

    return (
        <Group justify="space-between" pt={"lg"} pb={0}>
            {/* <LanguageSwitcher
                language={language}
                setLanguage={setLanguage}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
                refreshPromptOptions={refreshPromptOptions}
            /> */}
            {/* <Button
                leftSection={<IconPlus style={{ width: rem(18), height: rem(18) }} />}
                variant="transparent"
                onClick={reset}
                size="md"
                p={"0"}
            >
                New Chat
            </Button> */}
            <TeamSwitcher />
            {/* <UserMenu /> */}
        </Group>
    )
}