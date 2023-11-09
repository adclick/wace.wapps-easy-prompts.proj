import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { IconBulb } from "@tabler/icons-react";
import { PromptOptions } from "../../model/PromptOptions";

interface TechnologyOption {
    promptOptions: PromptOptions,
    currentTechnology: string,
    technologies: { label: string, value: string }[],
    handleOnChangeTechnology: any
}

export function TechnologyOption({
    promptOptions,
    currentTechnology,
    technologies,
    handleOnChangeTechnology
}: TechnologyOption) {
    return (
        <Accordion.Item key={"technology"} value="technology">
            <Accordion.Control icon={<IconBulb style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>Technology</Title>
                    <Text size="xs">{promptOptions.getTechnologyBySlug(currentTechnology)?.name}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Select
                    placeholder="Technology"
                    data={technologies}
                    value={currentTechnology}
                    allowDeselect={false}
                    checkIconPosition='right'
                    onChange={handleOnChangeTechnology}
                    variant="unstyled"
                    maxDropdownHeight={"500"}
                    my={"xs"}
                    size="md"
                />
            </Accordion.Panel>
        </Accordion.Item>
    )
}