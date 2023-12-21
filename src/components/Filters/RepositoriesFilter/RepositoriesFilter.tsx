import { Text, ActionIcon, Checkbox, Group, Stack, Title, Loader } from '@mantine/core';
import { useFilters } from '../../../context/FiltersContext';
import { useSelectedFilters } from '../../../context/SelectedFiltersContext';

interface RepositoriesFilter {
    repositories: { id: number, name: string, slug: string }[],
    refreshRepository: any
}

export function RepositoriesFilter({
    repositories,
    refreshRepository
}: RepositoriesFilter) {
    const { filters } = useFilters();
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (value: any) => {
        const newSelectedFilters = {
            ...selectedFilters,
            repositories: repositories.filter(r => value.includes(r.slug))
        }

        setSelectedFilters(newSelectedFilters)
    }

    return (
        <Stack>
            <Title order={5}>Repositories</Title>
            {
                repositories.length === 0 && <Text size='sm'>Empty</Text>
            }
            {
                repositories.length > 0 &&
                <Checkbox.Group value={repositories.map(r => r.slug)} onChange={update}>
                    <Stack>
                        {
                            repositories.map(repository => {
                                return (
                                    <Checkbox
                                        key={repository.slug}
                                        radius={"sm"}
                                        value={repository.slug}
                                        label={repository.name}
                                    />
                                )
                            })
                        }
                    </Stack>
                </Checkbox.Group>
            }
        </Stack>
    );
}