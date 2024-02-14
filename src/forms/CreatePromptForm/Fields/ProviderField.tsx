import { Select } from "@mantine/core";
import { useCreatePromptFormContext } from "../../../context/CreatePromptFormContext";
import { useProvidersQuery } from "../../../api/providersApi";
import { Provider } from "../../../models/Provider";

export function ProviderField() {
    const form = useCreatePromptFormContext();
    const { data } = useProvidersQuery(parseInt(form.values.technology_id));

    if (data) {
        const selectData = data.map((p: Provider) => {
            return {
                label: p.model_name,
                value: p.id.toString()
            }
        });

        return <Select
            label="Provider"
            data={selectData}
            {...form.getInputProps('provider_id')}
        />
    }

    return <></>
}