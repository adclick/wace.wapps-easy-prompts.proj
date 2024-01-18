import { ActionIcon, Card, Collapse, Divider, Drawer, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { LanguagesFilter } from "../LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../TechnologiesFilter/TechnologiesFilter";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { Type } from "../../../model/SelectedDatabaseType";
import { usePromptsSelectedFilters } from "../../../context/PromptsSelectedFiltersContext";
import { useModifiersSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";
import { SearchTermFilter } from "../SearchTermFilter/SearchTermFilter";
import { useTemplatesSelectedFilters } from "../../../context/TemplatesSelectedFiltersContext";
import classes from './FiltersContainer.module.css'
import { iconClose } from "../../../utils/iconsUtils";
import { OrderField } from "../OrderField/OrderField";

interface FiltersContainer {
    opened: boolean,
    handle: any
    promptsFiltersQuery: any,
    modifiersFiltersQuery: any,
    templatesFiltersQuery: any
}

export function FiltersContainer({
    opened,
    handle,
    promptsFiltersQuery,
    modifiersFiltersQuery,
    templatesFiltersQuery
}: FiltersContainer) {
    const { selectedDatabaseType } = useSelectedDatabaseType();
    const { promptsSelectedFilters, setPromptsSelectedFilters } = usePromptsSelectedFilters();
    const { modifiersSelectedFilters, setModifiersSelectedFilters } = useModifiersSelectedFilters();
    const { templatesSelectedFilters, setTemplatesSelectedFilters } = useTemplatesSelectedFilters();

    const title = <Text fw={500} size={"lg"}>Filters</Text>;

    let filters = <Loader />;
    let searchTermFilter = <></>;
    switch (selectedDatabaseType.type) {
        case Type.PROMPT:
            if (promptsFiltersQuery.data) {
                filters = <Stack gap={"xl"}>
                    <OrderField />
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

        case Type.TEMPLATE:
            if (templatesFiltersQuery.data) {
                filters = <Stack gap={"xl"} my={"xs"}>
                    <LanguagesFilter
                        languages={templatesFiltersQuery.data.languages}
                        selectedFilters={templatesSelectedFilters}
                        setSelectedFilters={setTemplatesSelectedFilters}
                    />
                    <RepositoriesFilter
                        repositories={templatesFiltersQuery.data.repositories}
                        selectedFilters={templatesSelectedFilters}
                        setSelectedFilters={setTemplatesSelectedFilters}
                    />
                    <TechnologiesFilter
                        technologies={templatesFiltersQuery.data.technologies}
                        selectedFilters={templatesSelectedFilters}
                        setSelectedFilters={setTemplatesSelectedFilters}
                    />
                </Stack>
                searchTermFilter = <SearchTermFilter
                    selectedFilters={templatesSelectedFilters}
                    setSelectedFilters={setTemplatesSelectedFilters}
                />
            }
            break;
    }

    return (
        <>
            {/* <Drawer
                classNames={{
                    header: classes.header,
                    content: classes.content
                }}
                opened={opened}
                onClose={handle.close}
                title={title}
                size={300}
            >
                {
                    filters
                }
            </Drawer> */}
            {searchTermFilter}
            <Collapse in={opened}>
                <Card>
                        {filters}
                </Card>
            </Collapse>
        </>
    )
}