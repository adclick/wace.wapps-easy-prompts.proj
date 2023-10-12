import { AppShell, Burger, Button, Divider, Group, Menu, ScrollArea, Select, Stack, Title, Tooltip, rem } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { NavbarFiltersCard } from "../NavbarFiltersCard/NavbarFiltersCard";
import { IconCheck, IconClearAll, IconFilter, IconInfoCircle, IconQuestionMark, IconSettings } from "@tabler/icons-react";
import { MouseEventHandler, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { EasyPromptsApiClient } from "../../clients/EasyPromptsApiClient";

interface Template {
    name: string,
    help: string
}

interface Filters {
    name: string,
    help: string
}

interface Props {
    notAvailable: string
    opened: boolean,
    toggle: MouseEventHandler<HTMLButtonElement>,
    templates: Array<Template>
    filters: Array<Filters>
}

export function Navbar({ notAvailable, opened, toggle, templates, filters }: Props) {
    const [promptTypes, setPromptTypes] = useState([]);

    useEffect(() => {
        const client = new EasyPromptsApiClient();
        client.getAllPromptTypes().then(types => setPromptTypes(types));
    });

    return (
        <>
            <AppShell.Section hiddenFrom='sm' grow mb={'xl'}>
                <Header opened={opened} toggle={toggle} />
            </AppShell.Section>
            <AppShell.Section grow component={ScrollArea}>
                <Stack>
                    <Stack gap={'md'}>
                        <Select
                            placeholder="Pick value"
                            data={promptTypes}
                            defaultValue={promptTypes[0]}
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
                        <NavbarFiltersCard placeholder="Search Filters" items={filters} />
                        <NavbarFiltersCard placeholder="Search Templates" items={templates} />
                    </Stack>
                </Stack>
            </AppShell.Section>
            <AppShell.Section>
                <Divider my="xs" />
                <Group grow justify="space-between">
                    <Button size="compact-md" variant="subtle" leftSection={<IconClearAll style={{ width: rem(14), height: rem(14)}}/>}>Clear</Button>
                    <Button size="compact-md" leftSection={<IconCheck style={{ width: rem(14), height: rem(14)}} />}>Apply</Button>
                </Group>
                <Divider my="xs" />
                <Menu shadow="md" width={'target'}>
                    <Menu.Target>
                        <Button variant="subtle" size="compact-md" fullWidth={true} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} >Options</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Application</Menu.Label>
                        <Tooltip label={notAvailable}>
                            <Menu.Item leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                                About
                            </Menu.Item>
                        </Tooltip>
                        <Tooltip label={notAvailable}>

                            <Menu.Item leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
                                How to use
                            </Menu.Item>
                        </Tooltip>
                        <Menu.Divider />

                        <Menu.Label>Administration</Menu.Label>
                        <Tooltip label={notAvailable}>
                            <Menu.Item
                                leftSection={<IconFilter style={{ width: rem(14), height: rem(14) }} />}
                            >
                                Configure Filters
                            </Menu.Item>
                        </Tooltip>
                    </Menu.Dropdown>
                </Menu>
            </AppShell.Section>
        </>
    )
}