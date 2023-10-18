import { ActionIcon, AppShell, Avatar, Burger, Button, Card, Chip, Divider, Group, Input, List, Menu, Modal, Popover, ScrollArea, Select, Space, Stack, Tabs, Text, Textarea, ThemeIcon, Title, Tooltip, rem, useComputedColorScheme, useMantineTheme } from '@mantine/core';
import { IconArrowRight, IconCircleCheck, IconCircleDashed, IconFlag, IconInfoCircle, IconLanguage, IconList, IconLogout, IconMail, IconQuestionMark, IconSearch, IconSettings, IconTemplate } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { EasyPromptsApiClient } from '../clients/EasyPromptsApiClient';
import classes from './Home.page.module.css';
import cx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { ResponseContainer } from '../components/ResponseContainer/ResponseContainer';
import { Request } from '../components/ResponseContainer/Request';
import { PromptOptionsPanel } from '../components/PromptOptionsPanel/PromptOptionsPanel';
import { PromptOptions, ResponseType } from '../model/PromptOptions';
import { UserPromptOptions } from '../model/UserPromptOptions';

// Message used for not yet implemented components
const NOT_AVAILABLE = "Not available yet";


type Auth0ParamError = {
  message: string
}

type Auth0ParamUser = {
  name: string
}

interface Auth0Params {
  isLoading: boolean,
  isAuthenticated: boolean,
  error: Auth0ParamError,
  user: Auth0ParamUser,
  loginWithRedirect: CallableFunction,
  logout: CallableFunction
}

