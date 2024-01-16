import { ActionIcon, Group, Stack, Tooltip } from "@mantine/core";
import { HeaderBurgerMenu } from "../../Layout/HeaderBurgerMenu/HeaderBurgerMenu";
import { DatabaseMenu } from "../DatabaseMenu/DatabaseMenu";
import { IconArrowsSort, IconFilter } from "@tabler/icons-react";
import { useEffect } from "react";
import { usePromptsSelectedFilters } from "../../../context/PromptsSelectedFiltersContext";
import { PromptsSelectedFilters } from "../../../model/PromptsSelectedFilters";

interface PromptsHeader {
    navbarOpened: boolean,
    navbarHandle: any,
    filtersHandle: any
    filtersQuery: any
}

export function PromptsHeader({
    navbarOpened,
    navbarHandle,
    filtersHandle,
    filtersQuery
}: PromptsHeader) {

    return (
        <Group h={"100%"} justify='space-between' pt={"xs"}>
            <Group>
                <HeaderBurgerMenu navbarOpened={navbarOpened} navbarHandle={navbarHandle} />
                <DatabaseMenu />
            </Group>
            <Group gap={"xs"}>
                <Tooltip label="Filters">
                    <ActionIcon onClick={filtersHandle.open} size={"lg"} variant='subtle'>
                        <IconFilter size={18} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Group>
    )
}