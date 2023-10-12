import { ActionIcon, Button, Card, Chip, Divider, Flex, Group, Input, Popover, ScrollArea, Space, Stack, Text, Title } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

interface Item {
    name: string,
    help: string
}

interface Props {
    placeholder: string,
    items: Array<Item>
}

export function NavbarFiltersCard({ placeholder, items }: Props) {
    return (
        <>
            <Card shadow="md" withBorder={true}>
                <Stack gap={'sm'}>
                    <Input size='xs' placeholder={placeholder}></Input>
                    <ScrollArea h={150} offsetScrollbars>
                        <Stack gap={'xs'}>
                            {
                                items.map(item => {
                                    return (
                                        <Group key={item.name} justify="space-between">
                                            <Chip size='xs' variant='light'>
                                                {item.name}
                                            </Chip>
                                            <Popover width={200} position="bottom" withArrow shadow="md">
                                                <Popover.Target>
                                                    <ActionIcon size={'xs'} variant="outline" aria-label="Settings">
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
                    </ScrollArea>
                </Stack>
            </Card>
        </>
    );
};