import { useEffect, useState } from 'react';
import { ActionIcon, AppShell, Box, Burger, Button, Divider, Group, Menu, ScrollArea, Stack, Tabs, Textarea, Title, em, rem, useComputedColorScheme } from '@mantine/core';
import { useDisclosure, useMediaQuery, useScrollIntoView } from '@mantine/hooks';
import { AIMediatorClient } from '../clients/AIMediatorClient';
import { UserPromptOptions } from '../model/UserPromptOptions';
import { PromptOptions } from '../model/PromptOptions';
import { Thread } from '../model/Thread';
import { Language } from '../model/Language';
import { Technology } from '../model/Technology';
import { Provider } from '../model/Provider';
import { Parameter } from '../model/Parameter';
import { Modifier } from '../model/Modifier';
import { Suggestion } from '../model/Suggestion';
import cx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../model/User';
import { TeamSwitcher } from '../components/Misc/TeamSwitcher';
import { UserMenu } from '../components/Misc/UserMenu';
import { PromptInput } from '../components/Prompt/PromptInput';
import { ChatPanel } from '../components/Chat/ChatPanel';
import { SuggestionsPromptsPanel } from '../components/Suggestions/SuggestionsPromptsPanel';
import { Options } from '../model/Options';
import { ColorSchemeToggle } from '../components/Misc/ColorSchemeToggle';
import { SuggestionsHeader } from '../components/Suggestions/SuggestionsHeader';
import { Filters } from '../model/Filters';
import { IconArrowDown, IconChevronDown, IconHistory, IconPlus, IconTrash } from '@tabler/icons-react';

export function HomePage() {
  // API Client
  const aIMediatorClient = new AIMediatorClient();

  const [options, setOptions] = useState<Options>(new Options());

  // Current User
  const { user, logout } = useAuth0();
  const [auth0User, setAuth0User] = useState(user);
  const [currentUser, setCurrentUser] = useState<User>(new User());

  // Hooks
  const computedColorScheme = useComputedColorScheme('dark');
  const [opened, { toggle }] = useDisclosure();
  const [filtersOpened, { open, close }] = useDisclosure(false);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  // User Prompt
  const [userPrompt, setUserPrompt] = useState("");

  // Suggestions
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [filters, setFilters] = useState<Filters>(new Filters());

  // Setting state
  const [threads, setThreads] = useState<Thread[]>([]);
  const [promptOptions, setPromptOptions] = useState<PromptOptions>(new PromptOptions());
  const [userPromptOptions, setUserPromptOptions] = useState<UserPromptOptions>(new UserPromptOptions());
  const [language, setLanguage] = useState<Language>(new Language());
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

  useEffect(() => {
    handleUser();
    refreshPromptOptions(Language.getDefaultCode());
  }, []);

  const handleUser = async () => {
    const aiMediatorClient = new AIMediatorClient();
    
    const user = User.buildFromAuth0(auth0User);
    setCurrentUser(user);

    await aiMediatorClient.createUser(user.id, language.code);
  }
  
  const refreshPromptOptions = async (languageCode: string) => {
    // Init AI Client
    const aiMediatorClient = new AIMediatorClient();
    
    // User
    const user = User.buildFromAuth0(auth0User);
    setCurrentUser(user);

    // Refresh Options
    const promptOptions = await aiMediatorClient.getPromptOptions(user.id, languageCode);
    const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);
    setPromptOptions(promptOptionsObj);
    const newOptions = Options.buildFromApi(promptOptions);
    setOptions(newOptions);

    // Refresh Technologies
    const currentTechnology = promptOptionsObj.getDefaultTechnology();
    setTechnology(currentTechnology);
    setTechnologies(promptOptionsObj.getTechnologies());

    // Refresh Providers
    const currentProvider = promptOptionsObj.getDefaultProvider(currentTechnology.slug);
    setProvider(currentProvider);
    setProviders(promptOptionsObj.getProviders(currentTechnology.slug));

    // Refresh Parameters
    const parameters = promptOptionsObj.getParameters(currentTechnology.slug, currentProvider.slug);
    setParameters(parameters);

    // Refresh Modifiers
    const modifiers = promptOptionsObj.getModifiers(currentTechnology.slug);
    setModifiers(modifiers);
    setActiveModifiers([]);

    // Refresh User Options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setTechnology(currentTechnology);
    newUserPromptOptions.setProvider(currentProvider);
    newUserPromptOptions.setLanguage(languageCode);
    setUserPromptOptions(newUserPromptOptions);

    // Refresh Suggestions
    const usedPrompts = await aiMediatorClient.getSuggestions("", currentTechnology.slug, currentProvider.slug);
    const suggestionsObjs = Suggestion.buildFromApi(usedPrompts);
    setSuggestions(suggestionsObjs);
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
    toggle();
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
        collapsed: { mobile: !opened },
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
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Menu shadow="md" width={200} position='bottom-start'>
              <Menu.Target>
                <Button variant='transparent' size='compact-xl' rightSection={<IconChevronDown style={{ width: rem(18), height: rem(18) }} />}>
                  <Title order={3}>
                    Main Chat
                  </Title>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={resetChat} color='blue' leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                  New Chat
                </Menu.Item>
                <Menu.Item leftSection={<IconHistory style={{ width: rem(14), height: rem(14) }} />}>
                  History
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Group>
            <ColorSchemeToggle />
            <UserMenu />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} p="md">
        <AppShell.Section >
          <SuggestionsHeader
            navbarOpened={opened}
            toggleNavbar={toggle}
            openFilters={open}
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            filters={filters}
            setFilters={setFilters}
            filtersOpened={filtersOpened}
            closeFilters={close}
          />
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <SuggestionsPromptsPanel
            suggestions={suggestions}
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            navbarToggle={toggle}
          />
        </AppShell.Section>
        <AppShell.Section>
          <Divider h={"md"} />
          <TeamSwitcher />
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
        />
      </AppShell.Footer>
    </AppShell>
  );
}