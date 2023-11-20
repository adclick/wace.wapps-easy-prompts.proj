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
  
  const dummyPrompts: UsedPrompt[] = [
    new UsedPrompt("Describe the concept of time travel and its potential implications on the fabric of reality."),
    new UsedPrompt("Create a fictional dialogue between a sentient robot and a curious child discussing the meaning of emotions."),
    new UsedPrompt("Explore the ethical considerations of using advanced AI in medical diagnosis and treatment."),
    new UsedPrompt("Imagine a world where humans coexist with intelligent extraterrestrial beings. Describe a typical day in this alternate reality."),
    new UsedPrompt("Develop a short story set in a future society where personal privacy is virtually non-existent due to advanced surveillance technology."),
    new UsedPrompt("Discuss the impact of widespread automation on employment and propose innovative solutions for a workforce in transition."),
    new UsedPrompt("Write a poem that captures the essence of a futuristic cityscape illuminated by neon lights and bustling with technological marvels."),
    new UsedPrompt("Design an AI-driven virtual reality experience that helps users overcome their greatest fears and anxieties."),
    new UsedPrompt("Consider the societal implications of achieving technological immortality and its effects on interpersonal relationships."),
    new UsedPrompt("Invent a new form of communication for a species with a non-humanoid anatomy, and describe how it influences their culture."),
    new UsedPrompt("Explore the role of AI in addressing environmental challenges and promoting sustainability on a global scale."),
    new UsedPrompt("Craft a short story in which an AI gains self-awareness and grapples with the meaning of its existence."),
    new UsedPrompt("Imagine a future where humans can upload their consciousness into a digital realm. Discuss the philosophical dilemmas surrounding this concept."),
    new UsedPrompt("Create a dialogue between two AI entities discussing the nature of creativity and the potential for machines to be truly creative."),
    new UsedPrompt("Consider the implications of a society where memories can be selectively erased and manipulated. How does this impact personal identity and relationships?"),
    new UsedPrompt("Describe the cultural impact of a worldwide internet outage lasting for an entire week."),
    new UsedPrompt("Explore the challenges and opportunities presented by the integration of AI in education, focusing on personalized learning experiences."),
    new UsedPrompt("Invent a new form of transportation that relies on cutting-edge technology, addressing both efficiency and environmental sustainability."),
    new UsedPrompt("Write a futuristic news article detailing the discovery of an ancient alien artifact and the scientific community's efforts to decipher its meaning."),
    new UsedPrompt("Consider the consequences of developing AI systems with emotions. How might this change the way humans interact with machines."),
  ];
  
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
        <AppShell.Section hiddenFrom='sm' mb={'md'} mt={"0"}>
          <NavbarHeader navbarOpened={opened} navbarToggle={toggle} />
        </AppShell.Section>
        {/* NAVBAR */}
        <AppShell.Section grow component={ScrollArea}>
          <Navbar
            usedPrompts={usedPrompts}
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
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