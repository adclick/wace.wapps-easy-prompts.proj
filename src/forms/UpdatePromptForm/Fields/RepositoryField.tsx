import { Select } from "@mantine/core";
import { useUpdatePromptFormContext } from "../../../context/UpdatePromptFormContext";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { Repository } from "../../../models/Repository";

export function RepositoryField() {
    const form = useUpdatePromptFormContext();
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