import { AppShell, Badge, Burger, Button, Group, Popover, ScrollArea, Stack, Tabs, Text, Title, rem, useComputedColorScheme } from '@mantine/core';
import { IconList, IconTemplate } from '@tabler/icons-react';
import { useDisclosure, useScrollIntoView } from '@mantine/hooks';
import { useState } from 'react';
import { AIMediatorClient } from '../clients/AIMediatorClient';
import { OptionsPanel } from '../components/OptionsPanel/OptionsPanel';
import { UserPromptOptions } from '../model/UserPromptOptions';
import { Prompt } from '../components/Prompt/Prompt';
import { TemplatesPanel } from '../components/TemplatesPanel/TemplatesPanel';
import { UserMenu } from '../components/UserMenu/UserMenu';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { RequestsPanel } from '../components/RequestsPanel/RequestsPanel';
import classes from './Home.page.module.css';
import cx from 'clsx';
import { Request } from '../components/RequestsPanel/Request';
import { PromptOptions } from '../model/PromptOptions';

export function HomePage() {
  // API Client
  const aIMediatorClient = new AIMediatorClient();
  const promptOptionsObj = new PromptOptions();

  // Setting state
  const [requests, setRequests] = useState<Request[]>([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const [promptOptions, setPromptOptions] = useState<PromptOptions>(promptOptionsObj);
  const [userPromptOptions, setUserPromptOptions] = useState<UserPromptOptions>(new UserPromptOptions());

  // Setting hooks
  const computedColorScheme = useComputedColorScheme('dark');
  const [opened, { toggle }] = useDisclosure();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  return (
    <AppShell
      layout='alt'
      header={{
        height: { base: 80 },
      }}
      navbar={{
        width: { base: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{
        height: { base: 110 }
      }}
      classNames={{
        header: cx(classes.header, classes[computedColorScheme]),
        footer: cx(classes.footer, classes[computedColorScheme]),
        main: cx(classes.main, classes[computedColorScheme]),
        navbar: cx(classes.navbar, classes[computedColorScheme])
      }}
    >
      <AppShell.Header withBorder={false} p={"md"} >
        <Group h={"100%"} px={"md"} justify="space-between">
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
            <Badge size="xs">Beta</Badge>
          </Group>
          <UserMenu />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar withBorder={false} p="md">
        <AppShell.Section hiddenFrom='sm' pt={"sm"} mb={'md'} mt={"0"}>
          <Group h={"100%"} px={"md"}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <Tabs radius={"sm"} defaultValue="options">
            <Tabs.List grow>
              <Tabs.Tab value="options" leftSection={<IconList style={{ width: rem(14), height: rem(14) }} />}>
                <Title order={5}>Options</Title>
              </Tabs.Tab>
              <Tabs.Tab value="templates" leftSection={<IconTemplate style={{ width: rem(14), height: rem(14) }} />}>
                <Title order={5}>Templates</Title>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="options" py={"md"}>
              <OptionsPanel
                promptOptions={promptOptions}
                setPromptOptions={setPromptOptions}
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
                toggle={toggle}
              />
            </Tabs.Panel>
            <Tabs.Panel value="templates" py={"md"}>
              <TemplatesPanel />
            </Tabs.Panel>
          </Tabs>
        </AppShell.Section>
        <AppShell.Section>
          <Popover position='top' width={"target"}>
            <Popover.Target>
              <Group justify='space-between' my={"sm"}>
                <Title order={4}>Operation Cost</Title>
                <Title order={4} c={"teal"}>Free</Title>
              </Group>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack>
                <Group justify='space-between'>
                  <Text>Technology</Text>
                  <Text>Text Generation</Text>
                </Group>
                <Group justify='space-between'>
                  <Text>Provider</Text>
                  <Text>Openai</Text>
                </Group>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <RequestsPanel
          promptOptions={promptOptions}
          requests={requests}
          targetRef={targetRef}
        />
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Prompt
          aIMediatorClient={aIMediatorClient}
          userPromptOptions={userPromptOptions}
          setRequestLoading={setRequestLoading}
          requests={requests}
          setRequests={setRequests}
          requestLoading={requestLoading}
          scrollIntoView={scrollIntoView}
        />
      </AppShell.Footer>
    </AppShell>
  );
}