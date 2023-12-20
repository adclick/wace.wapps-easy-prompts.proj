import { useEffect, useState } from 'react';
import { Stack, Popover, useMantineColorScheme, ActionIcon, AppShell, Box, Burger, Button, Divider, Group, Image, Loader, LoadingOverlay, Menu, ScrollArea, Select, Text, Title, UnstyledButton, em, rem, useComputedColorScheme, Skeleton } from '@mantine/core';
import { useDisclosure, useMediaQuery, useScrollIntoView } from '@mantine/hooks';
import { IconArrowDown, IconCheck, IconChevronDown, IconClearAll, IconExclamationMark, IconFilter, IconHistory, IconInfoCircle, IconLanguage, IconListSearch, IconPencil, IconPhoto, IconPlus, IconPrompt, IconSparkles, IconTemplate, IconToggleLeft, IconTool, IconTrash } from '@tabler/icons-react';
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
import { User } from '../model/User';
import { UserMenu } from '../components/User/UserMenu';
import { PromptInput } from '../components/Prompt/PromptInput';
import { ChatPanel } from '../components/Chat/ChatPanel';
import { RepositoryPanel } from '../components/Repository/RepositoryPanel';
import { Options } from '../model/Options';
import { RepositoryHeader } from '../components/Repository/RepositoryHeader';
import { Filters } from '../model/Filters';
import { Repository } from '../model/Repository';
import { RepositoryItem } from '../model/RepositoryItem';
import { useAuth0 } from '@auth0/auth0-react';
import { useFilters } from '../context/FiltersContext';
import { useOptions } from '../context/OptionsContext';
import { useSelectedFilters } from '../context/SelectedFiltersContext';
import { AppOverlay } from '../components/Misc/AppOverlay';
import { ColorSchemeToggle } from '../components/Misc/ColorSchemeToggle';

