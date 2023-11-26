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
                <Group align='flex-end' >
                    <Burger
                        opened={navbarOpened}
                        onClick={toggleNavbar}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Title order={3}>Suggestions</Title>
                    <ActionIcon onClick={openFilters} variant='subtle'>
                        <IconFilter style={{ width: rem(16), height: rem(16) }} />
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