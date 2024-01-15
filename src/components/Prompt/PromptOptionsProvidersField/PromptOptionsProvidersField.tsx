import { Select } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { Provider } from "../../../model/Provider";
import { PromptRequest } from "../../../model/PromptRequest";

export interface ProvidersDataItem {
    label: string,
    value: string
}

interface PromptOptionsProvidersField {
    providerData: ProvidersDataItem[],
    providers: Provider[]
}

export function PromptOptionsProvidersField({ providerData, providers }: PromptOptionsProvidersField) {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();

    const onChange = (providerId: string | null) => {
        if (providerId !== "") {
            const provider = providers.find((p: Provider) => p.id === parseInt(providerId as string));

            if (provider) {
                const newUserRequest = PromptRequest.clone(userPromptRequest);
                newUserRequest.provider = Provider.clone(provider);
                setUserPromptRequest(newUserRequest);
            }
        }
    }

    return (
        <Select
            allowDeselect={false}
            comboboxProps={{ withinPortal: false }}
            value={userPromptRequest.provider.id.toString()}
            data={providerData}
            onChange={onChange}
        />
    )
}