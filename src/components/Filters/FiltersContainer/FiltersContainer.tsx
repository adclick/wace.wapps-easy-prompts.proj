import { ActionIcon, Card, Collapse, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { LanguagesFilter } from "../LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../TechnologiesFilter/TechnologiesFilter";
import { SearchTermFilter } from "../SearchTermFilter/SearchTermFilter";
import classes from './FiltersContainer.module.css';
import { iconClose } from "../../../utils/iconsUtils";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";

interface FiltersContainer {
    opened: boolean,
    handle: any
    selectedFiltersQuery: any
}

export function FiltersContainer({
    opened,
    handle,
    selectedFiltersQuery
}: FiltersContainer) {
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const title = <Text fw={500} size={"lg"}>Filters</Text>;

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