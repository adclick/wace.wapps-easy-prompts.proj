import { PromptOptions, Provider } from "@/model/PromptOptions";
import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

interface ProviderOption {
    promptOptions: PromptOptions,
    currentProvider: string
    providers: Provider[],
    handleOnChangeProvider: any
}

export function ProviderOption({
    promptOptions,
    currentProvider,
    providers,
    handleOnChangeProvider
}: ProviderOption) {
    const providersData = providers.map(p => {
        return {
            label: p.name,
            value: p.slug
        }
    });

    return (
        <Accordion.Item key={"provider"} value="provider">
            <Accordion.Control icon={<IconSettings style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>Engine</Title>
                    <Text size="xs">{promptOptions.getProviderBySlug(currentProvider)?.name}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Select
                    placeholder="Provider"
                    data={providersData}
                    value={currentProvider}
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