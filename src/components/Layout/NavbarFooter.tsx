import { Box, Divider, Group, Title } from "@mantine/core";
import { LanguageSwitcher } from "../Elements/LanguageSwitcher";

export function NavbarFooter() {
    return (
        <Box>
            <Divider h={'xs'} />
            <LanguageSwitcher />
        </Box>
    )
}