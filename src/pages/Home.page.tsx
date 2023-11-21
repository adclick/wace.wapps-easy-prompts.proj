import { useEffect, useState } from 'react';
import { AppShell, ScrollArea, useComputedColorScheme } from '@mantine/core';
import { useDisclosure, useScrollIntoView } from '@mantine/hooks';
import { AIMediatorClient } from '../clients/AIMediatorClient';
import { UserPromptOptions } from '../model/UserPromptOptions';
import { PromptOptions } from '../model/PromptOptions';
import { Header } from '../components/Layout/Header';
import { Main } from '../components/Layout/Main';
import { Footer } from '../components/Layout/Footer';
import { NavbarHeader } from '../components/Layout/NavbarHeader';
import { NavbarFooter } from '../components/Layout/NavbarFooter';
import { Navbar } from '../components/Layout/Navbar';
import { Thread } from '../model/Thread';
import { Language } from '../model/Language';
import { Technology } from '../model/Technology';
import { Provider } from '../model/Provider';
import { Parameter } from '../model/Parameter';
import { Modifier } from '../model/Modifier';
import classes from './Home.page.module.css';
import cx from 'clsx';
import { UsedPrompt } from '../model/UsedPrompt';

export function HomePage() {
  // API Client
  const aIMediatorClient = new AIMediatorClient();

  // Hooks
  const computedColorScheme = useComputedColorScheme('dark');
  const [opened, { toggle }] = useDisclosure();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  // User Prompt
  const [userPrompt, setUserPrompt] = useState("");

  // Suggestions
  const [usedPrompts, setUsedPrompts] = useState<UsedPrompt[]>([]);

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
    refreshPromptOptions(Language.getDefaultCode());
  }, []);

  const refreshPromptOptions = async (languageCode: string) => {
    // Init AI Client
    const aiMediatorClient = new AIMediatorClient();

    // Refresh Suggestions
    const usedPrompts = await aiMediatorClient.getUsedPrompts();
    const usedPromptsObjs = UsedPrompt.buildFromApi(usedPrompts);
    setUsedPrompts(usedPromptsObjs);

    // Refresh Options
    const promptOptions = await aiMediatorClient.getPromptOptions(languageCode);
    const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);
    setPromptOptions(promptOptionsObj);
    
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
    newUserPromptOptions.setParameters(parameters);
    newUserPromptOptions.setModifiers(modifiers)
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
    newUserPromptOptions.setProvider(newProvider)
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
        header: cx(classes.header, classes[computedColorScheme]),
        footer: cx(classes.footer, classes[computedColorScheme]),
        main: cx(classes.main, classes[computedColorScheme]),
        navbar: cx(classes.navbar, classes[computedColorScheme])
      }}
    >
      {/* HEADER */}
      <AppShell.Header withBorder={false} p={"md"} >
        <Header navbarOpened={opened} navbarToggle={toggle} />
      </AppShell.Header>

      {/* NAVBAR */}
      <AppShell.Navbar withBorder={false} p="md">
        {/* NAVBAR HEADER */}
        <AppShell.Section hiddenFrom='sm' mb={'md'} mt={"xs"}>
          <NavbarHeader navbarOpened={opened} navbarToggle={toggle} />
        </AppShell.Section>
        {/* NAVBAR */}
        <AppShell.Section grow component={ScrollArea}>
          <Navbar
            usedPrompts={usedPrompts}
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            navbarToggle={toggle}
          />
        </AppShell.Section>
        {/* NAVBAR BOTTOM */}
        <AppShell.Section>
          <NavbarFooter
            language={language}
            setLanguage={setLanguage}
            userPromptOptions={userPromptOptions}
            setUserPromptOptions={setUserPromptOptions}
            refreshPromptOptions={refreshPromptOptions}
            setThreads={setThreads}
            navbarToggle={toggle}
          />
        </AppShell.Section>
      </AppShell.Navbar>

      {/* MAIN */}
      <AppShell.Main>
        <Main
          threads={threads}
          targetRef={targetRef}
          aIMediatorClient={aIMediatorClient}
          userPromptOptions={userPromptOptions}
          setUserPromptOptions={setUserPromptOptions}
          refreshPromptOptions={refreshPromptOptions}
          scrollIntoView={scrollIntoView}
        />
      </AppShell.Main>

      {/* FOOTER */}
      <AppShell.Footer withBorder={false}>
        <Footer
          aiMediatorClient={aIMediatorClient}
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
          handleOnChangeProvider={handleOnChangeProvider}
          modifiers={modifiers}
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