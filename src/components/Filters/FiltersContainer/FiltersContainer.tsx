import { Drawer, Loader, Stack, Text } from "@mantine/core";
import { LanguagesFilter } from "../LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../TechnologiesFilter/TechnologiesFilter";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { usePromptsSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";
import { useModifiersSelectedFilters } from "../../../context/PromptsSelectedFiltersContext";
import { SearchTermFilter } from "../SearchTermFilter/SearchTermFilter";

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
    const { promptsSelectedFilters, setPromptsSelectedFilters } = usePromptsSelectedFilters();
    const { modifiersSelectedFilters, setModifiersSelectedFilters } = useModifiersSelectedFilters();

    const title = <Text fw={500} size={"lg"}>Filters</Text>;

    let filters = <Loader />;
    let searchTermFilter = <></>;
    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            if (promptsFiltersQuery.data) {
                filters = <Stack gap={"xl"} my={"xs"}>
                    <LanguagesFilter
                        languages={promptsFiltersQuery.data.languages}
                        selectedFilters={promptsSelectedFilters}
                        setSelectedFilters={setPromptsSelectedFilters}
                    />
                    <RepositoriesFilter
                        repositories={promptsFiltersQuery.data.repositories}
                        selectedFilters={promptsSelectedFilters}
                        setSelectedFilters={setPromptsSelectedFilters}
                    />
                    <TechnologiesFilter
                        technologies={promptsFiltersQuery.data.technologies}
                        selectedFilters={promptsSelectedFilters}
                        setSelectedFilters={setPromptsSelectedFilters}
                    />
                    {/* <ModesFilter
                        modes={promptsFiltersQuery.data.modes}
                        selectedFilters={promptsSelectedFilters}
                        setSelectedFilters={setPromptsSelectedFilters}
                    /> */}
                </Stack>
                searchTermFilter = <SearchTermFilter
                    selectedFilters={promptsSelectedFilters}
                    setSelectedFilters={setPromptsSelectedFilters}
                />
            }
            break;

        case Type.MODIFIER:
            if (modifiersFiltersQuery.data) {
                filters = <Stack gap={"xl"} my={"xs"}>
                    <LanguagesFilter
                        languages={modifiersFiltersQuery.data.languages}
                        selectedFilters={modifiersSelectedFilters}
                        setSelectedFilters={setModifiersSelectedFilters}
                    />
                    <RepositoriesFilter
                        repositories={modifiersFiltersQuery.data.repositories}
                        selectedFilters={modifiersSelectedFilters}
                        setSelectedFilters={setModifiersSelectedFilters}
                    />
                </Stack>
                searchTermFilter = <SearchTermFilter
                    selectedFilters={modifiersSelectedFilters}
                    setSelectedFilters={setModifiersSelectedFilters}
                />
            }
            break;
    }

    return (
        <>
            <Drawer opened={opened} onClose={handle.close} title={title} size={350}>
                {
                    filters
                }
            </Drawer>
            {searchTermFilter}
        </>
    )
}