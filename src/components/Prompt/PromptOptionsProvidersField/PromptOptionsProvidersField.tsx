import { Loader, Select, Slider, Stack, Text } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { useProvidersQuery } from "../../../api/providersApi";
import { useEffect } from "react";
import { Provider } from "../../../model/Provider";
import { PromptRequest } from "../../../model/PromptRequest";
import { PromptOptionsNumImagesField } from "../PromptOptionsNumImagesField/PromptOptionsNumImagesField";
import { PromptOptionsImageResolution } from "../PromptOptionsImageResolution/PromptOptionsImageResolution";

export interface ProvidersDataItem {
    label: string,
    value: string
}

interface PromptOptionsProvidersField {
    providerData: ProvidersDataItem[],
    onChangeProvider: any
}

export function PromptOptionsProvidersField() {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();

    const providersQuery = useProvidersQuery(userPromptRequest.technology.id);

    useEffect(() => {
        if (providersQuery.data && userPromptRequest.provider.id <= 0) {
            const firstProvider = Provider.clone(providersQuery.data[0]);
            onChangeProvider(firstProvider.id.toString());
        }
    })

    const onChangeProvider = (providerId: string | null) => {
        const provider = providersQuery.data.find((p: Provider) => p.id === parseInt(providerId as string));
        if (provider) {
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.provider = Provider.clone(provider);
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
                    onChange={onChangeProvider}
                />
                {parameters}
            </Stack>
        )
    }

    return <Loader size={"xs"} type="dot" />
}