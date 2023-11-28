import { ActionIcon, Box, Burger, Group, Stack, Textarea, Title, rem } from "@mantine/core";
import { IconFilter, IconRefresh } from "@tabler/icons-react";
import { UserMenu } from "../Misc/UserMenu";
import { SuggestionsFilters } from "./SuggestionsFilters";
import { Filters } from "../../model/Filters";

interface SuggestionsHeader {
    navbarOpened: boolean,
    toggleNavbar: any,
    openFilters: any,
    userPrompt: string,
    setUserPrompt: any,
    filtersOpened: boolean
    closeFilters: any
    filters: Filters,
    setFilters: any
}

export function SuggestionsHeader({
    navbarOpened,
    toggleNavbar,
    openFilters,
    userPrompt,
    setUserPrompt,
    filtersOpened,
    closeFilters,
    filters,
    setFilters
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
                </Group>
                <Group>
                    <ActionIcon size={"lg"} variant='subtle'>
                        <IconRefresh style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                    <ActionIcon size={"lg"} onClick={openFilters} variant='subtle'>
                        <IconFilter style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                </Group>

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
            <SuggestionsFilters filtersOpened={filtersOpened} closeFilters={closeFilters} />

        </Stack>
    )
}