import { ActionIcon, Badge, Box, Burger, Button, Checkbox, Chip, Divider, Group, Loader, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem } from "@mantine/core";
import { IconArrowBackUp, IconChevronDown, IconChevronUp, IconCircle, IconFilter, IconFilterFilled, IconList, IconLock, IconPlus, IconPrompt, IconRefresh, IconSearch, IconSearchOff, IconSwitch, IconSwitchHorizontal, IconTrash, IconUserPlus, IconUsers, IconZoomFilled } from "@tabler/icons-react";
import { Filters } from "../../model/Filters";
import { Repository } from "../../model/Repository";
import { useDisclosure } from "@mantine/hooks";
import { RepositoryListModal } from "./RepositoryListModal";
import { RepositoryItem } from "../../model/RepositoryItem";
import { useState } from "react";

interface RepositoryHeader {
    navbarOpened: boolean,
    toggleNavbar: any,
    openFilters: any,
    filtersOpened: boolean
    closeFilters: any
    filters: Filters,
    setFilters: any,
    repositories: Repository[]
    repository: Repository,
    repositorySearchTerm: string,
    setRepositorySearchTerm: any,
    refreshRepository: any,
    refreshingRepository: boolean,
    refreshingRepositoryHandle: any
}

export function RepositoryHeader({
    navbarOpened,
    toggleNavbar,
    openFilters,
    closeFilters,
    filters,
    setFilters,
    repositories,
    repository,
    repositorySearchTerm,
    setRepositorySearchTerm,
    refreshRepository,
    refreshingRepository,
    refreshingRepositoryHandle
}: RepositoryHeader) {
    const [repositoryListModalOpened, repositoryListModalHandle] = useDisclosure(false);
    const [filtersOpened, filtersHandle] = useDisclosure(false);
    const [types, setTypes] = useState<string[]>(filters.types);

    const updateTypes = (value: any) => {
        setTypes(value);

        const newFilters = {
            ...filters,
            types: value
        };

        setFilters(newFilters);
        refreshRepository(newFilters);
    }

    const searchSearchTerm = ((term: string) => {
        setRepositorySearchTerm(term);

        const newFilters = {
            ...filters,
            prompt: term.toLocaleLowerCase()
        };

        setFilters(newFilters);
        refreshRepository(newFilters);
    })

    return (
        <Stack mb={0}>
            <RepositoryListModal
                opened={repositoryListModalOpened}
                close={repositoryListModalHandle.close}
                repositories={repositories}
                filters={filters}
                setFilters={setFilters}
                refreshRepository={refreshRepository}
            />
            <Group h={"100%"} justify='space-between' pt={"xs"}>
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
                                            {repositories.find(r => r.slug === filters.repository)?.name}
                                        </Text>
                                    </Box>
                                    <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item color='blue' leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                                Create new Repository
                            </Menu.Item>
                            <Menu.Item onClick={repositoryListModalHandle.open} leftSection={<IconSwitchHorizontal style={{ width: rem(14), height: rem(14) }} />}>
                                Switch Repository
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
                <Group gap={"xs"}>
                    <ActionIcon onClick={repositoryListModalHandle.open} size={"lg"} variant='subtle'>
                        <IconSwitchHorizontal style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                    <ActionIcon onClick={() => refreshRepository(filters)} size={"lg"} variant='subtle'>
                        <IconRefresh style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                </Group>
            </Group>
            {
                filtersOpened &&
                <Stack gap={"xl"}>
                    <Textarea
                        placeholder={"Search"}
                        autosize
                        autoFocus
                        minRows={1}
                        maxRows={6}
                        value={repositorySearchTerm}
                        onChange={e => searchSearchTerm(e.target.value)}
                    />
                    <Checkbox.Group defaultValue={filters.types} value={types} onChange={updateTypes}>
                        <Group justify="space-between">
                            <Checkbox radius={"sm"} color={RepositoryItem.getColor("prompt")} value="prompts" label="Prompts" />
                            <Checkbox radius={"sm"} color={RepositoryItem.getColor("template")} value="templates" label="Templates" />
                            <Checkbox radius={"sm"} color={RepositoryItem.getColor("modifier")} value="modifiers" label="Modifiers" />
                        </Group>
                    </Checkbox.Group>
                </Stack>
            }

            <Divider  label={
                <Button variant="subtle" size="compact-xs" rightSection={
                    filtersOpened
                        ? <IconChevronUp size={12} />
                        : <IconChevronDown size={12} />
                } onClick={filtersHandle.toggle}>
                    <Badge variant="transparent">Filters</Badge>
                </Button>
            } />
        </Stack>
    )
}