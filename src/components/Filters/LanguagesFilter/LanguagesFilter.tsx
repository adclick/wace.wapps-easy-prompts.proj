import { Checkbox, Stack, Title } from '@mantine/core';
import { useSelectedFilters } from '../../../context/SelectedFiltersContext';

interface LanguagesFilter {
    languages: { id: number, name: string, slug: string }[],
}

export function LanguagesFilter({ languages }: LanguagesFilter) {
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (ids: string[]) => {
        setSelectedFilters({
            ...selectedFilters,
            languages_ids: ids.map(id => parseInt(id))
        })
    }

    return (
        <Stack>
            <Title order={5}>Languages</Title>
            <Checkbox.Group value={selectedFilters.languages_ids.map(id => id.toString())} onChange={update}>
                <Stack>
                    {
                        languages.map(language => {
                            return (
                                <Checkbox
                                    key={language.id}
                                    radius={"sm"}
                                    value={language.id.toString()}
                                    label={language.name}
                                />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    )
}