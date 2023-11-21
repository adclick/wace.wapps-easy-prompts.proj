import { Accordion, ActionIcon, Box, Button, Chip, Collapse, Group, Input, Paper, Popover, ScrollArea, Stack, Text, TextInput, Textarea, Title, rem } from "@mantine/core"
import { IconPlus, IconQuestionMark, IconSparkles } from "@tabler/icons-react"
import { PromptOptions } from "../../model/PromptOptions"
import { UserPromptOptions } from "../../model/UserPromptOptions"
import { useState } from "react"
import { Modifier } from "../../model/Modifier"
import { useTranslation } from "react-i18next"
import { useDisclosure } from "@mantine/hooks"
import { AIMediatorClient } from "../../clients/AIMediatorClient"
import { Technology } from "../../model/Technology"

interface ModificersOptions {
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

export function ModifiersOption({
    modifiers,
    activeModifiers,
    setActiveModifiers,
    promptOptions,
    userPromptOptions,
    setUserPromptOptions,
    aIMediatorClient,
    technology,
    refreshPromptOptions
}: ModificersOptions) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [opened, { toggle }] = useDisclosure(false);
    const [newModifierName, setNewModifierName] = useState('');
    const [newModifierContent, setNewModifierContent] = useState('');

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
            <Group justify="space-between">
                <Group >
                    <Text size="sm" fw={700}>
                        Modifiers
                    </Text>
                    <Text size="xs">
                        {activeModifiers.length} / {modifiers.length}
                    </Text>
                </Group>
                <Box mx={"sm"}>
                    <ActionIcon onClick={toggle} size={"xs"} variant="transparent">
                        <IconPlus />
                    </ActionIcon>
                </Box>
            </Group>
            <Collapse in={opened}>
                <Paper p={"sm"}>
                    <TextInput onChange={(e: any) => setNewModifierName(e.target.value)} value={newModifierName} label="Name" placeholder="Name" size="xs" />
                    <Textarea onChange={(e: any) => setNewModifierContent(e.target.value)} value={newModifierContent} label="Content" placeholder="" size="xs" mt="xs" />
                    <Button size="compact-xs" onClick={saveModifier}>Save</Button>
                </Paper>
            </Collapse>
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
                                    <Chip checked={isChecked(item.slug)} size='xs' variant='light' value={item.slug}>
                                        {item.name}
                                    </Chip>
                                    <Popover width={200} position="top" withArrow shadow="md">
                                        <Popover.Target>
                                            <ActionIcon mx={"sm"} size={'xs'} variant="outline" aria-label="Settings">
                                                <IconQuestionMark style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                            </ActionIcon>
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                            <Text size="xs">
                                                {item.description}
                                            </Text>
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