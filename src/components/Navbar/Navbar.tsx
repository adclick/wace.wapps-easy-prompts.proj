import { AppShell, Burger, Button, Divider, Group, Menu, ScrollArea, Select, Stack, Title, rem } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { NavbarFiltersCard } from "../NavbarFiltersCard/NavbarFiltersCard";
import { IconFilter, IconInfoCircle, IconQuestionMark, IconSettings } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

interface Template {
    name: string,
    help: string
}

interface Filters {
    name: string,
    help: string
}

interface Props {
    opened: boolean,
    toggle: MouseEventHandler<HTMLButtonElement>,
    templates: Array<Template>
    filters: Array<Filters>
}

export function Navbar({ opened, toggle, templates, filters }: Props) {
    return (
        <>
            <AppShell.Section hiddenFrom='sm' grow mb={'xl'}>
                <Group justify='space-between'>
                    <Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Title order={2}>
                            EasyPrompt
                        </Title>
                    </Group>
                    <ColorSchemeToggle />
                </Group>
            </AppShell.Section>
            <AppShell.Section grow component={ScrollArea}>
                <Stack>
                    <Stack gap={'md'}>
                        <Select
                            placeholder="Pick value"
                            data={['Text Generation', 'Image Generation', 'Text to Speech']}
                            defaultValue={'Text Generation'}
                            allowDeselect={false}
                            checkIconPosition='right'
                            size='sm'
                        />
                        <Select
                            placeholder="Pick value"
                            data={['Chat GPT3.5', 'Google', 'Amazon', 'Microsoft']}
                            defaultValue={'Chat GPT3.5'}
                            allowDeselect={false}
                            checkIconPosition='right'
                            size='sm'
                        />
                    </Stack>
                    <Stack>
                        <NavbarFiltersCard placeholder="Search Templates" items={templates} />
                        <NavbarFiltersCard placeholder="Search Filters" items={filters} />
                    </Stack>
                </Stack>
            </AppShell.Section>
            <AppShell.Section>
                <Divider my="xs" />
                <Menu shadow="md" width={'target'}>
                    <Menu.Target>
                        <Button fullWidth={true} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} >Options</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Application</Menu.Label>
                        <Menu.Item leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                            About
                        </Menu.Item>
                        <Menu.Item leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
                            How to use
                        </Menu.Item>
                        <Menu.Divider />

                        <Menu.Label>Administration</Menu.Label>
                        <Menu.Item
                            leftSection={<IconFilter style={{ width: rem(14), height: rem(14) }} />}
                        >
                            Configure Filters
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </AppShell.Section>
        </>
    )
}