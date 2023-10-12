import { ActionIcon, AppShell, Button, Divider, Group, Input, List, Menu, ScrollArea, Select, Space, Stack, Tabs, Textarea, ThemeIcon, Tooltip, rem } from '@mantine/core';
import { IconArrowRight, IconCheck, IconCircleCheck, IconCircleDashed, IconClearAll, IconFilter, IconInfoCircle, IconList, IconPencil, IconQuestionMark, IconSearch, IconSettings } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { NavbarFiltersCard } from '../components/NavbarFiltersCard/NavbarFiltersCard';
import { EasyPromptsApiClient, PromptType } from '../clients/EasyPromptsApiClient';

// Message used for not yet implemented components
const NOT_AVAILABLE = "Not available yet";

export function HomePage() {
  // Setting state vars
  const [promptTypes, setPromptTypes] = useState<{value: string, label: string}[]>([{value: "", label: ""}]);

  // Setting hooks
  const [opened, { toggle }] = useDisclosure();

  // Init logic
  useEffect(() => {
    const client = new EasyPromptsApiClient();
    client.getAllPromptTypes().then((promptType: PromptType[]) => {
      const types = promptType.map((item: PromptType) => ({ value: item.slug, label: item.name }));
      setPromptTypes(types);
    });
  }, []);

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
        height: { base: 90 }
      }}
      padding="md"
    >
      <AppShell.Header withBorder={false} p={"md"}>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section hiddenFrom='sm' grow mb={'xl'}>
          <Header opened={opened} toggle={toggle} />
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <Stack>
            <Stack gap={'md'}>
              <Select
                placeholder="Select the type of prompt"
                data={promptTypes}
                value={promptTypes[0].value}
                allowDeselect={false}
                checkIconPosition='right'
                size='sm'
              />
              <Select
                placeholder="Choose a provider"
                data={['Chat GPT3.5', 'Google', 'Amazon', 'Microsoft']}
                defaultValue={'Chat GPT3.5'}
                allowDeselect={false}
                checkIconPosition='right'
                size='sm'
              />
            </Stack>
            <Stack>
              <NavbarFiltersCard placeholder="Search Filters" items={filters} />
            </Stack>
          </Stack>
        </AppShell.Section>
        <AppShell.Section>
          <Divider my="xs" />
          <Group grow justify="space-between">
            <Button size="compact-md" variant="subtle" leftSection={<IconClearAll style={{ width: rem(14), height: rem(14) }} />}>Clear</Button>
            <Button size="compact-md" leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}>Apply</Button>
          </Group>
          <Divider my="xs" />
          <Menu shadow="md" width={'target'}>
            <Menu.Target>
              <Button variant="subtle" size="compact-md" fullWidth={true} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} >Options</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                  About
                </Menu.Item>
              </Tooltip>
              <Tooltip label={NOT_AVAILABLE}>

                <Menu.Item leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
                  How to use
                </Menu.Item>
              </Tooltip>
              <Menu.Divider />

              <Menu.Label>Administration</Menu.Label>
              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item
                  leftSection={<IconFilter style={{ width: rem(14), height: rem(14) }} />}
                >
                  Configure Filters
                </Menu.Item>
              </Tooltip>
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
      <AppShell.Footer withBorder={false}>
        <Group
          wrap='nowrap'
          align={'center'}
          gap={'sm'}
          pos={"absolute"}
          bottom={"0"}
          w={"100%"}
          py={"md"}
          px={"md"}
        >
          <Textarea
            placeholder="Write something"
            autosize
            autoFocus
            minRows={1}
            w={"100%"}
            size={'lg'}
            styles={{
              input: {
                paddingRight: "50px"
              }
            }}
            radius={'xl'}
          />
          <ActionIcon
            variant="filled"
            size="lg"
            aria-label="Submit"
            pos={"absolute"}
            right={"25px"}
          >
            <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
