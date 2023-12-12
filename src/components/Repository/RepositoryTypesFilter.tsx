import { RepositoryItem } from "../../model/RepositoryItem";
import { useFilters } from "../../context/FiltersContext";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { Checkbox, Group, Stack, Title } from "@mantine/core"

interface RepositoryTypesFilter {
    refreshRepository: any
}

export function RepositoryTypesFilter({ refreshRepository }: RepositoryTypesFilter) {
    const { filters } = useFilters();
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (value: any) => {
        const newSelectedFilters = {
            ...selectedFilters,
            types: value
        };


        setSelectedFilters(newSelectedFilters);
        refreshRepository(newSelectedFilters);
    }

    return (
        <Stack>
            <Title order={5}>Types</Title>
            <Checkbox.Group defaultValue={filters.types} value={selectedFilters.types} onChange={update}>
                <Stack justify="space-between">
                    <Checkbox radius={"sm"} color={RepositoryItem.getColor("prompt")} value="prompts" label="Prompts" />
                    <Checkbox radius={"sm"} color={RepositoryItem.getColor("template")} value="templates" label="Templates" />
                    <Checkbox radius={"sm"} color={RepositoryItem.getColor("modifier")} value="modifiers" label="Modifiers" />
                </Stack>
            </Checkbox.Group>
        </Stack>
    )
}