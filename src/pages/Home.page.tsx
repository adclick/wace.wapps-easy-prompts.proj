import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { ActionIcon, AppShell, Burger, Button, Card, Chip, Divider, Flex, Grid, Group, Input, List, Menu, Popover, ScrollArea, Select, Space, Stack, Tabs, Text, Textarea, ThemeIcon, Title, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight, IconCircleCheck, IconCircleDashed, IconFilter, IconInfoCircle, IconList, IconPencil, IconQuestionMark, IconSearch, IconSettings } from '@tabler/icons-react';
import { Navbar } from '../components/Navbar/Navbar';
import { Header } from '../components/Header/Header';
import { EasyPromptsApiClient } from '../clients/EasyPromptsApiClient';
import { useEffect } from 'react';

const NOT_AVAILABLE = "Not available yet";

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

  useEffect(() => {
    const apiClient = new EasyPromptsApiClient();

    apiClient.getAllPromptTypes().then(r => console.log(r));
  }, [])

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
        <Navbar
          notAvailable={NOT_AVAILABLE}
          opened={opened}
          toggle={toggle}
          templates={templates}
          filters={filters}
        />
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
