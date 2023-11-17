import { Box, Button, Divider, Group, Title, rem } from "@mantine/core";
import { Language } from "../../model/Language";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { IconArrowBack, IconReload } from "@tabler/icons-react";

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
        <Box>
            <Divider h={'xs'} />
            <Button
                leftSection={<IconReload style={{ width: rem(18), height: rem(18) }} />}
                fullWidth
                variant="subtle"
                onClick={reset}
                size="md"
            >
                RESET
            </Button>
        </Box>
    )
}