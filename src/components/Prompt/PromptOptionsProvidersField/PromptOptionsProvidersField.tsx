import { Loader, Select, Slider, Stack, Text } from "@mantine/core";
import { useProvidersQuery } from "../../../api/providersApi";
import { useEffect } from "react";
import { Provider } from "../../../models/Provider";
import { PromptOptionsNumImagesField } from "../PromptOptionsNumImagesField/PromptOptionsNumImagesField";
import { PromptOptionsImageResolution } from "../PromptOptionsImageResolution/PromptOptionsImageResolution";
import { ParametersList } from "../../../models/ParametersList";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { Thread } from "../../../models/Thread";
import PromptOptionParameter from "../PromptOptionParameter/PromptOptionParameter";
import { Parameter } from "../../../models/Parameter";

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
        nextThread,
        setNextThread
    ] = useStore(useShallow(state => [
        state.nextThread,
        state.setNextThread
    ]));

    const providersQuery = useProvidersQuery(nextThread.technology.id);

    useEffect(() => {
        if (providersQuery.data && nextThread.provider.id <= 0) {
            const firstProvider = Provider.clone(providersQuery.data[0]);
            updateProvider(firstProvider.id.toString());
        }
    })

    const updateProvider = (providerId: string | null) => {
        const provider: Provider | undefined = providersQuery.data.find((p: Provider) => p.id === parseInt(providerId as string));
        if (provider) {
            const newNextThread = Thread.clone(nextThread);
            newNextThread.provider = Provider.clone(provider);
            newNextThread.parametersList = ParametersList.buildFromProvider(provider);

            setNextThread(newNextThread);
        }
    }

    const updateParameter = (parameter: Parameter, value: string | null) => {
        if (!value) return;
        const newNextThread = Thread.clone(nextThread);
        newNextThread.threads_parameters = nextThread.threads_parameters.filter(p => p.parameter.id !== parameter.id);
        newNextThread.threads_parameters.push({ parameter, value });
        setNextThread(newNextThread);
    }

    // Provider List
    if (providersQuery.data) {
        const data = providersQuery.data.map((provider: Provider) => {
            return {
                label: provider.model_name,
                value: provider.id.toString()
            }
        });

        return (
            <Stack>
                <Select
                    label={"Provider"}
                    size="md"
                    variant="unstyled"
                    allowDeselect={false}
                    comboboxProps={{ withinPortal: false }}
                    value={nextThread.provider.id.toString()}
                    data={data}
                    onChange={updateProvider}
                />
                {
                    nextThread.provider.parameters.map(parameter => {
                        let tp = nextThread.threads_parameters.find(tp => tp.parameter.id = parameter.id);
                        const value = tp ? tp.value : parameter.value;

                        return (
                            <Select
                                variant="unstyled"
                                label={parameter.name}
                                data={parameter.data}
                                value={value}
                                allowDeselect={false}
                                comboboxProps={{ withinPortal: false }}
                                onChange={(value: string | null) => updateParameter(parameter, value)}
                            />
                        )
                    })
                }
            </Stack>
        )
    }

    return <Loader size={"xs"} type="dot" />
}