export function HomePage() {
  const theme = useMantineTheme();

  // API Client
  const apiClient = new EasyPromptsApiClient();

  // Auth0
  const { user, logout } = useAuth0();

  // Getting color schema
  const computedColorScheme = useComputedColorScheme('dark');

  // Setting state vars

  const [prompt, setPrompt] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [requestLoading, setRequestLoading] = useState(false);

  // New state (tmp)
  const promptOptionsObj = new PromptOptions();
  const [promptOptions, setPromptOptions] = useState<PromptOptions>(promptOptionsObj);
  const [responseTypes, setResponseTypes] = useState<{ label: string, value: string }[]>(promptOptionsObj.getResponseTypesForSelectBox());
  const [currentResponseType, setCurrentResponseType] = useState(promptOptionsObj.getDefaultResponseTypeForSelectBox());
  const [providers, setProviders] = useState<{ label: string, value: string }[]>(promptOptionsObj.getProvidersForSelectBox());
  const [currentProvider, setCurrentProvider] = useState(promptOptionsObj.getDefaultProviderForSelectBox());

  const userPromptOptionsObj = new UserPromptOptions();
  const [userPromptOptions, setUserPromptOptions] = useState<UserPromptOptions>(userPromptOptionsObj);

  // Setting hooks
  const [opened, { toggle }] = useDisclosure();
  const [openedPrompts, { open, close }] = useDisclosure(false);

  // Init logic
  useEffect(() => {
    fetchPromptOptions();
  }, []);

  // Initialize all options
  const fetchPromptOptions = async () => {
    const client = new EasyPromptsApiClient();
    const promptOptions = await client.getPromptOptions();
    const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);

    const currentResponseType = promptOptionsObj.getDefaultResponseTypeForSelectBox();
    const currentProvider = promptOptionsObj.getDefaultProviderForSelectBox();

    // Initialize prompt options default values
    setPromptOptions(promptOptionsObj);
    setResponseTypes(promptOptionsObj.getResponseTypesForSelectBox());
    setProviders(promptOptionsObj.getProvidersForSelectBox());
    setCurrentResponseType(currentResponseType);
    setCurrentProvider(currentProvider);

    // Initialize user prompt options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setResponseType(currentResponseType);
    newUserPromptOptions.setProvider(currentProvider);
    setUserPromptOptions(newUserPromptOptions);
  }

  // OnChange response-type
  const handleOnChangeResponseType = (currentResponseType: string) => {
    setCurrentResponseType(currentResponseType);
    setCurrentProvider(promptOptions.getDefaultProviderForSelectBoxByResponseTypeSlug(currentResponseType));

    // Update user prompt options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setResponseType(currentResponseType);
    setUserPromptOptions(newUserPromptOptions);
  }

  // OnChange Provider
  const handleOnChangeProvider = (currentProvider: string) => {
    setCurrentProvider(currentProvider);

    // Update user prompt options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setProvider(currentProvider);
    setUserPromptOptions(newUserPromptOptions);
  }

  // Submit prompt
  const submitPrompt = async () => {
    if (prompt.length <= 0) return;
    setRequestLoading(true);
    setPrompt("");
    
    const result = await apiClient.submitPrompt(prompt, userPromptOptions);
    console.log(result);

    setRequestLoading(false);

    console.log(userPromptOptions);
  }

  const submitPromptByTextArea = async (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      await submitPrompt();
    }
  }

  // Temp filters
  const filters = [
    { name: "Act like a Content Manager", help: "" },
    { name: "Assume you're a security reviewer", help: "" },
    { name: "Answser me as a SEO expert", help: "" },
    { name: "Evaluate images like a designer", help: "" },
  ]

  // Temp Templates
  const templates = [
    { name: "SEO Report", help: "" },
    { name: "Images for Portugal Tourism", help: "" },
    { name: "Copy about Finance", help: "" },
  ]

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
        <Header opened={opened} toggle={toggle} />
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
              <Stack gap={"lg"} py={"md"}>
                <Stack gap={'md'}>
                  <Select
                    placeholder="Response Type"
                    data={responseTypes}
                    value={currentResponseType}
                    allowDeselect={false}
                    checkIconPosition='right'
                    size='sm'
                    onChange={handleOnChangeResponseType}
                  />
                  <Select
                    placeholder="Provider"
                    data={providers}
                    value={currentProvider}
                    allowDeselect={false}
                    checkIconPosition='right'
                    size='sm'
                    onChange={handleOnChangeProvider}
                  />


                  <Card shadow="md" withBorder={true}>
                    <Stack gap={'sm'}>
                      <Input size='sm' placeholder={"Search"}></Input>
                      <ScrollArea offsetScrollbars>
                        <Stack gap={'xs'}>
                          {
                            filters.map(item => {
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
                      </ScrollArea>
                    </Stack>
                  </Card>



                  <Button variant='outline' onClick={toggle} hiddenFrom='sm'>
                    Apply
                  </Button>
                </Stack>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="templates" py={"md"}>
              <Card shadow="md" withBorder={true}>
                <Stack gap={'sm'}>
                  <Input size='sm' placeholder={"Search"}></Input>
                  <ScrollArea offsetScrollbars>
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
                  </ScrollArea>
                </Stack>
              </Card>
            </Tabs.Panel>
          </Tabs>

        </AppShell.Section>
        <AppShell.Section>
          <Divider my="xs" />
          <Menu width={"target"}>
            <Menu.Target>
              <Button fullWidth justify='flex-start' size="lg" variant="subtle" px={"xs"}>
                <Group>
                  <Avatar src={user?.picture} />
                  <Stack align='flex-start' gap={0}>
                    <Text style={{ color: 'var(--mantine-color-text)' }} size='md' fw={600}>{user !== undefined ? user.nickname : "User"}</Text>
                    <Text style={{ color: 'var(--mantine-color-text)' }} size='xs'>{user !== undefined ? user.email : "User"}</Text>
                  </Stack>
                </Group>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} leftSection={<IconLogout style={{ width: "70%", height: "70%" }} />}>
                Logout
              </Menu.Item>
              <Menu.Label>Application</Menu.Label>
              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />}>
                  Give Feedback
                </Menu.Item>
              </Tooltip>

              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                  About
                </Menu.Item>
              </Tooltip>

              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item leftSection={<IconFlag style={{ width: rem(14), height: rem(14) }} />}>
                  Whats new
                </Menu.Item>
              </Tooltip>

              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
                  How to use
                </Menu.Item>
              </Tooltip>

              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item leftSection={<IconLanguage style={{ width: rem(14), height: rem(14) }} />}>
                  Language
                </Menu.Item>
              </Tooltip>

              <Menu.Divider />

              <Menu.Label>Administration</Menu.Label>
              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item
                  leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                >
                  Configure Options
                </Menu.Item>
              </Tooltip>
            </Menu.Dropdown>
          </Menu>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <PromptOptionsPanel promptOptions={promptOptions} />
        <ResponseContainer requests={requests} requestLoading={requestLoading} />
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Modal
          size={"xl"}
          opened={openedPrompts}
          onClose={close}
          title={"Optimized Prompts"}
          transitionProps={{
            duration: 100
          }}
        >
          <Stack gap={"md"}>
            <Input placeholder="Search" leftSection={<IconSearch size={16} />} />
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
          </Stack>

        </Modal>
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
          <Tooltip label="Search Optimized Prompts">
            <ActionIcon
              variant="filled"
              size="lg"
              aria-label="Submit"
              pos={"absolute"}
              left={"25px"}
              styles={{
                root: {
                  zIndex: "1"
                }
              }}
              onClick={open}
            >
              <IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>

          <Textarea
            placeholder="Write an amazing prompt"
            autosize
            autoFocus
            minRows={1}
            w={"100%"}
            size={'lg'}
            styles={{
              input: {
                paddingLeft: "60px",
                paddingRight: "50px"
              }
            }}
            radius={'xl'}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={submitPromptByTextArea}
          />
          <ActionIcon
            variant="filled"
            size="lg"
            aria-label="Submit"
            pos={"absolute"}
            right={"25px"}
            onClick={submitPrompt}
          >
            <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}