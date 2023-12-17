import { IconBiohazard, IconPencilStar, IconPlus } from "@tabler/icons-react";
import { useFilters } from "../../context/FiltersContext";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { ActionIcon, Checkbox, CheckboxProps, Group, Stack, Title } from "@mantine/core";
import { Technology } from "../../model/Technology";

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

    const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, ...others }, slug) => {
        if (indeterminate) {
            return Technology.getIcon(slug, 14);
        }

        return <IconBiohazard {...others} />;
    }

    return (
        <Stack>
            <Title order={5}>Technologies</Title>
            <Checkbox.Group
                defaultValue={filters.technologies.map(t => t.slug)}
                value={selectedFilters.technologies.map(t => t.slug)}
                onChange={update}
            >
                <Stack>
                    {
                        filters.technologies.map(technology => {
                            return (
                                <Checkbox
                                    key={technology.id}
                                    radius={"sm"}
                                    value={technology.slug}
                                    label={technology.name_en}
                                    // icon={() => CheckboxIcon({indeterminate: true, className: ""}, technology.slug)}
                                />
                            )
                        })
                    }
                </Stack>
            </Checkbox.Group>
        </Stack>
    );
}