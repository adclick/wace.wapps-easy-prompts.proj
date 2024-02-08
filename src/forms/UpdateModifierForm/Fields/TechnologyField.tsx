import { Select } from "@mantine/core";
import { useUpdateModifierFormContext } from "../../../context/UpdateModifierFormContext";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { Technology } from "../../../models/Technology";

export function TechnologyField() {
    const form = useUpdateModifierFormContext();
    const { user } = useUser();
    const {data} = useFiltersQuery(user);

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