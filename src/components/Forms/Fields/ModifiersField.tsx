import { MultiSelect } from "@mantine/core";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Template } from "../../../models/Template";
import { useAllModifiersQuery } from "../../../api/modifiersApi";
import { FieldProps } from "./FieldProps";

export function ModifiersField({form}: FieldProps) {
    const [
        user,
    ] = useStore(useShallow(state => [
        state.user,
    ]));

    const modifiersQuery = useAllModifiersQuery(user);

    if (modifiersQuery.data) {
        const selectData = modifiersQuery.data.map((m: Template) => {
            return {
                label: m.title,
                value: m.uuid
            }
        });

        return <MultiSelect
            label="Modifiers"
            data={selectData}
            {...form.getInputProps('modifiers_ids')}
        />
    }

    return <></>
}