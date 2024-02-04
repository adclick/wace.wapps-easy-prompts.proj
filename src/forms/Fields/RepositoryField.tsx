import { Select } from "@mantine/core";
import { useModifierFormContext } from "../../context/ModifierFormContext";
import { useFiltersQuery } from "../../api/filtersApi";
import { useUser } from "../../context/UserContext";
import { Repository } from "../../model/Repository";

export function RepositoryField() {
    const form = useModifierFormContext();
    const { user } = useUser();
    const {data} = useFiltersQuery(user.id);

    if (data) {
        const selectData = data.repositories.map((r: Repository) => {
            return {
                label: r.name,
                value: r.id.toString()
            }
        });

        return <Select
            label="Repository"
            data={selectData}
            {...form.getInputProps('repository_id')}
        />
    }

    return <></>
}