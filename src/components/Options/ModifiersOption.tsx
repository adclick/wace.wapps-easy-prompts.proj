import { Accordion, ActionIcon, Chip, Group, Input, Popover, ScrollArea, Stack, Text, Title, rem } from "@mantine/core"
import { IconQuestionMark, IconSparkles } from "@tabler/icons-react"
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
        })
    }

    const isChecked = (slug: string) => {
        return activeModifiers.find(m => m.slug === slug) ? true : false;
    }

    return (
        <Accordion.Item key={"modifiers"} value="modifiers">
            <Accordion.Control py={"xs"} icon={<IconSparkles style={{ width: rem(20) }} />}>
                <Group align="baseline" justify="space-between">
                    <Title order={5}>{t('modifiers')}</Title>
                    <Text size="xs">{activeModifiers.length} / {modifiers.length}</Text>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Stack gap={"lg"} my={"xs"}>
                    <Input
                        size='sm'
                        placeholder={(t("search"))}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Stack gap={'xs'}>
                        <Chip.Group multiple={true} onChange={handleOnChangePromptModifier}>
                            {
                                getModifiersToShow().map(item => {
                                    return (
                                        <Group key={item.slug} justify="space-between">
                                            <Chip checked={isChecked(item.slug)} size='sm' variant='light' value={item.slug}>
                                                {item.name}
                                            </Chip>
                                            <Popover width={200} position="bottom" withArrow shadow="md">
                                                <Popover.Target>
                                                    <ActionIcon size={'sm'} variant="outline" aria-label="Settings">
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
            </Accordion.Panel>
        </Accordion.Item>
    )
}