import { PromptOptions } from "@/model/PromptOptions";
import { Provider } from "../../model/Provider";
import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
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
        <Accordion.Item key={"provider"} value="provider">
            <Accordion.Control py={"xs"} icon={<IconSettings style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>{t('provider')}</Title>
                    <Text size="xs">{currentProvider.name}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Select
                    placeholder="Provider"
                    data={providersData}
                    value={currentProvider.slug}
                    allowDeselect={false}
                    checkIconPosition='right'
                    onChange={handleOnChangeProvider}
                    variant="unstyled"
                    my={"xs"}
                    size="md"
                />
            </Accordion.Panel>
        </Accordion.Item>
    )
}