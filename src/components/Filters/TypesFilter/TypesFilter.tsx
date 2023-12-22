import { Checkbox, Stack, Title } from "@mantine/core"
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";

interface TypesFilter {
    craftsTypes: { type: string }[],
}

export function TypesFilter({
    craftsTypes,
}: TypesFilter) {
    const {selectedFilters, setSelectedFilters} = useSelectedFilters();

    const update = (types: string[]) => {
        setSelectedFilters({
            ...selectedFilters,
            crafts_types: types
        });
    }

    return (
        <Stack>
            <Title order={5}>Types</Title>
            <Checkbox.Group value={selectedFilters.crafts_types} onChange={update}>
                <Stack justify="space-between">
                    {
                        craftsTypes.map(c => {
                            return (
                                <Checkbox
                                    key={c.type}
                                    radius={"sm"}
                                    value={c.type}
                                    label={c.type}
                                />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    )
}