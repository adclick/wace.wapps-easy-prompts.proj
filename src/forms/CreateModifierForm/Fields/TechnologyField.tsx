import { Select } from "@mantine/core";
import { useCreateModifierFormContext } from "../../../context/CreateModifierFormContext";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { Repository } from "../../../models/Repository";
import { Technology } from "../../../models/Technology";

export function TechnologyField() {
    const form = useCreateModifierFormContext();
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