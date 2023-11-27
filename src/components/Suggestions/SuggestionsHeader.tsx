import { ActionIcon, Box, Burger, Group, Stack, Textarea, Title, rem } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { UserMenu } from "../Misc/UserMenu";

interface SuggestionsHeader {
    navbarOpened: boolean,
    toggleNavbar: any,
    openFilters: any,
    userPrompt: string,
    setUserPrompt: any
}

export function SuggestionsHeader({
    navbarOpened,
    toggleNavbar,
    openFilters,
    userPrompt,
    setUserPrompt
}: SuggestionsHeader) {
    return (
        <Stack pb={"xs"}>
            <Group h={"100%"} justify='space-between' py={"xs"}>
                <Group align='end' >
                    <Burger
                        opened={navbarOpened}
                        onClick={toggleNavbar}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Title order={3}>Suggestions</Title>
                    <ActionIcon size={"md"} onClick={openFilters} variant='light'>
                        <IconFilter style={{ width: rem(14), height: rem(14) }} />
                    </ActionIcon>
                </Group>
                <Box hiddenFrom="sm">
                    <UserMenu />
                </Box>
            </Group>
            <Textarea
                placeholder={"Search"}
                autosize
                autoFocus
                minRows={1}
                maxRows={6}
                value={userPrompt}
                onChange={e => setUserPrompt(e.target.value)}
                hiddenFrom="sm"
            />
        </Stack>
    )
}