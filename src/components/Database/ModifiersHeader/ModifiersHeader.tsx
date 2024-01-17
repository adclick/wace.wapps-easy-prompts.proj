import { ActionIcon, Group, Stack, Tooltip } from "@mantine/core";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../DatabaseMenu/DatabaseMenu";
import { IconArrowsSort, IconFilter, IconPlus } from "@tabler/icons-react";
import { FiltersContainer } from "../../Filters/FiltersContainer/FiltersContainer";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "../../../context/UserContext";
import { useModifiersSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";
import { usePromptsFiltersQuery } from "../../../api/promptsApi";
import { useModifiersFiltersQuery } from "../../../api/modifiersApi";
import { useEffect } from "react";
import { ModifiersSelectedFilters } from "../../../model/ModifiersSelectedFilters";
import { NewModifierModal } from "../NewModifierModal/NewModifierModal";

interface ModifiersHeader {
    navbarOpened: boolean,
    navbarHandle: any,
    filtersHandle: any
    filtersQuery: any
}

export function ModifiersHeader({
    navbarOpened,
    navbarHandle,
    filtersHandle,
    filtersQuery
}: ModifiersHeader) {
    const [newModifierModalOpened, newModifierModalHandle] = useDisclosure(false);

    return (
        <>
            <NewModifierModal opened={newModifierModalOpened} handle={newModifierModalHandle} />
            <Group h={"100%"} justify='space-between' pt={"xs"}>
                <Group>
                    <HeaderBurgerMenu navbarOpened={navbarOpened} navbarHandle={navbarHandle} />
                    <DatabaseMenu />
                </Group>
                <Group gap={"xs"}>
                    <Tooltip label="Add">
                        <ActionIcon size={"lg"} variant='subtle' onClick={newModifierModalHandle.open}>
                            <IconPlus size={18} stroke={3} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Filters">
                        <ActionIcon onClick={filtersHandle.open} size={"lg"} variant='subtle'>
                            <IconFilter size={18} stroke={3} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
        </>
    )
}