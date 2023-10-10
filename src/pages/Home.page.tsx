import { NavbarFiltersCard } from '../components/NavbarFiltersCard/NavbarFiltersCard';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { ActionIcon, AppShell, Burger, Button, Card, Chip, Divider, Flex, Group, Input, List, Menu, Popover, ScrollArea, Select, Space, Stack, Tabs, Text, Textarea, ThemeIcon, Title, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight, IconCircleCheck, IconCircleDashed, IconFilter, IconInfoCircle, IconList, IconPencil, IconQuestionMark, IconSearch, IconSettings } from '@tabler/icons-react';

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  const templates = [
    { name: "SEO Report", help: "SEO" },
    { name: "Best Portugal's beaches images", help: "SEO" },
    { name: "Keywords extraction", help: "SEO" },
  ];

  const filters = [
    { name: "Act like a Cardiologist", help: "" },
    { name: "Assume you're a security reviewer", help: "" },
    { name: "Answser me as a SEO expert", help: "" },
  ]

  return (
    <AppShell
      layout='alt'
      header={{
        height: { base: 60 },
      }}
      navbar={{
        width: { base: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{
        height: { base: 60 }
      }}
      padding="md"
    >
      <AppShell.Header withBorder={false} mx={'md'} my={'md'}>
        <Group justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={2}>
              EasyPrompts
            </Title>
          </Group>
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
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
      </AppShell.Navbar>
      <AppShell.Main>
        <Tabs variant='default' radius={'sm'} defaultValue="create">
          <Tabs.List grow justify='space-between'>
            <Tabs.Tab value="create" leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}>
              Create
            </Tabs.Tab>
            <Tabs.Tab value="prompts" leftSection={<IconList style={{ width: rem(14), height: rem(14) }} />}>
              Prompts
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="create">
          </Tabs.Panel>

          <Tabs.Panel value="prompts">
            <Space h={"sm"} />
            <Input placeholder="Search" leftSection={<IconSearch size={16} />} />
            <Space h={"sm"} />
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconCircleCheck size="1rem" />
                </ThemeIcon>
              }
            >
              <List.Item>Clone or download repository from GitHub</List.Item>
              <List.Item>Install dependencies with yarn</List.Item>
              <List.Item>To start development server run npm start command</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item>Run tests to make sure your changes do not break the build</List.Item>
              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCircleDashed size="1rem" />
                  </ThemeIcon>
                }
              >
                Submit a pull request once you are done
              </List.Item>
            </List>
          </Tabs.Panel>

        </Tabs>

      </AppShell.Main>
      <AppShell.Footer withBorder={false} mx={'md'} my={'md'}>
        <Flex
          align={'center'}
          gap={'sm'}
          styles={{
            root: {
              position: "absolute",
              bottom: "0",
              width: "100%"
            }
          }}
        >
          <Textarea
            placeholder="Write something"
            autosize
            size='sm'
            minRows={1}
            styles={{
              root: {
                width: "100%",
              }
            }}
          />
          <ActionIcon variant="filled" size="md" aria-label="Settings">
            <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
