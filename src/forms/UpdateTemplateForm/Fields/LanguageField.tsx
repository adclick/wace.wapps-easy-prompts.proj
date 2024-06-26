import { Select } from "@mantine/core";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { Language } from "../../../models/Language";
import { useUpdateTemplateFormContext } from "../../../context/UpdateTemplateFormContext";

export function LanguageField() {
    const form = useUpdateTemplateFormContext();
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