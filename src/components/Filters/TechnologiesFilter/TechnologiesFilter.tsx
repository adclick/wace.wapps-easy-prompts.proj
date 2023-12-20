import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { ActionIcon, Checkbox, CheckboxProps, Group, Stack, Title } from "@mantine/core";

interface TechnologiesFilter {
    refreshRepository: any,
    technologies: {id: number, name: string, slug: string, default: boolean}[]
}

export function TechnologiesFilter({
    refreshRepository,
    technologies
}: TechnologiesFilter) {
    const { selectedFilters, setSelectedFilters } = useSelectedFilters();

    const update = (value: any) => {
        const newSelectedFilters = {
            ...selectedFilters,
            technologies: technologies.filter(t => value.includes(t.slug))
        }

        setSelectedFilters(newSelectedFilters)

        refreshRepository(newSelectedFilters)
    }

    return (
        <Stack>
            <Title order={5}>Technologies</Title>
            <Checkbox.Group
                value={selectedFilters.technologies.map(t => t.slug)}
                onChange={update}
            >
                <Stack>
                    {
                        technologies.map(technology => {
                            return (
                                <Checkbox
                                    key={technology.id}
                                    radius={"sm"}
                                    value={technology.slug}
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