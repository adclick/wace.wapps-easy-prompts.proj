import { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { useUserRequest } from "../../../context/UserRequestContext";
import { useDefaultProvidersQuery, useProvidersQuery } from "../../../api/providersApi";
import { Provider } from "../../../model/Provider";
import { Request } from "../../../model/Request";

export function ChatPromptProvidersField() {
    const [providersData, setProvidersData] = useState<{ label: "", value: "" }[]>([]);
    const { userRequest, setUserRequest } = useUserRequest();
    const providersQuery = useProvidersQuery(userRequest.technology.id);
    const defaultProviderQuery = useDefaultProvidersQuery(userRequest.technology.id);

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


    // Update UserRequest with default Technology
    useEffect(() => {
        if (defaultProviderQuery.data && userRequest.provider.id <= 0) {
            updateProvider(defaultProviderQuery.data);
        }
    }, [defaultProviderQuery]);

    const updateProvider = (provider: Provider) => {
        const newUserRequest = Request.clone(userRequest);
        newUserRequest.provider = Provider.clone(provider);
        setUserRequest(newUserRequest);
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
            label="Provider"
            value={userRequest.provider.id.toString()}
            data={providersData}
            onChange={onChange}
        />
    )
}