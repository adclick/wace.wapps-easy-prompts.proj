import { Select } from "@mantine/core";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { Language } from "../../../models/Language";
import { useUpdatePromptFormContext } from "../../../context/UpdatePromptFormContext";

export function LanguageField() {
    const form = useUpdatePromptFormContext();
    const { user } = useUser();
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