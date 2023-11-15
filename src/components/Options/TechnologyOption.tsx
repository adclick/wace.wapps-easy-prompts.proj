import { Accordion, Group, Select, Text, Title, rem } from "@mantine/core";
import { IconBulb } from "@tabler/icons-react";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";

interface TechnologyOption {
    promptOptions: PromptOptions,
    currentTechnology: Technology,
    technologies: Technology[],
    handleOnChangeTechnology: any
}

export function TechnologyOption({
    promptOptions,
    currentTechnology,
    technologies,
    handleOnChangeTechnology
}: TechnologyOption) {
    const technologiesData = technologies.map(t => {
        return {
            label: t.name,
            value: t.slug
        }
    });

    return (
        <Accordion.Item key={"technology"} value="technology">
            <Accordion.Control py={"xs"} icon={<IconBulb style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>Technology</Title>
                    <Text size="xs">{currentTechnology.name}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Select
                    placeholder="Technology"
                    data={technologiesData}
                    value={currentTechnology.slug}
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