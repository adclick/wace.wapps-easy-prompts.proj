import { Select, Text } from "@mantine/core";
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

    // const onChangeMultiple = (providersSelected: string[]) => {
    //     if (providersSelected.length > 0) {
    //         const providersFound = providers.filter((p: Provider) => providersSelected.includes(p.id.toString()));
    //         const newUserRequest = PromptRequest.clone(userPromptRequest);
    //         newUserRequest.providers = providersFound;
    //         setUserPromptRequest(newUserRequest);
    //     }
    // }

    // const value = userPromptRequest.providers.map(p => p.id.toString());

    // return (
    //     <MultiSelect
    //         comboboxProps={{ withinPortal: false }}
    //         value={value}
    //         data={providerData}
    //         onChange={onChangeMultiple}
    //     />
    // )

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

    const label = <Text fw={700} size="xs">Providers</Text>


    return (
        <Select
            label={label}
            size="xs"
            variant="unstyled"
            allowDeselect={false}
            comboboxProps={{ withinPortal: false }}
            value={userPromptRequest.provider.id.toString()}
            data={providerData}
            onChange={onChange}
        />
    )
}