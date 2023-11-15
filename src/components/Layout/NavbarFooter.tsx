import { Box, Divider, Group, Title } from "@mantine/core";
import { LanguageSwitcher } from "../Elements/LanguageSwitcher";
import { Language } from "../../model/Language";
import { UserPromptOptions } from "@/model/UserPromptOptions";

interface NavbarFooter {
    language: Language,
    setLanguage: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function NavbarFooter({
    language,
    setLanguage,
    userPromptOptions,
    setUserPromptOptions
}: NavbarFooter) {
    return (
        <Box>
            <Divider h={'xs'} />
            <LanguageSwitcher
                language={language}
                setLanguage={setLanguage}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
            />
        </Box>
    )
}