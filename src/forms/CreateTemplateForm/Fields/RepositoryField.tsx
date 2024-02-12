import { Select } from "@mantine/core";
import { useCreateTemplateFormContext } from "../../../context/CreateTemplateFormContext";
import { useFiltersQuery } from "../../../api/filtersApi";
import { Repository } from "../../../models/Repository";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";

export function RepositoryField() {
    const form = useCreateTemplateFormContext();
    const [user] = useStore(useShallow(state => [state.user]));
    const {data} = useFiltersQuery(user);

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