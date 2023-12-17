import { IconPlus } from "@tabler/icons-react";
import { useFilters } from "../../context/FiltersContext";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { ActionIcon, Checkbox, Group, Stack, Title } from "@mantine/core";

interface RepositoryTechnologyFilter {
    refreshRepository: any
}

export function RepositoryTechnologyFilter({
    refreshRepository
}: RepositoryTechnologyFilter) {
    const { filters } = useFilters();
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (value: any) => {
        const newSelectedFilters = {
            ...selectedFilters,
            technologies: filters.technologies.filter(t => value.includes(t.slug))
        }

        setSelectedFilters(newSelectedFilters)

        refreshRepository(newSelectedFilters)
    }

    return (
        <Stack>
            <Title order={5}>Technologies</Title>
            <Checkbox.Group defaultValue={filters.technologies.map(r => r.slug)} value={selectedFilters.technologies.map(r => r.slug)} onChange={update}>
                <Stack>
                    {
                        filters.technologies.map(repository => {
                            return (
                                <Checkbox
                                    key={repository.id}
                                    radius={"sm"}
                                    value={repository.slug}
                                    label={repository.name_en}
                                />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    );
}