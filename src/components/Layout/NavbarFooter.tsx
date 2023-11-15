import { Box, Divider, Group, Title } from "@mantine/core";
import { LanguageSwitcher } from "../Elements/LanguageSwitcher";
import { Language } from "../../model/Language";

interface NavbarFooter {
    language: Language,
    setLanguage: any
}

export function NavbarFooter({
    language,
    setLanguage
}: NavbarFooter) {
    return (
        <Box>
            <Divider h={'xs'} />
            <LanguageSwitcher
                language={language}
                setLanguage={setLanguage}
            />
        </Box>
    )
}