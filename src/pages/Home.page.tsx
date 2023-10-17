import { ActionIcon, AppShell, Avatar, Burger, Button, Divider, Group, Input, List, LoadingOverlay, Menu, Modal, ScrollArea, Select, Space, Stack, Tabs, Text, Textarea, ThemeIcon, Title, Tooltip, rem, useComputedColorScheme } from '@mantine/core';
import { IconArrowRight, IconCircleCheck, IconCircleDashed, IconFilter, IconFlag, IconInfoCircle, IconLanguage, IconLanguageHiragana, IconLanguageOff, IconList, IconLogout, IconMail, IconMenu, IconPencil, IconQuestionMark, IconSearch, IconSettings, IconShare, IconTemplate, IconThumbDown, IconThumbUp, IconTrash, IconUpload, IconUser } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { NavbarFiltersCard } from '../components/NavbarFiltersCard/NavbarFiltersCard';
import { EasyPromptsApiClient, PromptType, Provider } from '../clients/EasyPromptsApiClient';
import { ResponseCard } from '../components/ResponseContainer/ResponseCard/ResponseCard';
import classes from './Home.page.module.css';
import cx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { ResponseContainer } from '../components/ResponseContainer/ResponseContainer';
import { RequestCard } from '../components/ResponseContainer/RequestCard/RequestCard';
import { Request } from '../components/ResponseContainer/Request';

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
  // API Client
  const apiClient = new EasyPromptsApiClient();

  // Auth0
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  const getAuth0Button = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
      return (
        user &&
        <div>
          Hello {user.name}{' '}
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log out
          </button>
        </div>
      );
    } else {
      return <button onClick={() => loginWithRedirect()}>Log in</button>;
    }
  }


  // Getting color schema
  const computedColorScheme = useComputedColorScheme('dark');

  // Setting state vars
  const [promptTypes, setPromptTypes] = useState<PromptType[]>([]);
  const [promptType, setPromptType] = useState("");
  const [selectBoxPromptTypes, setSelectBoxPromptTypes] = useState<{ value: string, label: string }[]>([]);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [provider, setProvider] = useState("");
  const [selectBoxProviders, setSelectBoxProviders] = useState<{ value: string, label: string }[]>([]);

  const [prompt, setPrompt] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [requestLoading, setRequestLoading] = useState(false);

  const [needImageSizesOption, setNeedImageSizesOption] = useState(false);
  const [selectBoxImageSizes, setSelectBoxImageSizes] = useState<{ value: string, label: string }[]>([]);
  const [imageSize, setImageSize] = useState("");

  // Setting hooks
  const [opened, { toggle }] = useDisclosure();
  const [openedPrompts, { open, close }] = useDisclosure(false);

  // Init logic
  useEffect(() => {
    updatePromptTypes();
  }, []);

  // Update promptTypes
  const updatePromptTypes = () => {
    const client = new EasyPromptsApiClient();
    client.getAllPromptTypes().then((promptTypes: PromptType[]) => {
      setPromptTypes(promptTypes);
      const selectBoxPromptTypes = promptTypes.map(promptType => {
        return {
          value: promptType.prompt_type_slug,
          label: promptType.prompt_type_name
        };
      });

      // Get default promptType
      let defaultPromptType = promptTypes.find(p => p.prompt_type_default === true);
      if (defaultPromptType === undefined) {
        defaultPromptType = promptTypes[0];
      }

      setSelectBoxPromptTypes(selectBoxPromptTypes);
      setPromptType(defaultPromptType.prompt_type_slug);
      updateProviders(promptTypes, promptTypes[1].prompt_type_slug);
    });
  }

  // Update providers
  const updateProviders = async (promptTypes: PromptType[], promptTypeSlug: string) => {
    const client = new EasyPromptsApiClient();
    const providersByPromptType = await client.getProvidersByPromptType(promptTypeSlug);
    setProviders(providersByPromptType);

    const selectBoxProviders = providersByPromptType.map(providerByPromptType => {
      return {
        value: providerByPromptType.provider_slug,
        label: providerByPromptType.provider_name
      }
    });
    setSelectBoxProviders(selectBoxProviders);

    const provider: PromptType | undefined = promptTypes.find((promptType: PromptType) => {
      return promptType.prompt_type_slug === promptTypeSlug;
    });
    if (provider !== undefined) {
      setProvider(provider.provider_slug);
    }
  }

  // Update providers based on the PromptType choosen by the user
  const handlePromptTypesOnChange = async (promptTypeSlug: string) => {
    setPromptType(promptTypeSlug);
    await updateProviders(promptTypes, promptTypeSlug);

    // Temp
    if (promptTypeSlug === 'image-generation') {
      setNeedImageSizesOption(true);
      setSelectBoxImageSizes([
        {label: "300x300", value: "300x300"},
        {label: "512x512", value: "512x512"},
        {label: "1024x1024", value: "1024x1024"},
      ])
    }
  }

  const handleProviderOnChange = async (providerSlug: string) => {
    setProvider(providerSlug);
  }

  const submitPrompt = async () => {
    if (prompt.length <= 0) return;

    setRequestLoading(true);
    const result = await apiClient.submitPrompt(promptType, provider, prompt);

    const request: Request = {
      id: (requests.length + 1),
      prompt,
      result
    };

    setRequests([...requests, request]);
    setPrompt("");
    setRequestLoading(false);
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
        {/* {getAuth0Button()} */}
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section hiddenFrom='sm' pt={"sm"} mb={'xl'} mt={"0"}>
          <Group h={"100%"} px={"md"}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={3}>Options</Title>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <Stack gap={"lg"}>
            <Title visibleFrom='md' order={3} my={"xs"}>Options</Title>
            <Stack gap={'md'}>
              <Select
                placeholder="Select the type of prompt"
                data={selectBoxPromptTypes}
                value={promptType}
                allowDeselect={false}
                checkIconPosition='right'
                size='sm'
                onChange={handlePromptTypesOnChange}
              />
              <Select
                placeholder="Choose a provider"
                data={selectBoxProviders}
                value={provider}
                allowDeselect={false}
                checkIconPosition='right'
                size='sm'
                onChange={handleProviderOnChange}
              />
              {
                needImageSizesOption &&
                <Select
                  placeholder='Choose a size'
                  data={selectBoxImageSizes}
                  value={imageSize}
                  allowDeselect={false}
                  checkIconPosition='right'
                  size='sm'
                />
              }

            </Stack>
            <Tabs radius={"sm"} defaultValue="filters">
              <Tabs.List grow>
                <Tabs.Tab value="filters" leftSection={<IconFilter style={{ width: rem(12), height: rem(12) }} />}>
                  Filters
                </Tabs.Tab>
                <Tabs.Tab value="templates" leftSection={<IconTemplate style={{ width: rem(12), height: rem(12) }} />}>
                  Templates
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="filters" py={"md"}>
                <NavbarFiltersCard items={filters} />
              </Tabs.Panel>

              <Tabs.Panel value="templates" py={"md"}>
                <NavbarFiltersCard items={templates} />
              </Tabs.Panel>
            </Tabs>

            <Button variant='outline' onClick={toggle} hiddenFrom='md'>
              Apply
            </Button>
          </Stack>
        </AppShell.Section>
        <AppShell.Section>
          <Divider my="xs" />
          <Group justify='space-between'>
            <Menu width={"target"}>
              <Menu.Target>
                <Button variant='transparent' leftSection={<IconUser />}>
                  <Text size='sm'>{user !== undefined ? user.name : "User"}</Text>
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} leftSection={<IconLogout style={{ width: "70%", height: "70%" }} />}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Group justify='flex-end'>
              <Menu>
                <Menu.Target>
                  <ActionIcon variant='transparent' size={"lg"}>
                    <Text>EN</Text>
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    PT
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Menu position='top-end' >
                <Menu.Target>
                  <Group justify='space-between'>
                    <ActionIcon variant='transparent' size={"lg"}>
                      <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </Menu.Target>
                <Menu.Dropdown>
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
                      Configure Filters
                    </Menu.Item>
                  </Tooltip>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
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