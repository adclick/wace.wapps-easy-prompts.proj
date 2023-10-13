import { ActionIcon, AppShell, Button, Divider, Group, Input, List, Menu, Modal, ScrollArea, Select, Space, Stack, Tabs, Textarea, ThemeIcon, Tooltip, rem } from '@mantine/core';
import { IconArrowRight, IconCheck, IconCircleCheck, IconCircleDashed, IconClearAll, IconFilter, IconInfoCircle, IconList, IconPencil, IconQuestionMark, IconSearch, IconSettings, IconTemplate, IconUpload } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { NavbarFiltersCard } from '../components/NavbarFiltersCard/NavbarFiltersCard';
import { EasyPromptsApiClient, PromptType, Provider } from '../clients/EasyPromptsApiClient';

// Message used for not yet implemented components
const NOT_AVAILABLE = "Not available yet";

export function HomePage() {
  // Setting state vars
  const [promptTypes, setPromptTypes] = useState<PromptType[]>([]);
  const [promptType, setPromptType] = useState("");
  const [selectBoxPromptTypes, setSelectBoxPromptTypes] = useState<{value: string, label: string}[]>([]);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [provider, setProvider] = useState("");
  const [selectBoxProviders, setSelectBoxProviders] = useState<{value: string, label: string}[]>([]);

  // Setting hooks
  const [opened, { toggle }] = useDisclosure();
  const [openedPrompts, { open, close }] = useDisclosure(false);


  // Init logic
  useEffect(() => {
    console.log('useEffect');
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
      setPromptType(promptTypes[0].prompt_type_slug);
    });
  }, []);

  // Update providers based on the PromptType choosen by the user
  const updateProviders = async (value: any) => {
    console.log('updateProviders');
    const client = new EasyPromptsApiClient();
    const providersByPromptType = await client.getProvidersByPromptType(value);
    setProviders(providersByPromptType);

    const selectBoxProviders = providersByPromptType.map(providerByPromptType => {
      return {
        value: providerByPromptType.slug,
        label: providerByPromptType.name
      }
    });
    setSelectBoxProviders(selectBoxProviders);

    const provider: PromptType|undefined = promptTypes.find((promptType: PromptType) => {
      return promptType.prompt_type_slug = value;
    });
    if (provider !== undefined) {
      setProvider(provider.provider_slug);
    }
  }

  // Temp filters
  const filters = [
    { name: "Act like a Cardiologist", help: "" },
    { name: "Assume you're a security reviewer", help: "" },
    { name: "Answser me as a SEO expert", help: "" },
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
        height: { base: 60 },
      }}
      navbar={{
        width: { base: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{
        height: { base: 90 }
      }}
      padding="md"
    >
      <AppShell.Header withBorder={false} p={"md"}>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section hiddenFrom='sm' mb={'xl'}>
          <Header opened={opened} toggle={toggle} />
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <Stack>
            <Stack gap={'md'}>
              <Select
                placeholder="Select the type of prompt"
                data={selectBoxPromptTypes}
                value={promptType}
                allowDeselect={false}
                checkIconPosition='right'
                size='sm'
                onChange={updateProviders}
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
                  <NavbarFiltersCard placeholder="Search Filters" items={filters} />
                </Tabs.Panel>

                <Tabs.Panel value="templates" py={"md"}>
                  <NavbarFiltersCard placeholder="Search Templates" items={templates} />
                </Tabs.Panel>
              </Tabs>

            </Stack>
          </Stack>
        </AppShell.Section>
        <AppShell.Section>
          <Divider my="xs" />
          <Group grow justify="space-between">
            <Button size="compact-md" variant="subtle" leftSection={<IconClearAll style={{ width: rem(14), height: rem(14) }} />}>Clear</Button>
            <Button size="compact-md" leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}>Apply</Button>
          </Group>
          <Divider my="xs" />
          <Menu shadow="md" width={'target'}>
            <Menu.Target>
              <Button variant="subtle" size="compact-md" fullWidth={true} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} >Options</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Tooltip label={NOT_AVAILABLE}>
                <Menu.Item leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                  About
                </Menu.Item>
              </Tooltip>
              <Tooltip label={NOT_AVAILABLE}>

                <Menu.Item leftSection={<IconQuestionMark style={{ width: rem(14), height: rem(14) }} />}>
                  How to use
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
      <AppShell.Main>

      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Modal size={"xl"} opened={openedPrompts} onClose={close} title={"Optimized Prompts"}>
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
