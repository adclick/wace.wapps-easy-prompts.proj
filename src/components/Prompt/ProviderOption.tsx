import { PromptOptions } from "@/model/PromptOptions";
import { Provider } from "../../model/Provider";
import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface ProviderOption {
    promptOptions: PromptOptions,
    currentProvider: Provider
    providers: Provider[],
    handleOnChangeProvider: any
}

export function ProviderOption({
    promptOptions,
    currentProvider,
    providers,
    handleOnChangeProvider
}: ProviderOption) {
    const { t } = useTranslation();

    const providersData = providers.map(p => {
        return {
            label: p.name,
            value: p.slug
        }
    });

    return (
        <Select
            placeholder="Provider"
            data={providersData}
            value={currentProvider.slug}
            allowDeselect={false}
            checkIconPosition='right'
            onChange={handleOnChangeProvider}
            comboboxProps={{ withinPortal: false }}
            variant="unstyled"
            size="md"
        />
    )
}