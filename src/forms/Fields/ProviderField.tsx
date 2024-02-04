import { Select } from "@mantine/core";
import { useModifierFormContext } from "../../context/ModifierFormContext";
import { useProvidersQuery } from "../../api/providersApi";
import { Provider } from "../../model/Provider";

export function ProviderField() {
    const form = useModifierFormContext();
    const { data } = useProvidersQuery(form.values.technology_id);

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