import { ActionIcon, Button, Card, CardSection, Chip, Group, Input, Paper, Popover, Rating, ScrollArea, Stack, Text, Title } from "@mantine/core"
import { IconQuestionMark } from "@tabler/icons-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function TemplatesPanel() {
    const { t } = useTranslation();

    const [searchTerm, setSearchTerm] = useState('');

    // Temp Templates
    const templates: any[] = [
    ]

    const getTemplatesToShow = () => {
        templates.sort((a, b) => a.name.localeCompare(b.name));

        return templates.filter(t => {
            return t.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        })
    }


    return (
        templates.length > 0
            ?
            <Stack gap={'xl'} my={"md"}>
                <Input
                    size='sm'
                    placeholder={t("search")}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Stack gap={'md'}>
                    {
                        getTemplatesToShow().map(item => {
                            return (
                                <Card key={item.name} withBorder>
                                    <Group mb={"lg"} justify="space-between">
                                        <Title order={5}>
                                            {item.name}
                                        </Title>
                                        <Popover width={200} position="bottom" withArrow shadow="md">
                                            <Popover.Target>
                                                <ActionIcon size={'sm'} variant="outline" aria-label="Settings">
                                                    <IconQuestionMark style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                                </ActionIcon>
                                            </Popover.Target>
                                            <Popover.Dropdown>
                                                <Text size="xs">
                                                    {item.help}
                                                </Text>
                                            </Popover.Dropdown>
                                        </Popover>
                                    </Group>
                                    <Card.Section withBorder inheritPadding py={"xs"}>
                                        <Group justify="space-between">
                                            <Rating readOnly color="blue" value={3} />
                                            <Button variant="transparent" size="compact-xs">Apply</Button>
                                        </Group>
                                    </Card.Section>
                                </Card>
                            )
                        })
                    }
                </Stack>
            </Stack>
            : <Text>Not available yet</Text>
    )
}