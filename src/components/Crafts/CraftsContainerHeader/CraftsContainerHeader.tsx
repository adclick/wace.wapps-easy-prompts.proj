import { Tooltip, ActionIcon, Badge, Box, Burger, Group, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem, Card, TextInput, Modal } from "@mantine/core";
import { IconUsersGroup, IconUser, IconWorld, IconArrowBackUp, IconChevronDown, IconChevronUp, IconCircle, IconFilter, IconFilterFilled, IconList, IconLock, IconPlus, IconPrompt, IconRefresh, IconSearch, IconSearchOff, IconSparkles, IconSwitch, IconSwitchHorizontal, IconTemplate, IconTrash, IconUserPlus, IconUsers, IconZoomFilled, IconArrowsSort, IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { RepositoryItem } from "../../../model/RepositoryItem";
import { NewModifierModal } from "../../Layout/Modals/NewModifierModal/NewModifierModal";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer"
import { useFiltersQuery } from "../../../api/filtersApi";
import { AIMediatorClient } from "../../../clients/AIMediatorClient";
import { useUser } from "../../../context/UserContext";
import { SearchTermFilter } from "../../Filters/SearchTermFilter/SearchTermFilter";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { useEffect } from "react";
import { SelectedFilters } from "../../../model/SelectedFilters";

interface CraftsContainerHeader {
    navbarOpened: boolean,
    toggleNavbar: any,
    openFilters: any,
    filtersOpened: boolean
    closeFilters: any
    repositorySearchTerm: string,
    setRepositorySearchTerm: any,
    refreshRepository: any,
    refreshingRepository: boolean,
    refreshingRepositoryHandle: any,
    aiMediatorClient: AIMediatorClient,
    repositorySelectedItems: RepositoryItem[]
}

export function CraftsContainerHeader({
    navbarOpened,
    toggleNavbar,
    refreshRepository,
    aiMediatorClient,

}: CraftsContainerHeader) {
    const { user } = useUser();
    const filtersQuery = useFiltersQuery(user.id);
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    // Init selectedFilters
    useEffect(() => {
        if (filtersQuery.data && selectedFilters.isEmpty) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(filtersQuery.data.data.data);
            setSelectedFilters(newSelectedFilters);
        }
    })


    const [filtersOpened, filtersHandle] = useDisclosure(false);
    const [newModifierOpened, newModifierHandle] = useDisclosure(false);

    return (
        <Stack pb={"lg"}>
            <Group h={"100%"} justify='space-between' pt={"xs"}>
                <Group align='end'>
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
                                        <Text truncate size="xl" fw={500}>
                                            Database
                                        </Text>
                                    </Box>
                                    <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={newModifierHandle.open} color={RepositoryItem.getColor("modifier")} leftSection={<IconSparkles style={{ width: rem(14), height: rem(14) }} />}>
                                New Modifier
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item disabled leftSection={<IconUserPlus style={{ width: rem(14), height: rem(14) }} />}>
                                Invite
                            </Menu.Item>
                            <Menu.Item disabled leftSection={<IconUsers style={{ width: rem(14), height: rem(14) }} />}>
                                Members
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item disabled leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                Manage Database
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                <Group gap={"xs"}>
                    <Tooltip label="Sort">
                        <ActionIcon size={"lg"} variant='subtle'>
                            <IconArrowsSort style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Filters">
                        <ActionIcon onClick={filtersHandle.open} size={"lg"} variant='subtle'>
                            <IconFilter style={{ width: rem(18), height: rem(18) }} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
            <FiltersContainer
                opened={filtersOpened}
                handle={filtersHandle}
                refreshRepository={refreshRepository}
                filtersQuery={filtersQuery}
            />
            <Stack gap={"xl"} my={"xs"}>
                <SearchTermFilter />
            </Stack>

            <NewModifierModal
                opened={newModifierOpened}
                handle={newModifierHandle}
                aiMediatorClient={aiMediatorClient}
                refreshRepository={refreshRepository}
            />
        </Stack>
    )
}