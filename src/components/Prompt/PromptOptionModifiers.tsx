import { Accordion, ActionIcon, Box, Button, Card, Chip, Collapse, Divider, Group, Input, Modal, MultiSelect, Paper, Popover, ScrollArea, Select, Stack, Text, TextInput, Textarea, Title, rem } from "@mantine/core"
import { IconDeviceFloppy, IconPlus, IconQuestionMark, IconSparkles } from "@tabler/icons-react"
import { PromptOptions } from "../../model/PromptOptions"
import { UserPromptOptions } from "../../model/UserPromptOptions"
import { useState } from "react"
import { Modifier } from "../../model/Modifier"
import { useTranslation } from "react-i18next"
import { useDisclosure } from "@mantine/hooks"
import { AIMediatorClient } from "../../clients/AIMediatorClient"
import { Technology } from "../../model/Technology"

interface PromptOptionModificers {
    modifiers: Modifier[],
    activeModifiers: Modifier[],
    setActiveModifiers: any,
    promptOptions: PromptOptions,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    currentTechnologySlug: string,
    aIMediatorClient: AIMediatorClient,
    technology: Technology,
    refreshPromptOptions: any
}

export function PromptOptionModificers({
    modifiers,
    activeModifiers,
    setActiveModifiers,
    promptOptions,
    userPromptOptions,
    setUserPromptOptions,
    aIMediatorClient,
    technology,
    refreshPromptOptions
}: PromptOptionModificers) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [newModifierName, setNewModifierName] = useState('');
    const [newModifierContent, setNewModifierContent] = useState('');
    const [newModifierModalOpened, newModifierModalHandler] = useDisclosure(false);

    const handleOnChangePromptModifier = (newModifiersSlugs: string[]) => {
        const newModifiers = newModifiersSlugs.map(slug => promptOptions.getModifierBySlug(slug));
        setActiveModifiers(newModifiers);

        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setModifiers(newModifiers);
        setUserPromptOptions(newUserPromptOptions);
    }

    const saveModifier = async () => {
        if (newModifierName !== "" && newModifierContent !== "") {
            await aIMediatorClient.saveModifier(
                newModifierName,
                newModifierContent,
                technology
            );

            await refreshPromptOptions();
        }
    }

    const getModifiersToShow = () => {
        modifiers.sort((a, b) => a.name.localeCompare(b.name));

        modifiers.sort((a, b) => {
            const foundA = activeModifiers.find(am => am.slug === a.slug);
            const foundB = activeModifiers.find(am => am.slug === b.slug);

            if (foundA && !foundB) return -1;
            if (!foundA && foundB) return 1;

            return 0;
        })

        return modifiers.filter(m => {
            return m.name.toLowerCase().includes(searchTerm.toLowerCase());
        }).splice(0, 4)
    }

    const isChecked = (slug: string) => {
        return activeModifiers.find(m => m.slug === slug) ? true : false;
    }

    return (
        <Stack mb={"md"}>
            <Modal opened={newModifierModalOpened} onClose={newModifierModalHandler.close} title={
                <Group align="center">
                    <IconSparkles style={{ width: rem(18), height: rem(18) }} />
                    <Text size="sm">New Modifier</Text>
                </Group>
            }>
                <Stack>
                    <TextInput onChange={(e: any) => setNewModifierName(e.target.value)} value={newModifierName} label="Name" placeholder="Name" size="xs" />
                    <Textarea autosize minRows={3} onChange={(e: any) => setNewModifierContent(e.target.value)} value={newModifierContent} label="Content" placeholder="" size="xs" mt="xs" />
                    <Group>
                        <Button leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />} variant="transparent" size="compact-xs" onClick={saveModifier}>Save</Button>
                    </Group>
                </Stack>
            </Modal>
            <Group justify="space-between">
                <Group >
                    <Text size="md">
                        Modifiers
                    </Text>
                    <Text size="sm">
                        {activeModifiers.length} / {modifiers.length}
                    </Text>
                </Group>
                <Box mx={"sm"}>
                    <ActionIcon onClick={newModifierModalHandler.open} size={"xs"} variant="subtle">
                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Box>
            </Group>
            <Input
                size='xs'
                placeholder={(t("search"))}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <Stack gap={"xs"}>
                <Chip.Group multiple={true} onChange={handleOnChangePromptModifier}>
                    {
                        getModifiersToShow().map(item => {
                            return (
                                <Group key={item.slug} justify="space-between">
                                    <Group>
                                        <Chip checked={isChecked(item.slug)} size='xs' variant='light' value={item.slug} styles={{
                                            label: {
                                                maxWidth: "250px"
                                            }
                                        }}>
                                            <Text size="xs" truncate>
                                                {item.name}
                                            </Text>
                                        </Chip>
                                    </Group>
                                    <Popover width={250} position="top" withArrow shadow="md">
                                        <Popover.Target>
                                            <ActionIcon mx={"sm"} size={'sm'} variant="outline" aria-label="Settings">
                                                <IconQuestionMark style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                            </ActionIcon>
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                            <Stack>
                                                <Text size="xs" fw={600}>
                                                    {item.name}
                                                </Text>
                                                <Text size="xs">
                                                    {item.description}
                                                </Text>
                                            </Stack>
                                        </Popover.Dropdown>
                                    </Popover>
                                </Group>
                            )
                        })
                    }
                </Chip.Group>
            </Stack>
        </Stack>
    )
}