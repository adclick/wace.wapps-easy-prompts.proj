import { Box, Button, Divider, Group, Title, rem } from "@mantine/core";
import { Language } from "../../model/Language";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { IconArrowBack, IconPlus, IconReload } from "@tabler/icons-react";
import { LanguageSwitcher } from "../Elements/LanguageSwitcher";

interface NavbarFooter {
    language: Language,
    setLanguage: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any
}

export function NavbarFooter({
    language,
    setLanguage,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions
}: NavbarFooter) {
    const reset = () => {
        refreshPromptOptions(Language.getDefault());
    }

    return (
        <Group justify="space-between" py={"xs"}>
            {/* <LanguageSwitcher
                language={language}
                setLanguage={setLanguage}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
                refreshPromptOptions={refreshPromptOptions}
            /> */}
            <Button
                leftSection={<IconPlus style={{ width: rem(18), height: rem(18) }} />}
                variant="transparent"
                onClick={reset}
                size="sm"
            >
                New Chat
            </Button>
        </Group>
    )
}