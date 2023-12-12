import { Checkbox, Stack, Title } from '@mantine/core';
import { useFilters } from '../../context/FiltersContext';
import { useSelectedFilters } from '../../context/SelectedFiltersContext';

interface RepositoryFilter {
    refreshRepository: any
}

export function RepositoryFilter({refreshRepository}: RepositoryFilter) {
    const { filters } = useFilters();
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (value: any) => {
        const newSelectedFilters = {
            ...selectedFilters,
            repositories: filters.repositories.filter(r => value.includes(r.slug))
        }

        setSelectedFilters(newSelectedFilters)

        refreshRepository(newSelectedFilters)
    }

    return (
        <Stack>
            <Title order={5}>Repositories</Title>
            <Checkbox.Group defaultValue={filters.repositories.map(r => r.slug)} value={selectedFilters.repositories.map(r => r.slug)} onChange={update}>
                <Stack>
                    {
                        filters.repositories.map(repository => {
                            return (
                                <Checkbox radius={"sm"} value={repository.slug} label={repository.name} />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    );
}