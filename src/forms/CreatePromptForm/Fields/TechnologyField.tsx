import { Select } from "@mantine/core";
import { useCreatePromptFormContext } from "../../../context/CreatePromptFormContext";
import { useFiltersQuery } from "../../../api/filtersApi";
import { Technology } from "../../../models/Technology";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";

export function TechnologyField() {
    const form = useCreatePromptFormContext();
    const [user] = useStore(useShallow(state => [state.user]));
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