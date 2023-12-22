import { Checkbox, Stack, Title } from "@mantine/core";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";

interface TechnologiesFilter {
    technologies: { id: number, name: string, slug: string, default: boolean }[],
}

export function TechnologiesFilter({ technologies }: TechnologiesFilter) {
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (ids: string[]) => {
        setSelectedFilters({
            ...selectedFilters,
            technologies_ids: ids.map(id => parseInt(id))
        })
    }

    return (
        <Stack>
            <Title order={5}>Technologies</Title>
            <Checkbox.Group
                value={selectedFilters.technologies_ids.map(id => id.toString())}
                onChange={update}
            >
                <Stack>
                    {
                        technologies.map(technology => {
                            return (
                                <Checkbox
                                    key={technology.id}
                                    radius={"sm"}
                                    value={technology.id.toString()}
                                    label={technology.name}
                                />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    );
}