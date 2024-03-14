import { MultiSelect } from "@mantine/core";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Template } from "../../../models/Template";
import { useAllTemplatesQuery } from "../../../api/templatesApi";
import { FieldProps } from "./FieldProps";

export function TemplatesField({form}: FieldProps) {
    const [
        user,
    ] = useStore(useShallow(state => [
        state.user,
    ]));

    const templatesQuery = useAllTemplatesQuery(user.external_id);

    if (templatesQuery.data) {
        const selectData = templatesQuery.data.map((t: Template) => {
            return {
                label: t.title,
                value: t.uuid
            }
        });

        return <MultiSelect
            label="Templates"
            data={selectData}
            {...form.getInputProps('templates_ids')}
        />
    }

    return <></>
}