import { Tooltip, Collapse, ScrollArea, Indicator, ActionIcon, Badge, Box, Burger, Button, Checkbox, Chip, Divider, Group, Loader, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem, Card, TextInput, Modal } from "@mantine/core";
import { IconUsersGroup, IconUser, IconWorld, IconArrowBackUp, IconChevronDown, IconChevronUp, IconCircle, IconFilter, IconFilterFilled, IconList, IconLock, IconPlus, IconPrompt, IconRefresh, IconSearch, IconSearchOff, IconSparkles, IconSwitch, IconSwitchHorizontal, IconTemplate, IconTrash, IconUserPlus, IconUsers, IconZoomFilled, IconArrowsSort } from "@tabler/icons-react";
import { Repository } from "../../model/Repository";
import { useDisclosure } from "@mantine/hooks";
import { RepositoryListModal } from "./RepositoryListModal";
import { RepositoryItem } from "../../model/RepositoryItem";
import { useState } from "react";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { RepositoryFilter } from "./RepositoryFilter";
import { useFilters } from "../../context/FiltersContext";
import { RepositoryTypesFilter } from "./RepositoryTypesFilter";
import { RepositoryNewModifierForm } from "./RepositoryNewModifierForm";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { RepositoryLanguageFilter } from "./RepositoryLanguageFilter";

interface RepositoryHeader {
    navbarOpened: boolean,
    toggleNavbar: any,
    openFilters: any,
    filtersOpened: boolean
    closeFilters: any
    repositories: Repository[]
    repository: Repository,
    repositorySearchTerm: string,
    setRepositorySearchTerm: any,
    refreshRepository: any,
    refreshingRepository: boolean,
    refreshingRepositoryHandle: any,
    aiMediatorClient: AIMediatorClient,
    repositorySelectedItems: RepositoryItem[]
}

export function RepositoryHeader({
    navbarOpened,
    toggleNavbar,
    repositories,
    repositorySearchTerm,
    setRepositorySearchTerm,
    refreshRepository,
    aiMediatorClient,

}: RepositoryHeader) {
    const { filters, setFilters } = useFilters();
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();
    const [repositoryListModalOpened, repositoryListModalHandle] = useDisclosure(false);
    const [filtersOpened, filtersHandle] = useDisclosure(false);
    const [newModifierOpened, newModifierHandle] = useDisclosure(false);
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

    const toggleOptions = () => {
        newModifierHandle.close();
        filtersHandle.toggle();
    }

    const toggleNewModifier = () => {
        filtersHandle.close();
        newModifierHandle.toggle();
    }

    return (
        <Stack pb={"lg"}>
            <RepositoryListModal
                opened={repositoryListModalOpened}
                close={repositoryListModalHandle.close}
                repositories={repositories}
                filters={filters}
                setFilters={setFilters}
                refreshRepository={refreshRepository}
            />
            <Group h={"100%"} justify='space-between' pt={"xs"}>
                <Group align='end'>
                    <Burger
                        opened={navbarOpened}
                        onClick={toggleNavbar}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    {/* <Menu shadow="md" width={200} position='bottom-start'>
                        <Menu.Target>
                            <UnstyledButton px={0}>
                                <Group align='center' gap={"xs"} wrap="nowrap">
                                    <Box maw={175}>
                                        <Text truncate size="lg">
                                            Options
                                        </Text>
                                    </Box>
                                    <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item disabled color='blue' leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
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
                            <Menu.Item disabled leftSection={<IconList style={{ width: rem(14), height: rem(14) }} />}>
                                My Repositories
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item onClick={newModifierModalHandle.open} color={RepositoryItem.getColor("modifier")} leftSection={<IconSparkles style={{ width: rem(14), height: rem(14) }} />}>
                                Create new modifier
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu> */}
                    <UnstyledButton px={0} onClick={toggleOptions}>
                        <Group align='center' gap={"xs"} wrap="nowrap">
                            <Box maw={175}>
                                <Title order={3}>
                                    Options
                                </Title>
                            </Box>
                            {
                                filtersOpened
                                    ? <IconChevronUp style={{ width: rem(16), height: rem(16) }} />
                                    : <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                            }

                        </Group>
                    </UnstyledButton>
                </Group>
                <Group gap={"xs"}>
                    {/* <Menu shadow="md" position='bottom-start'>
                        <Menu.Target>
                            <ActionIcon size={"lg"} variant='filled'>
                                <IconPlus style={{ width: '60%', height: '60%' }} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item disabled color={RepositoryItem.getColor("prompt")} leftSection={<IconPrompt style={{ width: rem(14), height: rem(14) }} />}>
                                Prompt
                            </Menu.Item>
                            <Menu.Item disabled color={RepositoryItem.getColor("template")} leftSection={<IconTemplate style={{ width: rem(14), height: rem(14) }} />}>
                                Template
                            </Menu.Item>
                            <Menu.Item onClick={newModifierModalHandle.open} color={RepositoryItem.getColor("modifier")} leftSection={<IconSparkles style={{ width: rem(14), height: rem(14) }} />}>
                                Modifier
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu> */}
                    {/* <ActionIcon onClick={repositoryListModalHandle.open} size={"lg"} variant='subtle'>
                        <IconSwitchHorizontal style={{ width: rem(18), height: rem(18) }} />
                    </ActionIcon> */}
                    <Tooltip label="Add new modifier">
                        <ActionIcon onClick={toggleNewModifier} size={"lg"} variant='subtle'>
                            <IconSparkles style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                    </Tooltip>
                    {/* <Tooltip label="Sort">
                        <ActionIcon  size={"lg"} variant='subtle' disabled>
                            <IconArrowsSort style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                    </Tooltip> */}
                    <Tooltip label="Refresh">
                        <ActionIcon onClick={() => refreshRepository(selectedFilters)} size={"lg"} variant='subtle'>
                            <IconRefresh style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
            <Collapse in={filtersOpened}>
                <Stack gap={"xl"} my={"xs"}>
                    <Textarea
                        placeholder={"Search"}
                        autosize
                        autoFocus
                        minRows={1}
                        maxRows={6}
                        value={repositorySearchTerm}
                        onChange={e => searchSearchTerm(e.target.value)}
                    />
                    {/* <RepositoryLanguageFilter refreshRepository={refreshRepository} /> */}
                    <RepositoryFilter refreshRepository={refreshRepository} />
                    <RepositoryTypesFilter refreshRepository={refreshRepository} />
                </Stack>
            </Collapse>

            <Modal opened={newModifierOpened} onClose={newModifierHandle.close} title="New Modifier">
                <RepositoryNewModifierForm
                    handle={newModifierHandle}
                    aiMediatorClient={aiMediatorClient}
                    refreshRepository={refreshRepository}
                />
            </Modal>

            {/* <Collapse in={newModifierOpened}>
                <RepositoryNewModifierForm
                    handle={newModifierHandle}
                    aiMediatorClient={aiMediatorClient}
                    refreshRepository={refreshRepository}
                />
            </Collapse> */}
        </Stack>
    )
}