import { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { useDefaultProvidersQuery, useProvidersQuery } from "../../../api/providersApi";
import { Provider } from "../../../model/Provider";
import { PromptRequest } from "../../../model/PromptRequest";

export function PromptOptionsProvidersField() {
    const [providersData, setProvidersData] = useState<{ label: "", value: "" }[]>([]);
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const providersQuery = useProvidersQuery(userPromptRequest.technology.id);
    const defaultProviderQuery = useDefaultProvidersQuery(userPromptRequest.technology.id);

    // Set providers data for selectbox
    useEffect(() => {
        if (providersQuery.data && providersData.length === 0) {
            const newProvidersData = providersQuery.data.map((provider: Provider) => {
                return {
                    label: provider.name,
                    value: provider.id.toString()
                }
            });

            setProvidersData(newProvidersData);
        }
    }, [providersQuery, providersData]);


    // Update UserRequest with default Provider
    useEffect(() => {
        if (defaultProviderQuery.data && userPromptRequest.provider.id <= 0) {
            updateProvider(defaultProviderQuery.data);
        }
    }, [defaultProviderQuery]);

    const updateProvider = (provider: Provider) => {
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.provider = Provider.clone(provider);
        setUserPromptRequest(newUserRequest);
    }

    const onChange = (providerId: string | null) => {
        if (providerId !== "") {
            const provider = providersQuery.data.find((p: Provider) => p.id === parseInt(providerId as string));

            if (provider) {
                updateProvider(provider);
            }
        }
    }

    return (
        providersQuery.data !== undefined && defaultProviderQuery.data !== undefined &&
        <Select
            value={userPromptRequest.provider.id.toString()}
            data={providersData}
            onChange={onChange}
        />
    )
}