import { Tooltip, ActionIcon, Group, Menu, Stack, Text, UnstyledButton, rem } from "@mantine/core";
import { IconChevronDown, IconFilter, IconSparkles, IconArrowsSort } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { NewModifierModal } from "../NewModifierModal/NewModifierModal";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { SearchTermFilter } from "../../Filters/SearchTermFilter/SearchTermFilter";
import { useEffect } from "react";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { SelectedFilters } from "../../../model/SelectedFilters";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { CraftsDatabaseMenu } from "../CraftsDatabaseMenu/CraftsDatabaseMenu";

interface CraftsContainerHeader {
    navbarOpened: boolean,
    navbarHandle: any,
}

export function CraftsContainerHeader({ navbarOpened, navbarHandle }: CraftsContainerHeader) {
    const [filtersOpened, filtersHandle] = useDisclosure(false);

    const { user } = useUser();
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();
    const filtersQuery = useFiltersQuery(user.id);

    // Init selectedFilters
    useEffect(() => {
        if (filtersQuery.data && selectedFilters.isEmpty) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(filtersQuery.data);
            setSelectedFilters(newSelectedFilters);
        }
    })

    return (
        <>
            <FiltersContainer
                opened={filtersOpened}
                handle={filtersHandle}
                filtersQuery={filtersQuery}
            />
            <Stack pb={"xl"} gap={"lg"}>
                <Group h={"100%"} justify='space-between' pt={"xs"}>
                    <Group>
                        <HeaderBurgerMenu navbarOpened={navbarOpened} navbarHandle={navbarHandle} />
                        <CraftsDatabaseMenu />
                    </Group>
                    <Group gap={"xs"}>
                        <Tooltip label="Sort">
                            <ActionIcon size={"lg"} variant='subtle'>
                                <IconArrowsSort size={18} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Filters">
                            <ActionIcon onClick={filtersHandle.open} size={"lg"} variant='subtle'>
                                <IconFilter size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
                <SearchTermFilter />
            </Stack>
        </>
    )
}