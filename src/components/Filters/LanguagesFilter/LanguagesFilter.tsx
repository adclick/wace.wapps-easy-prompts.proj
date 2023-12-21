import { useSelectedFilters } from '../../../context/SelectedFiltersContext';
import { Select, Checkbox, Stack, Title } from '@mantine/core';

interface LanguagesFilter {
    languages: { id: number, name: string, slug: string }[]
    refreshRepository: any,
}

export function LanguagesFilter({
    languages,
    refreshRepository
}: LanguagesFilter) {
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (value: any) => {
        const newSelectedFilters = {
            ...selectedFilters,
            languages: languages.filter(l => value.includes(l.slug))
        }

        setSelectedFilters(newSelectedFilters)
    }

    return (
        <Stack>
            <Title order={5}>Languages</Title>
            <Checkbox.Group value={languages.map(l => l.slug)} onChange={update}>
                <Stack>
                    {
                        languages.map(language => {
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