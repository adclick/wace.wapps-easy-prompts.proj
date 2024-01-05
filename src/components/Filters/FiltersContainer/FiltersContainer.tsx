import { Drawer, Loader, Stack, Text } from "@mantine/core";
import { LanguagesFilter } from "../LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../TechnologiesFilter/TechnologiesFilter";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { Type } from "../../../model/SelectedDatabaseType";

interface FiltersContainer {
    opened: boolean,
    handle: any
    promptsFiltersQuery: any,
    modifiersFiltersQuery: any,
}

export function FiltersContainer({
    opened,
    handle,
    promptsFiltersQuery,
    modifiersFiltersQuery,
}: FiltersContainer) {
    const { selectedDatabaseType } = useSelectedDatabaseType();

    const title = <Text fw={500} size={"lg"}>Filters</Text>;

    let filters = <Loader />;
    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            if (promptsFiltersQuery.data) {
                filters = <Stack gap={"xl"} my={"xs"}>
                    <LanguagesFilter
                        languages={promptsFiltersQuery.data.languages}
                    />
                    <RepositoriesFilter
                        repositories={promptsFiltersQuery.data.repositories}
                    />
                    <TechnologiesFilter
                        technologies={promptsFiltersQuery.data.technologies}
                    />
                </Stack>
            }
            break;

        case Type.MODIFIER:
            if (modifiersFiltersQuery.data) {
                filters = <Stack gap={"xl"} my={"xs"}>
                    <LanguagesFilter
                        languages={modifiersFiltersQuery.data.languages}
                    />
                    <RepositoriesFilter
                        repositories={modifiersFiltersQuery.data.repositories}
                    />
                </Stack>

            }
            break;
    }

    return (
        <Drawer opened={opened} onClose={handle.close} title={title} size={350}>
            {
                filters
            }
        </Drawer>
    )
}