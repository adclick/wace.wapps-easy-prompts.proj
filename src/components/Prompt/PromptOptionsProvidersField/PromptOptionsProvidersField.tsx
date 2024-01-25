import { Select } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";

export interface ProvidersDataItem {
    label: string,
    value: string
}

interface PromptOptionsProvidersField {
    providerData: ProvidersDataItem[],
    onChangeProvider: any
}

export function PromptOptionsProvidersField({ providerData, onChangeProvider }: PromptOptionsProvidersField) {
    const { userPromptRequest } = useUserPromptRequest();

    return (
        <Select
            label={"Provider"}
            size="sm"
            variant="unstyled"
            allowDeselect={false}
            comboboxProps={{ withinPortal: false }}
            value={userPromptRequest.provider.id.toString()}
            data={providerData}
            onChange={onChangeProvider}
        />
    )
}