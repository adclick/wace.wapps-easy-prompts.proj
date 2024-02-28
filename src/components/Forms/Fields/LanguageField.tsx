import { Select } from "@mantine/core";
import { useFiltersQuery } from "../../../api/filtersApi";
import { Language } from "../../../models/Language";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { FieldProps } from "./FieldProps";

export function LanguageField({form}: FieldProps) {
    const [user] = useStore(useShallow(state => [state.user]));
    const {data} = useFiltersQuery(user);

    if (data) {
        const selectData = data.languages.map((l: Language) => {
            return {
                label: l.name,
                value: l.uuid
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