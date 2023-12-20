import { Drawer, Loader, Stack, Text } from "@mantine/core";
import { LanguagesFilter } from "../LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../TechnologiesFilter/TechnologiesFilter";
import { TypesFilter } from "../TypesFilter/TypesFilter";

interface FiltersContainer {
    opened: boolean,
    handle: any
    refreshRepository: any,
    filtersQuery: any
}

export function FiltersContainer({
    opened,
    handle,
    refreshRepository,
    filtersQuery
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
                    <LanguagesFilter languages={data.data.data.languages} refreshRepository={refreshRepository} />
                    <RepositoriesFilter repositories={data.data.data.repositories} refreshRepository={refreshRepository} />
                    <TechnologiesFilter technologies={data.data.data.technologies} refreshRepository={refreshRepository} />
                    <TypesFilter craftsTypes={data.data.data.crafts} refreshRepository={refreshRepository} />
                </Stack>

            }
        </Drawer>
    )
}