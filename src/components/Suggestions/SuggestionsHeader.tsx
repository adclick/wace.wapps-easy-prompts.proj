import { ActionIcon, Box, Burger, Group, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem } from "@mantine/core";
import { IconArrowBackUp, IconChevronDown, IconCircle, IconFilter, IconPlus, IconRefresh, IconSwitch, IconSwitchHorizontal, IconTrash, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { UserMenu } from "../Misc/UserMenu";
import { SuggestionsFilters } from "./SuggestionsFilters";
import { Filters } from "../../model/Filters";
import { Repository } from "../../model/Repository";

interface SuggestionsHeader {
    navbarOpened: boolean,
    toggleNavbar: any,
    openFilters: any,
    userPrompt: string,
    setUserPrompt: any,
    filtersOpened: boolean
    closeFilters: any
    filters: Filters,
    setFilters: any,
    repository: Repository
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
    setFilters,
    repository,
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
                    <Menu shadow="md" width={200} position='bottom-start'>
                        <Menu.Target>
                            <UnstyledButton px={0}>
                                <Group align='center' gap={"xs"} wrap="nowrap">
                                    <Box maw={175}>
                                        <Text truncate size="lg">
                                            {repository.name}
                                        </Text>
                                    </Box>
                                    <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item color='blue' leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                                Create new
                            </Menu.Item>
                            <Menu.Item leftSection={<IconSwitchHorizontal style={{ width: rem(14), height: rem(14) }} />}>
                                Switch
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Label>My Repository</Menu.Label>
                            <Menu.Item disabled leftSection={<IconUserPlus style={{ width: rem(14), height: rem(14) }} />}>
                                Invite
                            </Menu.Item>
                            <Menu.Item disabled leftSection={<IconUsers style={{ width: rem(14), height: rem(14) }} />}>
                                Members
                            </Menu.Item>
                            <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                <Group>
                    <ActionIcon size={"lg"} onClick={openFilters} variant='subtle'>
                        <IconFilter style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                    <ActionIcon size={"lg"} variant='subtle'>
                        <IconRefresh style={{ width: rem(18), height: rem(18) }} />
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
            />
            <SuggestionsFilters filtersOpened={filtersOpened} closeFilters={closeFilters} />

        </Stack>
    )
}