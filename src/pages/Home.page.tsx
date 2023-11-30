import { useEffect, useState } from 'react';
import { ActionIcon, AppShell, Box, Burger, Button, Divider, Group, Image, Loader, LoadingOverlay, Menu, ScrollArea, Text, Title, UnstyledButton, em, rem, useComputedColorScheme } from '@mantine/core';
import { useDisclosure, useMediaQuery, useScrollIntoView } from '@mantine/hooks';
import { IconArrowDown, IconChevronDown, IconHistory, IconPlus, IconPrompt, IconSparkles, IconTemplate, IconTrash } from '@tabler/icons-react';
import cx from 'clsx';
import { AIMediatorClient } from '../clients/AIMediatorClient';
import { UserPromptOptions } from '../model/UserPromptOptions';
import { PromptOptions } from '../model/PromptOptions';
import { Thread } from '../model/Thread';
import { Language } from '../model/Language';
import { Technology } from '../model/Technology';
import { Provider } from '../model/Provider';
import { Parameter } from '../model/Parameter';
import { Modifier } from '../model/Modifier';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../model/User';
import { UserMenu } from '../components/User/UserMenu';
import { PromptInput } from '../components/Prompt/PromptInput';
import { ChatPanel } from '../components/Chat/ChatPanel';
import { RepositoryPanel } from '../components/Repository/RepositoryPanel';
import { Options } from '../model/Options';
import { ColorSchemeToggle } from '../components/Misc/ColorSchemeToggle';
import { RepositoryHeader } from '../components/Repository/RepositoryHeader';
import { Filters } from '../model/Filters';
import { Repository } from '../model/Repository';
import { RepositoryItem } from '../model/RepositoryItem';
import { LanguageSwitcher } from '../components/Misc/LanguageSwitcher';
import favicon from '../favicon.svg';

