import { Modifier } from "../../model/Modifier";
import { Parameter } from "../../model/Parameter";
import { Provider } from "../../model/Provider";
import { Technology } from "../../model/Technology";
import { Badge, Box, Button, Card, Chip, Group, Popover, Select, Text } from "@mantine/core";

interface SelectedOptionsWidget {
    technology: Technology,
    provider: Provider,
    parameters: Parameter[],
    modifiers: Modifier[]
}

export function SelectedOptionsWidget({
    technology,
    provider,
    parameters,
    modifiers
}: SelectedOptionsWidget) {
    return (
        <Box w={"auto"} maw={"90%"}>
            <Popover position="top">
                <Popover.Target>
                    <Button size="xs" variant="subtle">
                        {technology.name} | {provider.name}
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <Group justify="space-around" gap={0} wrap="wrap">
                        <Select
                            variant="unstyled"
                            value={"openai-text-generation"}
                            size="xs"
                            data={[
                                {
                                    group: 'Openai', items: [
                                        { label: 'Text Generation', value: 'openai-text-generation' },
                                        { label: 'Image Generation', value: 'openai-image-generation' }]
                                },
                                {
                                    group: 'Google', items: [
                                        { label: 'Text Generation', value: 'google-text-generation' },
                                        { label: 'Image Generation', value: 'google-image-generation' }]
                                },
                            ]}
                        />
                    </Group>
                </Popover.Dropdown>
            </Popover>
            {/* <Group justify="space-around" gap={0}>
                <Select
                    variant="unstyled"
                    value={"Text Generation"}
                    data={['Text Generation', 'Image Generation']}
                    size="xs"
                />
                <Select
                    variant="unstyled"
                    value={"Openai"}
                    data={['Openai', 'Google']}
                    size="xs"
                />
            </Group> */}
            {/* <Badge variant="transparent" size="xs">
                {technology.name} |  {provider.name}
            </Badge> */}
        </Box>

    )
}