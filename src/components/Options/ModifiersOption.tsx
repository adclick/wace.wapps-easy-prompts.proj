import { Accordion, ActionIcon, Button, Chip, Group, Input, Popover, ScrollArea, Stack, Text, Title, rem } from "@mantine/core"
import { IconPlus, IconQuestionMark, IconSparkles } from "@tabler/icons-react"
import { PromptOptions } from "../../model/PromptOptions"
import { UserPromptOptions } from "../../model/UserPromptOptions"
import { useState } from "react"
import { Modifier } from "../../model/Modifier"
import { useTranslation } from "react-i18next"

interface ModificersOptions {
    modifiers: Modifier[],
    activeModifiers: Modifier[],
    setActiveModifiers: any,
    promptOptions: PromptOptions,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    currentTechnologySlug: string
}

export function ModifiersOption({
    modifiers,
    activeModifiers,
    setActiveModifiers,
    promptOptions,
    userPromptOptions,
    setUserPromptOptions,
}: ModificersOptions) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleOnChangePromptModifier = (newModifiersSlugs: string[]) => {
        const newModifiers = newModifiersSlugs.map(slug => promptOptions.getModifierBySlug(slug));
        setActiveModifiers(newModifiers);

        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setModifiers(newModifiers);
        setUserPromptOptions(newUserPromptOptions);
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
        <Stack my={"md"}>
            <Group justify="space-between">
                <Group >
                    <Text size="sm" fw={700}>
                        Modifiers
                    </Text>
                    <Text size="sm">
                        {activeModifiers.length} / {modifiers.length}
                    </Text>
                </Group>
                <ActionIcon size={"xs"} variant="transparent"><IconPlus /></ActionIcon>
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
                                    <Chip checked={isChecked(item.slug)} size='xs' variant='light' value={item.slug}>
                                        {item.name}
                                    </Chip>
                                    <Popover width={200} position="top" withArrow shadow="md">
                                        <Popover.Target>
                                            <ActionIcon size={'xs'} variant="outline" aria-label="Settings">
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