import { ActionIcon, AppShell, Burger, Button, Divider, Group, Input, List, Menu, Modal, ScrollArea, Select, Space, Stack, Tabs, Text, Textarea, ThemeIcon, Title, Tooltip, rem, useComputedColorScheme } from '@mantine/core';
import { IconArrowRight, IconCircleCheck, IconCircleDashed, IconFilter, IconFlag, IconInfoCircle, IconLanguage, IconList, IconMail, IconMenu, IconPencil, IconQuestionMark, IconSearch, IconSettings, IconShare, IconTemplate, IconThumbDown, IconThumbUp, IconTrash, IconUpload } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { NavbarFiltersCard } from '../components/NavbarFiltersCard/NavbarFiltersCard';
import { EasyPromptsApiClient, PromptType, Provider } from '../clients/EasyPromptsApiClient';
import { ResponseCard } from '../components/ResponseCard/ResponseCard';
import { RequestCard } from '../components/RequestCard/RequestCard';
import classes from './Home.page.module.css';
import cx from 'clsx';

// Message used for not yet implemented components
const NOT_AVAILABLE = "Not available yet";

export function HomePage() {
  // Setting state vars
  const [promptTypes, setPromptTypes] = useState<PromptType[]>([]);
  const [promptType, setPromptType] = useState("");
  const [selectBoxPromptTypes, setSelectBoxPromptTypes] = useState<{ value: string, label: string }[]>([]);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [provider, setProvider] = useState("");
  const [selectBoxProviders, setSelectBoxProviders] = useState<{ value: string, label: string }[]>([]);

  // Color schema
  const computedColorScheme = useComputedColorScheme('dark');


  // Setting hooks
  const [opened, { toggle }] = useDisclosure();
  const [openedPrompts, { open, close }] = useDisclosure(false);

  // Init logic
  useEffect(() => {
    updatePromptTypes();
  }, []);

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
      setSelectBoxPromptTypes(selectBoxPromptTypes);
      setPromptType(promptTypes[1].prompt_type_slug);
      updateProviders(promptTypes, promptTypes[1].prompt_type_slug);
    });
  }

  const updateProviders = async (promptTypes: PromptType[], promptTypeSlug: string) => {
    const client = new EasyPromptsApiClient();
    const providersByPromptType = await client.getProvidersByPromptType(promptTypeSlug);
    setProviders(providersByPromptType);

    const selectBoxProviders = providersByPromptType.map(providerByPromptType => {
      return {
        value: providerByPromptType.slug,
        label: providerByPromptType.name
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
    setPromptType(promptTypeSlug)
    await updateProviders(promptTypes, promptTypeSlug)
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

  console.log(computedColorScheme);

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
        navbar: cx(classes.navbar, computedColorScheme)
      }}
    >
      <AppShell.Header withBorder={false} p={"md"} >
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section hiddenFrom='sm' mb={'xl'} mt={"0"}>
          <Group>
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
          <Stack>
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
              />
            </Stack>
            <Stack>

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
          </Stack>
        </AppShell.Section>
        <AppShell.Section>
          <Divider my="xs" />
          <Menu shadow="md" width={'target'}>
            <Menu.Target>
              <Button variant="filled" size="md" fullWidth={true} leftSection={<IconMenu style={{ width: rem(14), height: rem(14) }} />} >
                Account
              </Button>
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
                  leftSection={<IconFilter style={{ width: rem(14), height: rem(14) }} />}
                >
                  Configure Filters
                </Menu.Item>
              </Tooltip>
            </Menu.Dropdown>
          </Menu>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main >
        <RequestCard />
        <ResponseCard />
        <RequestCard />
        <ResponseCard />
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
          />
          <ActionIcon
            variant="filled"
            size="lg"
            aria-label="Submit"
            pos={"absolute"}
            right={"25px"}
          >
            <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
