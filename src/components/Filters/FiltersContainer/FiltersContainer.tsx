import { ActionIcon, Card, Collapse, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { LanguagesFilter } from "../LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../TechnologiesFilter/TechnologiesFilter";
import { SearchTermFilter } from "../SearchTermFilter/SearchTermFilter";
import { iconClose } from "../../../utils/iconsUtils";
import { SelectedFilters } from "../../../models/SelectedFilters";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useFiltersQuery, usePrivateFiltersQuery } from "../../../api/filtersApi";
import { useEffect } from "react";
import { BooleanHandle } from "../../../types";

interface FiltersContainer {
    opened: boolean,
    handle: BooleanHandle
}

export function FiltersContainer({
    opened,
    handle,
}: FiltersContainer) {
    const [
        user,
        selectedPrivateFilters,
        setSelectedPrivateFilters,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedPrivateFilters,
        state.setSelectedPrivateFilters,

    ]));
    const selectedFiltersQuery = useFiltersQuery(user);

    // Init selectedFilters
    useEffect(() => {
        if (selectedPrivateFilters.isEmpty && selectedFiltersQuery.data) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(selectedFiltersQuery.data);
            setSelectedPrivateFilters(newSelectedFilters);
        }
    }, [selectedPrivateFilters, selectedFiltersQuery]);



    let filters = <Loader />;
    let searchTermFilter = <></>;

    if (selectedFiltersQuery.data) {
        filters = <Stack gap={"xs"}>
            <LanguagesFilter
                languages={selectedFiltersQuery.data.languages}
                selectedFilters={selectedPrivateFilters}
                setSelectedFilters={setSelectedPrivateFilters}
            />
            <RepositoriesFilter
                repositories={selectedFiltersQuery.data.repositories}
                selectedFilters={selectedPrivateFilters}
                setSelectedFilters={setSelectedPrivateFilters}
            />
            <TechnologiesFilter
                technologies={selectedFiltersQuery.data.technologies}
                selectedFilters={selectedPrivateFilters}
                setSelectedFilters={setSelectedPrivateFilters}
            />
        </Stack>
        searchTermFilter = <SearchTermFilter
            selectedFilters={selectedPrivateFilters}
            setSelectedFilters={setSelectedPrivateFilters}
        />
    }

    return (
        <>
            <Collapse in={opened}>
                <Card>
                    <Stack>
                        <Group justify="space-between">
                            <Title order={5}>Filters</Title>
                            <ActionIcon
                                color="--mantine-color-text"
                                variant="transparent"
                                onClick={handle.close}
                            >

                                {iconClose(14)}
                            </ActionIcon>
                        </Group>
                        {filters}
                    </Stack>
                </Card>
            </Collapse>
            {searchTermFilter}
        </>
    )
}