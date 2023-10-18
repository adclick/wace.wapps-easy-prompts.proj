import { AppShell, Badge, Burger, Group, ScrollArea, Tabs, Title, rem, useComputedColorScheme } from '@mantine/core';
import { IconList, IconTemplate } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { EasyPromptsApiClient } from '../clients/EasyPromptsApiClient';
import { PromptOptionsPanel } from '../components/PromptOptionsPanel/PromptOptionsPanel';
import { UserPromptOptions } from '../model/UserPromptOptions';
import { Prompt } from '../components/Prompt/Prompt';
import { TemplatesPanel } from '../components/TemplatesPanel/TemplatesPanel';
import { UserMenu } from '../components/UserMenu/UserMenu';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { RequestsPanel } from '../components/RequestsPanel/RequestsPanel';
import classes from './Home.page.module.css';
import cx from 'clsx';
import { Request } from '../components/RequestsPanel/Request';

export function HomePage() {
  // API Client
  const apiClient = new EasyPromptsApiClient();

  // Setting state
  const [requests, setRequests] = useState<Request[]>([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const userPromptOptionsObj = new UserPromptOptions();
  const [userPromptOptions, setUserPromptOptions] = useState<UserPromptOptions>(userPromptOptionsObj);

  // Setting hooks
  const computedColorScheme = useComputedColorScheme('dark');
  const [opened, { toggle }] = useDisclosure();

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
        height: { base: 90 }
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
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
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
              <PromptOptionsPanel
                userPromptOptions={userPromptOptions}
                setUserPromptOptions={setUserPromptOptions}
              />
            </Tabs.Panel>
            <Tabs.Panel value="templates" py={"md"}>
              <TemplatesPanel />
            </Tabs.Panel>
          </Tabs>
        </AppShell.Section>
        <AppShell.Section>
          <UserMenu />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <RequestsPanel requests={requests} requestLoading={requestLoading} />
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Prompt
          apiClient={apiClient}
          userPromptOptions={userPromptOptions}
          setRequestLoading={setRequestLoading}
          requests={requests}
          setRequests={setRequests}
        />
      </AppShell.Footer>
    </AppShell>
  );
}