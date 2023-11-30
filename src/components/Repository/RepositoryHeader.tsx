import { ActionIcon, Box, Burger, Group, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem } from "@mantine/core";
import { IconArrowBackUp, IconChevronDown, IconCircle, IconFilter, IconList, IconPlus, IconRefresh, IconSwitch, IconSwitchHorizontal, IconTrash, IconUserPlus, IconUsers } from "@tabler/icons-react";
import { UserMenu } from "../User/UserMenu";
import { RepositoryFilters } from "./RepositoryFilters";
import { Filters } from "../../model/Filters";
import { Repository } from "../../model/Repository";

interface RepositoryHeader {
    navbarOpened: boolean,
    toggleNavbar: any,
    openFilters: any,
    filtersOpened: boolean
    closeFilters: any
    filters: Filters,
    setFilters: any,
    repository: Repository,
    repositorySearchTerm: string,
    setRepositorySearchTerm: any
}

export function RepositoryHeader({
    navbarOpened,
    toggleNavbar,
    openFilters,
    filtersOpened,
    closeFilters,
    filters,
    setFilters,
    repository,
    repositorySearchTerm,
    setRepositorySearchTerm
}: RepositoryHeader) {
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
                            <Menu.Item disabled leftSection={<IconUserPlus style={{ width: rem(14), height: rem(14) }} />}>
                                Invite
                            </Menu.Item>
                            <Menu.Item disabled leftSection={<IconUsers style={{ width: rem(14), height: rem(14) }} />}>
                                Members
                            </Menu.Item>
                            <Menu.Item leftSection={<IconList style={{ width: rem(14), height: rem(14) }} />}>
                                My Repositories
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
                value={repositorySearchTerm}
                onChange={e => setRepositorySearchTerm(e.target.value)}
            />
            <RepositoryFilters filtersOpened={filtersOpened} closeFilters={closeFilters} />

        </Stack>
    )
}