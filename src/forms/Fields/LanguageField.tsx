import { Select } from "@mantine/core";
import { useModifierFormContext } from "../../context/ModifierFormContext";
import { useFiltersQuery } from "../../api/filtersApi";
import { useUser } from "../../context/UserContext";
import { Language } from "../../model/Language";

export function LanguageField() {
    const form = useModifierFormContext();
    const { user } = useUser();
    const {data} = useFiltersQuery(user.id);

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