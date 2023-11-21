import { useEffect, useState } from 'react';
import { AppShell, LoadingOverlay, ScrollArea, useComputedColorScheme } from '@mantine/core';
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
  const [usedPrompts, setUsedPrompts] = useState<UsedPrompt[]>([]);
  const [userPrompt, setUserPrompt] = useState("");

  // API Client
  const aIMediatorClient = new AIMediatorClient();
  const promptOptionsObj = new PromptOptions();

  // Setting state
  const [threads, setThreads] = useState<Thread[]>([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const [optionsPanelLoading, setOptionsPanelLoading] = useState(false);
  const [promptOptions, setPromptOptions] = useState<PromptOptions>(promptOptionsObj);
  const [userPromptOptions, setUserPromptOptions] = useState<UserPromptOptions>(new UserPromptOptions());
  const [language, setLanguage] = useState<Language>(new Language());

  // Setting hooks
  const computedColorScheme = useComputedColorScheme('dark');
  const [opened, { toggle }] = useDisclosure();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  // technologies
  const defaultTechnology = promptOptions.getDefaultTechnology();
  const [technologies, setTechnologies] = useState<Technology[]>(promptOptions.getTechnologies());
  const [technology, setTechnology] = useState<Technology>(defaultTechnology);

  // providers
  const defaultProvider = promptOptions.getDefaultProvider(defaultTechnology.slug);
  const [providers, setProviders] = useState<Provider[]>(promptOptions.getProviders(defaultTechnology.slug));
  const [provider, setProvider] = useState(promptOptions.getDefaultProvider(defaultTechnology.slug));

  // parameters
  const [parameters, setParameters] = useState<Parameter[]>(promptOptions.getParameters(defaultTechnology.slug, defaultProvider.slug));

  // modifiers
  const [modifiers, setModifiers] = useState<Modifier[]>(promptOptions.getModifiers(defaultTechnology.slug));
  const [activeModifiers, setActiveModifiers] = useState<Modifier[]>([]);

  useEffect(() => {
    refreshPromptOptions(Language.getDefault());
  }, []);

  const refreshPromptOptions = async (language: string) => {
    setOptionsPanelLoading(true);
    const aIMediatorClient = new AIMediatorClient();
    const usedPrompts = await aIMediatorClient.getUsedPrompts();
    const usedPromptsObjs = UsedPrompt.buildFromApi(usedPrompts);
    setUsedPrompts(usedPromptsObjs);

    const promptOptions = await aIMediatorClient.getPromptOptions(language);
    const promptOptionsObj = PromptOptions.buildFromApi(promptOptions);

    const currentTechnology = promptOptionsObj.getDefaultTechnology();
    const currentProvider = promptOptionsObj.getDefaultProvider(currentTechnology.slug);

    // Initialize prompt options default values
    setPromptOptions(promptOptionsObj);
    setTechnologies(promptOptionsObj.getTechnologies());
    setProviders(promptOptionsObj.getProviders(currentTechnology.slug));
    setParameters(promptOptionsObj.getParameters(currentTechnology.slug, currentProvider.slug));
    setModifiers(promptOptionsObj.getModifiers(currentTechnology.slug));
    setActiveModifiers([]);
    setTechnology(currentTechnology);
    setProvider(currentProvider);

    // Initialize user prompt options
    const newUserPromptOptions = userPromptOptions;
    newUserPromptOptions.setTechnology(currentTechnology);
    newUserPromptOptions.setProvider(currentProvider);
    setUserPromptOptions(newUserPromptOptions);
    setOptionsPanelLoading(false);
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
          setRequestLoading={setRequestLoading}
          requestLoading={requestLoading}
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
        />
      </AppShell.Footer>
    </AppShell>
  );
}