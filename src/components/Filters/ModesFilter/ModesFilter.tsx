import { Checkbox, Stack, Title } from "@mantine/core";
import { PromptsSelectedFilters } from "../../../model/PromptsSelectedFilters";
import { ModifiersSelectedFilters } from "../../../model/ModifiersSelectedFilters";

interface ModesFilter {
    modes: { id: number, name: string, slug: string, default: boolean }[],
    selectedFilters: PromptsSelectedFilters, 
    setSelectedFilters: any
}

export function ModesFilter({ modes, selectedFilters, setSelectedFilters }: ModesFilter) {
    const update = (ids: string[]) => {
        setSelectedFilters({
            ...selectedFilters,
            modes_ids: ids.map(id => parseInt(id))
        })
    }

    return (
        <Stack>
            <Title order={5}>Modes</Title>
            <Checkbox.Group
                value={selectedFilters.modes_ids.map(id => id.toString())}
                onChange={update}
            >
                <Stack>
                    {
                        modes.map(mode => {
                            return (
                                <Checkbox
                                    key={mode.id}
                                    radius={"sm"}
                                    value={mode.id.toString()}
                                    label={mode.name}
                                />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    );
}