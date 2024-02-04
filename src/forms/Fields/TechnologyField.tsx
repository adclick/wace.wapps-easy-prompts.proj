import { Select } from "@mantine/core";
import { useModifierFormContext } from "../../context/ModifierFormContext";
import { useFiltersQuery } from "../../api/filtersApi";
import { useUser } from "../../context/UserContext";
import { Repository } from "../../model/Repository";
import { Technology } from "../../model/Technology";

export function TechnologyField() {
    const form = useModifierFormContext();
    const { user } = useUser();
    const {data} = useFiltersQuery(user.id);

    if (data) {
        const selectData = data.technologies.map((t: Technology) => {
            return {
                label: t.name,
                value: t.id.toString()
            }
        });

        return <Select
            label="Technology"
            data={selectData}
            {...form.getInputProps('technology_id')}
        />
    }

    return <></>
}