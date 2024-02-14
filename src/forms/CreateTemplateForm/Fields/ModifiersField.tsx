import { MultiSelect } from "@mantine/core";
import { useCreateTemplateFormContext } from "../../../context/CreateTemplateFormContext";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Template } from "../../../models/Template";
import { useAllModifiersQuery } from "../../../api/modifiersApi";

export function ModifiersField() {
    const form = useCreateTemplateFormContext();
    const [
        user,
    ] = useStore(useShallow(state => [
        state.user,
    ]));

    const modifiersQuery = useAllModifiersQuery(user.id);

    if (modifiersQuery.data) {
        const selectData = modifiersQuery.data.map((m: Template) => {
            return {
                label: m.title,
                value: m.id.toString()
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