export function HomePage() {
  // API Client
  const aIMediatorClient = new AIMediatorClient();

  const [options, setOptions] = useState<Options>(new Options());

  // Current User
  const { user, logout } = useAuth0();
  const [currentUser, setCurrentUser] = useState<User>(new User());
  const [auth0User, setAuth0User] = useState(user);

  const [language, setLanguage] = useState<Language>(new Language());

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repository, setRepository] = useState<Repository>(new Repository());
  const [repositoryItems, setRepositoryItems] = useState<RepositoryItem[]>([]);
  const [repositorySearchTerm, setRepositorySearchTerm] = useState('');
  const [refreshingRepository, refreshingRepositoryHandle] = useDisclosure(true)

  // Hooks
  const computedColorScheme = useComputedColorScheme('dark');
  const [navbarOpened, navbarHandle] = useDisclosure();
  const [filtersPanelOpened, filtersPanelHandle] = useDisclosure(false);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  // User Prompt
  const [userPrompt, setUserPrompt] = useState("");

  // Suggestions
  const [filters, setFilters] = useState<Filters>(new Filters());

  // Setting state
  const [threads, setThreads] = useState<Thread[]>([]);
  const [promptOptions, setPromptOptions] = useState<PromptOptions>(new PromptOptions());
  const [userPromptOptions, setUserPromptOptions] = useState<UserPromptOptions>(new UserPromptOptions());
  // technologies
  const defaultTechnology = promptOptions.getDefaultTechnology();
  const [technologies, setTechnologies] = useState<Technology[]>(promptOptions.getTechnologies());
  const [technology, setTechnology] = useState<Technology>(defaultTechnology);
  // providers
  const defaultProvider = promptOptions.getDefaultProvider(defaultTechnology.slug);
  const [providers, setProviders] = useState<Provider[]>(promptOptions.getProviders(defaultTechnology.slug));
  const [provider, setProvider] = useState(defaultProvider);
  // parameters
  const defaultParameters = promptOptions.getParameters(defaultTechnology.slug, defaultProvider.slug);
  const [parameters, setParameters] = useState<Parameter[]>(defaultParameters);
  // modifiers
  const defaultModifiers = promptOptions.getModifiers(defaultTechnology.slug);
  const [modifiers, setModifiers] = useState<Modifier[]>(defaultModifiers);
  const [activeModifiers, setActiveModifiers] = useState<Modifier[]>([]);

  const refreshRepository = async () => {
    refreshingRepositoryHandle.open();
    const repositoryItems = await aIMediatorClient.getRepositoryItems(filters);
    setRepositoryItems(repositoryItems);
    refreshingRepositoryHandle.close();
  }

  useEffect(() => {
    refreshPromptOptions(Language.getDefaultCode());
  }, []);

  const refreshPromptOptions = async (languageCode: string) => {
    // Init AI Client
    const aiMediatorClient = new AIMediatorClient();

    // User
    const user = User.buildFromAuth0(auth0User);
    setCurrentUser(user);

    setLanguage(new Language(languageCode))

    // Repositories
    const { repositories, options, filters, modifiers } = await aiMediatorClient.login(user);
    const repositoryItems = await aiMediatorClient.getRepositoryItems(filters, aiMediatorClient.repositoryItemsLimit, 0);
    const repositoriesObjs = repositories.map((r: any) => Repository.buildFromApi(r));
    setRepositories(repositoriesObjs);
    setRepository(repositoriesObjs[0]);
    setRepositoryItems(repositoryItems);
    refreshingRepositoryHandle.close();

    // Filters
    setFilters(filters);

    // Refresh Options
    const optionsObj = PromptOptions.buildFromApi(options);
    setPromptOptions(optionsObj);
    const newOptions = Options.buildFromApi(promptOptions);
    setOptions(newOptions);

    // Refresh Technologies
    const currentTechnology = optionsObj.getDefaultTechnology();
    setTechnology(currentTechnology);
    setTechnologies(optionsObj.getTechnologies());

    // Refresh Providers
    const currentProvider = optionsObj.getDefaultProvider(currentTechnology.slug);
    setProvider(currentProvider);
    setProviders(optionsObj.getProviders(currentTechnology.slug));

    // Refresh Parameters
    const parameters = optionsObj.getParameters(currentTechnology.slug, currentProvider.slug);
    setParameters(parameters);

    // Refresh Modifiers
    setModifiers(modifiers);
    setActiveModifiers([]);

    // Refresh User Options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setTechnology(currentTechnology);
    newUserPromptOptions.setProvider(currentProvider);
    newUserPromptOptions.setLanguage(languageCode);
    setUserPromptOptions(newUserPromptOptions);
  }

  const handleOnChangeTechnology = (newTechnologySlug: string) => {
    const technology = promptOptions.getTechnologyBySlug(newTechnologySlug);
    setTechnology(technology);

    const providers = promptOptions.getProviders(newTechnologySlug);
    setProviders(providers);

    const newProvider = promptOptions.getDefaultProvider(newTechnologySlug);
    setProvider(newProvider);

    const parameters = promptOptions.getParameters(newTechnologySlug, newProvider.slug);
    setParameters(parameters);

    const modifiers = promptOptions.getModifiers(newTechnologySlug);
    setModifiers(modifiers);
    setActiveModifiers([]);

    // Update user prompt options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setTechnology(technology);
    newUserPromptOptions.setProvider(newProvider);
    newUserPromptOptions.setParameters(parameters);
    newUserPromptOptions.setModifiers(modifiers);
    setUserPromptOptions(newUserPromptOptions);
  }

  const handleOnChangeProvider = (newProviderSlug: string) => {
    const newProvider = promptOptions.getProviderBySlug(newProviderSlug);
    setProvider(newProvider);

    // Update user prompt options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setProvider(newProvider);
    setUserPromptOptions(newUserPromptOptions);
  }

  const resetChat = () => {
    setThreads([]);
  }

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <AppShell
      layout='alt'
      header={{
        height: { base: 80 },
      }}
      navbar={{
        width: { base: 350 },
        breakpoint: 'sm',
        collapsed: { mobile: !navbarOpened },
      }}
      footer={{
        height: { base: 110 }
      }}
      classNames={{
        navbar: cx(computedColorScheme)
      }}
    >
      <AppShell.Header withBorder={false} p={"md"} >
        <Group h={"100%"} justify="space-between" align="center">
          <Group align="center" gap={"xs"}>
            <Burger
              opened={navbarOpened}
              onClick={navbarHandle.toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Menu shadow="md" width={200} position='bottom-start'>
              <Menu.Target>
                <UnstyledButton px={"md"}>
                  <Group align='center' gap={"xs"}>
                    <Title order={3}>Chat</Title>
                    <IconChevronDown style={{ width: rem(18), height: rem(18) }} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={resetChat} color='blue' leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                  New Chat
                </Menu.Item>
                <Menu.Item disabled leftSection={<IconHistory style={{ width: rem(14), height: rem(14) }} />}>
                  History
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Group>
            <ColorSchemeToggle />
            <UserMenu
              filters={filters}
              setFilters={setFilters}
              refreshRepository={refreshRepository}
            />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} p="md">
        <AppShell.Section >
          <RepositoryHeader
            navbarOpened={navbarOpened}
            toggleNavbar={navbarHandle.toggle}
            openFilters={filtersPanelHandle.open}
            filters={filters}
            setFilters={setFilters}
            filtersOpened={filtersPanelOpened}
            closeFilters={filtersPanelHandle.close}
            repositories={repositories}
            repository={repository}
            repositorySearchTerm={repositorySearchTerm}
            setRepositorySearchTerm={setRepositorySearchTerm}
            refreshRepository={refreshRepository}
            refreshingRepository={refreshingRepository}
            refreshingRepositoryHandle={refreshingRepositoryHandle}
          />
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <RepositoryPanel
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            navbarToggle={navbarHandle.toggle}
            repositoryItems={repositoryItems}
            setRepositoryItems={setRepositoryItems}
            repositorySearchTerm={repositorySearchTerm}
            refreshingRepository={refreshingRepository}
            filters={filters}
            aiMediatorClient={aIMediatorClient}
          />
        </AppShell.Section>
        <AppShell.Section>
          <Divider h={"md"} />

          

          <Group justify='space-between'>
            <Group>
              <Group gap={"xs"}>
                <IconPrompt style={{ width: rem(20), height: rem(20) }} />
                <Text>Prompts: </Text>
              </Group>
              <Text>12</Text>
            </Group>
            <Group>
              <Group gap={"xs"}>
                <IconTemplate style={{ width: rem(20), height: rem(20) }} />
                <Text>Templates: </Text>
              </Group>
              <Text>12</Text>
            </Group>
          </Group>

          {/* <LanguageSwitcher
            language={language}
            setLanguage={setLanguage}
            userPromptOptions={userPromptOptions}
            setUserPromptOptions={setUserPromptOptions}
            refreshPromptOptions={refreshPromptOptions}
          /> */}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <ChatPanel
          threads={threads}
          targetRef={targetRef}
          aIMediatorClient={aIMediatorClient}
          userPromptOptions={userPromptOptions}
          setUserPromptOptions={setUserPromptOptions}
          refreshPromptOptions={refreshPromptOptions}
          scrollIntoView={scrollIntoView}
          user={currentUser}
          repository={repository}
          language={language}
        />
      </AppShell.Main>

      <AppShell.Footer withBorder={false}>
        <PromptInput
          aIMediatorClient={aIMediatorClient}
          userPromptOptions={userPromptOptions}
          scrollIntoView={scrollIntoView}
          threads={threads}
          setThreads={setThreads}
          promptOptions={promptOptions}
          technology={technology}
          technologies={technologies}
          handleOnChangeTechnology={handleOnChangeTechnology}
          provider={provider}
          providers={providers}
          modifiers={modifiers}
          handleOnChangeProvider={handleOnChangeProvider}
          activeModifiers={activeModifiers}
          setActiveModifiers={setActiveModifiers}
          setUserPromptOptions={setUserPromptOptions}
          parameters={parameters}
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          refreshPromptOptions={refreshPromptOptions}
          user={currentUser}
          repository={repository}
          language={language}
        />
      </AppShell.Footer>
    </AppShell>
  );
}