import { Text, Checkbox, Stack, Title } from '@mantine/core';
import { useSelectedFilters } from '../../../context/SelectedFiltersContext';

interface RepositoriesFilter {
    repositories: { id: number, name: string, slug: string }[],
}

export function RepositoriesFilter({
    repositories,
}: RepositoriesFilter) {
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (ids: string[]) => {
        const newSelectedFilters = {
            ...selectedFilters,
            repositories_ids: ids.map(id => parseInt(id))
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
                <Checkbox.Group value={selectedFilters.repositories_ids.map(id => id.toString())} onChange={update}>
                    <Stack>
                        {
                            repositories.map(repository => {
                                return (
                                    <Checkbox
                                        key={repository.slug}
                                        radius={"sm"}
                                        value={repository.id.toString()}
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