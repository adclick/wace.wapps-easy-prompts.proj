import { ActionIcon, Card, Collapse, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { LanguagesFilter } from "../LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../TechnologiesFilter/TechnologiesFilter";
import { SearchTermFilter } from "../SearchTermFilter/SearchTermFilter";
import { iconClose } from "../../../utils/iconsUtils";
import { SelectedFilters } from "../../../models/SelectedFilters";

interface FiltersContainer {
    opened: boolean,
    handle: any
    selectedFiltersQuery: any,
    selectedFilters: SelectedFilters,
    setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>
}

export function FiltersContainer({
    opened,
    handle,
    selectedFiltersQuery,
    selectedFilters,
    setSelectedFilters,
}: FiltersContainer) {
    let filters = <Loader />;
    let searchTermFilter = <></>;

    if (selectedFiltersQuery.data) {
        filters = <Stack gap={"xs"}>
            <LanguagesFilter
                languages={selectedFiltersQuery.data.languages}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />
            <RepositoriesFilter
                repositories={selectedFiltersQuery.data.repositories}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />
            <TechnologiesFilter
                technologies={selectedFiltersQuery.data.technologies}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />
        </Stack>
        searchTermFilter = <SearchTermFilter
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
        />
    }

    return (
        <>
            {searchTermFilter}
            <Collapse in={opened}>
                <Card>
                    <Stack>
                        <Group justify="space-between">
                            <Title order={5}>Filters</Title>
                            <ActionIcon
                                color="gray"
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
        </>
    )
}