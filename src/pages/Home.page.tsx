import { useState } from 'react';
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
import classes from './Home.page.module.css';
import cx from 'clsx';
import { Thread } from '../model/Thread';
import { Language } from '../model/Language';

export function HomePage() {
  // API Client
  const aIMediatorClient = new AIMediatorClient();
  const promptOptionsObj = new PromptOptions();

  // Setting state
  const [threads, setThreads] = useState<Thread[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const [promptOptions, setPromptOptions] = useState<PromptOptions>(promptOptionsObj);
  const [userPromptOptions, setUserPromptOptions] = useState<UserPromptOptions>(new UserPromptOptions());
  const [language, setLanguage] = useState<Language>(new Language());

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
            promptOptions={promptOptions}
            setPromptOptions={setPromptOptions}
            userPromptOptions={userPromptOptions}
            setUserPromptOptions={setUserPromptOptions}
            navbarToggle={toggle}
            language={language}
            setLanguage={setLanguage}
          />
        </AppShell.Section>
        {/* NAVBAR BOTTOM */}
        <AppShell.Section>
          <NavbarFooter
            language={language}
            setLanguage={setLanguage}
            userPromptOptions={userPromptOptions}
            setUserPromptOptions={setUserPromptOptions}
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
        />
      </AppShell.Main>

      {/* FOOTER */}
      <AppShell.Footer withBorder={false}>
        <Footer
          aiMediatorClient={aIMediatorClient}
          userPromptOptions={userPromptOptions}
          setRequestLoading={setRequestLoading}
          setRequests={setRequests}
          requestLoading={requestLoading}
          scrollIntoView={scrollIntoView}
          threads={threads}
          setThreads={setThreads}
        />
      </AppShell.Footer>
    </AppShell>
  );
}