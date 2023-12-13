import { useSelectedFilters } from '../..//context/SelectedFiltersContext';
import { useFilters } from '../../context/FiltersContext';
import { Select, Checkbox, Stack, Title } from '@mantine/core';

interface RepositoryLanguageFilter {
    refreshRepository: any
}

export function RepositoryLanguageFilter({
    refreshRepository
}: RepositoryLanguageFilter) {
    const { filters } = useFilters();
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (value: any) => {
        const newSelectedFilters = {
            ...selectedFilters,
            languages: filters.languages.filter(l => value.includes(l.slug))
        }

        setSelectedFilters(newSelectedFilters)

        refreshRepository(newSelectedFilters)
    }

    return (
        <Stack>
            <Title order={5}>Languages</Title>
            <Checkbox.Group defaultValue={filters.languages.map(r => r.slug)} value={selectedFilters.languages.map(l => l.slug)} onChange={update}>
                <Stack>
                    {
                        filters.languages.map(language => {
                            return (
                                <Checkbox key={language.id} radius={"sm"} value={language.slug} label={language.name} />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    )
}