export function HomePage() {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  if (!user || !user.sub || !user.email) return <></>;

  const { filters, setFilters } = useFilters();
  const { selectedFilters, setSelectedFilters } = useSelectedFilters();
  const { options, setOptions } = useOptions();
  
  // API Client
  const aIMediatorClient = new AIMediatorClient();

  // Current User
  const [currentUser, setCurrentUser] = useState<User>(new User());
  const [auth0User, setAuth0User] = useState(user);
  const [firstLogin, setFirstLogin] = useState(true);

  const [language, setLanguage] = useState<Language>(new Language());

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repository, setRepository] = useState<Repository>(new Repository());
  const [repositoryItems, setRepositoryItems] = useState<RepositoryItem[]>([]);
  const [repositorySearchTerm, setRepositorySearchTerm] = useState('');
  const [refreshingRepository, refreshingRepositoryHandle] = useDisclosure(true);
  const [repositorySelectedItems, setRepositorySelectedItems] = useState<RepositoryItem[]>([])
  const [repositoryItemDetailsModalOpened, repositoryItemDetailsModalHandle] = useDisclosure(false);
  const [repositoryItemDetailsSelected, setRepositoryItemDetailsSelected] = useState<RepositoryItem>(new RepositoryItem());

  // Hooks
  const computedColorScheme = useComputedColorScheme('dark');
  const { setColorScheme } = useMantineColorScheme();

  const [navbarOpened, navbarHandle] = useDisclosure();
  const [filtersPanelOpened, filtersPanelHandle] = useDisclosure(false);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

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

  const [overlayVisible, overlayHandle] = useDisclosure(true);

  const openRepositoryItemDetailsSelected = (item: RepositoryItem) => {
    setRepositoryItemDetailsSelected(item);
    repositoryItemDetailsModalHandle.open();
  }

  const refreshRepository = async (filters: Filters) => {
    refreshingRepositoryHandle.open();
    const repositoryItems = await aIMediatorClient.getRepositoryItems(filters);
    const repositoryItemsObjs = repositoryItems.map((r: any) => RepositoryItem.buildFromApi(r));
    setRepositoryItems(repositoryItemsObjs);

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

    // Call API
    const { repositories, options, filters, modifiers, theme, first_login } = await aiMediatorClient.login(user);
    setFirstLogin(first_login);


    setColorScheme(theme)

    // Filters
    setFilters(filters);
    setSelectedFilters(filters);
    setOptions(Options.buildFromApi(options));



    const repositoryItems = await aiMediatorClient.getRepositoryItems(filters, aiMediatorClient.repositoryItemsLimit, 0);
    const repositoriesObjs = repositories.map((r: any) => Repository.buildFromApi(r));
    setRepositories(repositoriesObjs);
    setRepository(repositoriesObjs[0]);
    const repositoryItemsObjs = repositoryItems.map((r: any) => RepositoryItem.buildFromApi(r));
    setRepositoryItems(repositoryItemsObjs);
    refreshingRepositoryHandle.close();


    // Refresh Options
    const optionsObj = PromptOptions.buildFromApi(options);
    setPromptOptions(optionsObj);

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

    overlayHandle.close();


    if (first_login === true) {
      const thread = new Thread();
      thread.request.intro = true;
      setThreads([...threads, thread]);
      scrollIntoView({ alignment: 'start' });
    }
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

    const newSelectedFilters = {
      ...selectedFilters,
      technology: newTechnologySlug
    };

    setSelectedFilters(newSelectedFilters);
    refreshRepository(newSelectedFilters);
    setRepositorySelectedItems([]);
  }

  const handleOnChangeProvider = (newProviderSlug: string) => {
    const newProvider = promptOptions.getProviderBySlug(newProviderSlug);
    setProvider(newProvider);

    // Update user prompt options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setProvider(newProvider);
    setUserPromptOptions(newUserPromptOptions);

    const newSelectedFilters = {
      ...selectedFilters,
      provider: newProviderSlug
    };

    setSelectedFilters(newSelectedFilters);
    refreshRepository(newSelectedFilters);
  }

  const resetChat = () => {
    setThreads([]);
  }

  return (
    <Box>
      <AppOverlay visible={overlayVisible} />
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
              <Menu shadow="md" position='bottom-start'>
                <Menu.Target>
                  <UnstyledButton px={"md"} >
                    <Group align='center' gap={"xs"}>
                      <Title order={1} size={"h3"} style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        Chat
                      </Title>
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
                refreshRepository={refreshRepository}
                aiMediatorClient={aIMediatorClient}
                setFirstLogin={setFirstLogin}
                threads={threads}
                setThreads={setThreads}
                scrollIntoView={scrollIntoView}
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
              filtersOpened={filtersPanelOpened}
              closeFilters={filtersPanelHandle.close}
              repositories={repositories}
              repository={repository}
              repositorySearchTerm={repositorySearchTerm}
              setRepositorySearchTerm={setRepositorySearchTerm}
              refreshRepository={refreshRepository}
              refreshingRepository={refreshingRepository}
              refreshingRepositoryHandle={refreshingRepositoryHandle}
              aiMediatorClient={aIMediatorClient}
              repositorySelectedItems={repositorySelectedItems}
            />
          </AppShell.Section>
          <AppShell.Section grow component={ScrollArea} style={{ borderRadius: "1rem" }}>
            <RepositoryPanel
              navbarToggle={navbarHandle.toggle}
              repositoryItems={repositoryItems}
              setRepositoryItems={setRepositoryItems}
              repositorySearchTerm={repositorySearchTerm}
              refreshingRepository={refreshingRepository}
              aiMediatorClient={aIMediatorClient}
              repositorySelectedItems={repositorySelectedItems}
              setRepositorySelectedItems={setRepositorySelectedItems}
              refreshRepository={refreshRepository}
              openRepositoryItemDetailsSelected={openRepositoryItemDetailsSelected}
              threads={threads}
              setThreads={setThreads}
            />
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main>
          <ChatPanel
            threads={threads}
            setThreads={setThreads}
            targetRef={targetRef}
            aIMediatorClient={aIMediatorClient}
            userPromptOptions={userPromptOptions}
            setUserPromptOptions={setUserPromptOptions}
            refreshPromptOptions={refreshPromptOptions}
            scrollIntoView={scrollIntoView}
            user={currentUser}
            repository={repository}
            language={language}
            openRepositoryItemDetailsSelected={openRepositoryItemDetailsSelected}
            filters={filters}
            refreshRepository={refreshRepository}
            theme={computedColorScheme}
            firstLogin={firstLogin}
            setFirstLogin={setFirstLogin}
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
            refreshPromptOptions={refreshPromptOptions}
            user={currentUser}
            repository={repository}
            language={language}
            repositorySelectedItems={repositorySelectedItems}
            setRepositorySelectedItems={setRepositorySelectedItems}
            openRepositoryItemDetailsSelected={openRepositoryItemDetailsSelected}
          />
        </AppShell.Footer>
      </AppShell>
    </Box>
  );
}