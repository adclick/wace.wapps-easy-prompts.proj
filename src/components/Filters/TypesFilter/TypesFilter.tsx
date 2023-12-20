import { RepositoryItem } from "../../../model/RepositoryItem";
import { useFilters } from "../../../context/FiltersContext";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { Checkbox, Group, Stack, Title } from "@mantine/core"

interface TypesFilter {
    craftsTypes: { type: string }[]
    refreshRepository: any
}

export function TypesFilter({
    refreshRepository,
    craftsTypes
}: TypesFilter) {
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
            <Checkbox.Group value={selectedFilters.types} onChange={update}>
                <Stack justify="space-between">
                    {
                        craftsTypes.map(c => {
                            return (
                                <Checkbox key={c.type} radius={"sm"} color={RepositoryItem.getColor(c.type)} value={c.type} label={c.type} />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    )
}