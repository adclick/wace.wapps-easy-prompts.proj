import { ActionIcon, Card, Chip, Group, Input, Popover, ScrollArea, Stack, Text } from "@mantine/core"
import { IconQuestionMark } from "@tabler/icons-react"

export function TemplatesPanel() {
    // Temp Templates
    const templates = [
        { name: "SEO Report", help: "" },
        { name: "Images for Portugal Tourism", help: "" },
        { name: "Copy about Finance", help: "" },
    ]

    return (
        <Stack gap={'xl'} my={"md"}>
            <Input size='sm' placeholder={"Search"}></Input>
            <Stack gap={'xs'}>
                {
                    templates.map(item => {
                        return (
                            <Group key={item.name} justify="space-between">
                                <Chip size='sm' variant='light'>
                                    {item.name}
                                </Chip>
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
                        )
                    })
                }
            </Stack>
        </Stack>
    )
}