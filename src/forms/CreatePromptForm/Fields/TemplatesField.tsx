import { MultiSelect } from "@mantine/core";
import { useCreatePromptFormContext } from "../../../context/CreatePromptFormContext";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { Template } from "../../../models/Template";
import { useAllTemplatesQuery } from "../../../api/templatesApi";

export function TemplatesField() {
    const form = useCreatePromptFormContext();
    const [
        user,
    ] = useStore(useShallow(state => [
        state.user,
    ]));

    const templatesQuery = useAllTemplatesQuery(user.id);

    if (templatesQuery.data) {
        const selectData = templatesQuery.data.map((t: Template) => {
            return {
                label: t.title,
                value: t.id.toString()
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