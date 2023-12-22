import { Drawer, Loader, Stack, Text } from "@mantine/core";
import { LanguagesFilter } from "../LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../TechnologiesFilter/TechnologiesFilter";
import { TypesFilter } from "../TypesFilter/TypesFilter";
import { SelectedFilters } from "../../../model/SelectedFilters";

interface FiltersContainer {
    opened: boolean,
    handle: any
    filtersQuery: any,
}

export function FiltersContainer({
    opened,
    handle,
    filtersQuery,
}: FiltersContainer) {
    const { isLoading, data } = filtersQuery;

    const title = <Text fw={500} size={"lg"}>Filters</Text>;

    return (
        <Drawer opened={opened} onClose={handle.close} title={title} size={350}>
            {
                isLoading && <Loader />
            }
            {
                data !== undefined &&
                <Stack gap={"xl"} my={"xs"}>
                    <LanguagesFilter
                        languages={data.languages}
                    />
                    <RepositoriesFilter
                        repositories={data.repositories}
                    />
                    <TechnologiesFilter
                        technologies={data.technologies}
                    />
                    <TypesFilter
                        craftsTypes={data.crafts}
                    />
                </Stack>

            }
        </Drawer>
    )
}