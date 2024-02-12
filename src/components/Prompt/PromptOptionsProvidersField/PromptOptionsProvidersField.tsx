import { Loader, Select, Slider, Stack, Text } from "@mantine/core";
import { useProvidersQuery } from "../../../api/providersApi";
import { useEffect } from "react";
import { Provider } from "../../../models/Provider";
import { PromptRequest } from "../../../models/PromptRequest";
import { PromptOptionsNumImagesField } from "../PromptOptionsNumImagesField/PromptOptionsNumImagesField";
import { PromptOptionsImageResolution } from "../PromptOptionsImageResolution/PromptOptionsImageResolution";
import { ParametersList } from "../../../models/ParametersList";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";

export interface ProvidersDataItem {
    label: string,
    value: string
}

interface PromptOptionsProvidersField {
    providerData: ProvidersDataItem[],
    onChangeProvider: any
}

export function PromptOptionsProvidersField() {
    const [
        userPromptRequest,
        setUserPromptRequest
    ] = useStore(useShallow(state => [
        state.userPromptRequest,
        state.setUserPromptRequest
    ]));

    const providersQuery = useProvidersQuery(userPromptRequest.technology.id);

    useEffect(() => {
        if (providersQuery.data && userPromptRequest.provider.id <= 0) {
            const firstProvider = Provider.clone(providersQuery.data[0]);
            updateProvider(firstProvider.id.toString());
        }
    })

    const updateProvider = (providerId: string | null) => {
        const provider: Provider|undefined = providersQuery.data.find((p: Provider) => p.id === parseInt(providerId as string));
        if (provider) {
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.provider = Provider.clone(provider);
            newUserRequest.parametersList = ParametersList.buildFromProvider(provider);

            setUserPromptRequest(newUserRequest);
        }
    }

    // Provider List
    if (providersQuery.data) {
        const data = providersQuery.data.map((provider: Provider) => {
            return {
                label: provider.model_name,
                value: provider.id.toString()
            }
        });

        const parameters = userPromptRequest.provider.parameters.map(parameter => {
            switch (parameter.slug) {
                case 'num_images':
                    return <PromptOptionsNumImagesField key={parameter.id} parameter={parameter} />
                case 'image_resolution':
                    return <PromptOptionsImageResolution key={parameter.id} parameter={parameter} />
            }
        })
    
        return (
            <Stack>
                <Select
                    label={"Provider"}
                    size="md"
                    variant="unstyled"
                    allowDeselect={false}
                    comboboxProps={{ withinPortal: false }}
                    value={userPromptRequest.provider.id.toString()}
                    data={data}
                    onChange={updateProvider}
                />
                {parameters}
            </Stack>
        )
    }

    return <Loader size={"xs"} type="dot" />
}