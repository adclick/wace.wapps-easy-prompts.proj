import { Tooltip, ActionIcon, Group, Stack } from "@mantine/core";
import { IconFilter, IconArrowsSort, IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { useUser } from "../../../context/UserContext";
import { SearchTermFilter } from "../../Filters/SearchTermFilter/SearchTermFilter";
import { useEffect } from "react";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../DatabaseMenu/DatabaseMenu";
import { usePromptsFiltersQuery } from "../../../api/promptsApi";
import { useModifiersFiltersQuery } from "../../../api/modifiersApi";
import { usePromptsSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";
import { useModifiersSelectedFilters } from "../../../context/PromptsSelectedFiltersContext copy";
import { PromptsSelectedFilters } from "../../../model/PromptsSelectedFilters";
import { ModifiersSelectedFilters } from "../../../model/ModifiersSelectedFilters";

interface DatabaseHeader {
    navbarOpened: boolean,
    navbarHandle: any,
}

export function DatabaseHeader({ navbarOpened, navbarHandle }: DatabaseHeader) {
    const [filtersOpened, filtersHandle] = useDisclosure(false);

    const { user } = useUser();
    const { promptsSelectedFilters, setPromptsSelectedFilters } = usePromptsSelectedFilters();
    const { modifiersSelectedFilters, setModifiersSelectedFilters } = useModifiersSelectedFilters();
    const promptsFiltersQuery = usePromptsFiltersQuery(user.id);
    const modifiersFiltersQuery = useModifiersFiltersQuery(user.id);

    // Init selectedFilters
    useEffect(() => {
        if (promptsFiltersQuery.data && promptsSelectedFilters.isEmpty) {
            const newSelectedFilters = PromptsSelectedFilters.buildFromQuery(promptsFiltersQuery.data);
            setPromptsSelectedFilters(newSelectedFilters);
        }

        if (modifiersFiltersQuery.data && modifiersSelectedFilters.isEmpty) {
            const newSelectedFilters = ModifiersSelectedFilters.buildFromQuery(modifiersFiltersQuery.data);
            setModifiersSelectedFilters(newSelectedFilters);
        }
    })

    return (
        <Stack pb={"xl"} gap={"lg"}>
            <Group h={"100%"} justify='space-between' pt={"xs"}>
                <Group>
                    <HeaderBurgerMenu navbarOpened={navbarOpened} navbarHandle={navbarHandle} />
                    <DatabaseMenu />
                </Group>
                <Group gap={"xs"}>
                    <Tooltip label="Add">
                        <ActionIcon size={"lg"} variant='subtle'>
                            <IconPlus size={18} />
                        </ActionIcon>
                    </Tooltip>
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
            <FiltersContainer
                opened={filtersOpened}
                handle={filtersHandle}
                promptsFiltersQuery={promptsFiltersQuery}
                modifiersFiltersQuery={modifiersFiltersQuery}
            />
        </Stack>
    )
}