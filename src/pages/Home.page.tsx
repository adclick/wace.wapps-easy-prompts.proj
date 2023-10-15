import { ActionIcon, AppShell, Avatar, Burger, Button, Card, Divider, Group, Input, List, Menu, Modal, ScrollArea, Select, Space, Stack, Tabs, Text, Textarea, ThemeIcon, Title, Tooltip, rem } from '@mantine/core';
import { IconArrowRight, IconBrandGravatar, IconCheck, IconCircleCheck, IconCircleDashed, IconClearAll, IconCopy, IconDeviceFloppy, IconDots, IconEye, IconFileZip, IconFilter, IconFlag, IconInfoCircle, IconLanguage, IconList, IconMail, IconMenu, IconPencil, IconQuestionMark, IconSearch, IconSettings, IconShare, IconTemplate, IconThumbDown, IconThumbUp, IconTrash, IconUpload } from '@tabler/icons-react';
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
  const [selectBoxPromptTypes, setSelectBoxPromptTypes] = useState<{ value: string, label: string }[]>([]);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [provider, setProvider] = useState("");
  const [selectBoxProviders, setSelectBoxProviders] = useState<{ value: string, label: string }[]>([]);

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
          {/* <Header opened={opened} toggle={toggle} /> */}
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
                  <NavbarFiltersCard placeholder="Search Filters" items={filters} />
                </Tabs.Panel>

                <Tabs.Panel value="templates" py={"md"}>
                  <NavbarFiltersCard placeholder="Search Templates" items={templates} />
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
        <Card withBorder shadow="sm" radius="0" my={"lg"}>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Avatar src={null} alt="no image here" color="teal" />
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />}>
                    Save
                  </Menu.Item>
                  <Menu.Item leftSection={<IconShare style={{ width: rem(14), height: rem(14) }} />}>
                    Share
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    color="red"
                  >
                    Delete all
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card.Section>

          <Text mt="sm" c="dimmed" size="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat, risus ac efficitur pretium, sapien ipsum volutpat massa, a laoreet leo neque sed nibh. Integer finibus, justo eget tincidunt interdum, metus mauris aliquet diam, non rutrum justo nulla eget urna. Fusce in commodo purus. Nam quis augue varius, tempor tellus at, tempor nisl. Ut aliquet, ex sed fermentum finibus, lorem tortor commodo ex, ac auctor ante urna cursus mauris. Nullam ligula nunc, placerat a iaculis non, volutpat id ipsum. Nullam pretium turpis nisl, cursus pharetra turpis tempor eget.

            Quisque eu suscipit turpis, quis rhoncus dolor. Mauris ac efficitur dui. Morbi non posuere mi. Sed ut nunc vitae nisl sagittis maximus molestie vel sem. Cras luctus aliquet placerat. Aliquam dictum molestie luctus. Aliquam pretium sapien vel odio lobortis, in posuere tortor ultrices.

            Mauris ornare erat nisi. Aliquam erat volutpat. Mauris sed molestie lacus. Etiam sodales pharetra lectus nec accumsan. Nulla quam eros, vestibulum interdum augue ut, feugiat maximus sapien. Vestibulum sodales in justo a euismod. Donec elementum fermentum ante, vel tempus diam mattis ut. Quisque condimentum eu erat sed vulputate. Integer sed tortor posuere odio lobortis congue. Quisque quis porttitor est. Vivamus ac dignissim nulla, sit amet fringilla arcu. Nullam condimentum vitae nunc sit amet aliquet.
          </Text>

          <Card.Section withBorder inheritPadding py={"xs"} mt={"md"}>
            <Group justify='space-between'>
              <ActionIcon variant='subtle'>
                <IconCopy size={"18"} />
              </ActionIcon>
              <Group justify='flex-end'>
                <ActionIcon color='red' variant='subtle'>
                  <IconThumbDown size={"18"} />
                </ActionIcon>
                <ActionIcon variant='subtle'>
                  <IconThumbUp size={"18"} />
                </ActionIcon>

              </Group>
            </Group>
          </Card.Section>
        </Card>
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
