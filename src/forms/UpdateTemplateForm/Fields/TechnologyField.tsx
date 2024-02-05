import { Select } from "@mantine/core";
import { useUpdateTemplateFormContext } from "../../../context/UpdateTemplateFormContext";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { Repository } from "../../../models/Repository";
import { Technology } from "../../../models/Technology";

export function TechnologyField() {
    const form = useUpdateTemplateFormContext();
    const { user } = useUser();
    const { data } = useFiltersQuery(user.id);

    if (data) {
        const selectData = data.technologies.map((t: Technology) => {
            return {
                label: t.name,
                value: t.id.toString()
            }
        });

        return <Select
            allowDeselect={false}
            label="Technology"
            data={selectData}
            {...form.getInputProps('technology_id')}
        />
    }

    return <></>
}