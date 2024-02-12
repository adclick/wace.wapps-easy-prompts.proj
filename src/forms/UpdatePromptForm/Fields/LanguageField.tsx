import { Select } from "@mantine/core";
import { useFiltersQuery } from "../../../api/filtersApi";
import { Language } from "../../../models/Language";
import { useUpdatePromptFormContext } from "../../../context/UpdatePromptFormContext";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";

export function LanguageField() {
    const form = useUpdatePromptFormContext();
    const [user] = useStore(useShallow(state => [state.user]));
    const {data} = useFiltersQuery(user);

    if (data) {
        const selectData = data.languages.map((l: Language) => {
            return {
                label: l.name,
                value: l.id.toString()
            }
        });

        return <Select
            label="Language"
            data={selectData}
            {...form.getInputProps('language_id')}
        />
    }

    return <></>
}