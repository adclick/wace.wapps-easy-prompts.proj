import { ActionIcon, Box, Burger, Checkbox, Chip, Group, Loader, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem } from "@mantine/core";
import { IconArrowBackUp, IconChevronDown, IconCircle, IconFilter, IconFilterFilled, IconList, IconPlus, IconPrompt, IconRefresh, IconSearch, IconSearchOff, IconSwitch, IconSwitchHorizontal, IconTrash, IconUserPlus, IconUsers, IconZoomFilled } from "@tabler/icons-react";
import { UserMenu } from "../User/UserMenu";
import { RepositoryFilters } from "./RepositoryFilters";
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
    filtersOpened,
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
    const [searchOpened, searchHandle] = useDisclosure(false);
    const [typesOpened, typesHandle] = useDisclosure(false);
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

    return (
        <Stack pb={"xs"}>
            <RepositoryListModal
                opened={repositoryListModalOpened}
                close={repositoryListModalHandle.close}
                repositories={repositories}
            />
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
                            <Menu.Item onClick={repositoryListModalHandle.open} leftSection={<IconSwitchHorizontal style={{ width: rem(14), height: rem(14) }} />}>
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
                <Group gap={"xs"}>
                    <ActionIcon size={"lg"} onClick={searchHandle.toggle} variant='subtle'>
                        {
                            searchOpened
                                ? <IconZoomFilled style={{ width: rem(18), height: rem(18) }} />
                                : <IconSearch style={{ width: rem(18), height: rem(18) }} />
                        }

                    </ActionIcon>
                    <ActionIcon size={"lg"} onClick={typesHandle.toggle} variant='subtle'>
                        {
                            typesOpened
                            ? <IconFilterFilled style={{ width: rem(18), height: rem(18) }} />
                            : <IconFilter style={{ width: rem(18), height: rem(18) }} />
                        }
                    </ActionIcon>
                    <ActionIcon onClick={() => refreshRepository(filters)} size={"lg"} variant='subtle'>
                        <IconRefresh style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon>
                </Group>
            </Group>
            {
                searchOpened &&
                <Textarea
                    placeholder={"Search"}
                    autosize
                    autoFocus
                    minRows={1}
                    maxRows={6}
                    value={repositorySearchTerm}
                    onChange={e => setRepositorySearchTerm(e.target.value)}
                />
            }

            {
                typesOpened &&
                <Checkbox.Group defaultValue={filters.types} value={types} onChange={updateTypes}>
                    <Group>
                        <Checkbox radius={"sm"} color={RepositoryItem.getColor("prompt")} value="prompts" label="Prompts" />
                        <Checkbox radius={"sm"} color={RepositoryItem.getColor("template")} value="templates" label="Templates" />
                        <Checkbox radius={"sm"} color={RepositoryItem.getColor("modifier")} value="modifiers" label="Modifiers" />
                    </Group>
                </Checkbox.Group>
            }


            <RepositoryFilters
                filters={filters}
                setFilters={setFilters}
                filtersOpened={filtersOpened}
                closeFilters={closeFilters}
                refreshRepository={refreshRepository}
            />

        </Stack>
    )
}