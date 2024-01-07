import { Checkbox, Stack, Title } from "@mantine/core";
import { PromptsSelectedFilters } from "../../../model/PromptsSelectedFilters";
import { ModifiersSelectedFilters } from "../../../model/ModifiersSelectedFilters";

interface TechnologiesFilter {
    technologies: { id: number, name: string, slug: string, default: boolean }[],
    selectedFilters: PromptsSelectedFilters, 
    setSelectedFilters: any
}

export function TechnologiesFilter({ technologies, selectedFilters, setSelectedFilters }: TechnologiesFilter) {
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