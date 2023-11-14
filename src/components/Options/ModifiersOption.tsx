import { Accordion, ActionIcon, Chip, Group, Input, Popover, ScrollArea, Stack, Text, Title, rem } from "@mantine/core"
import { IconPencilUp, IconQuestionMark } from "@tabler/icons-react"
import { Modifier, PromptOptions } from "../../model/PromptOptions"
import { UserPromptOptions } from "@/model/UserPromptOptions"
import { useState } from "react"

interface ModificersOptions {
    modifiers: Modifier[],
    promptOptions: PromptOptions,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    currentTechnologySlug: string
}

export function ModifiersOption({
    modifiers,
    promptOptions,
    userPromptOptions,
    setUserPromptOptions,
    currentTechnologySlug
}: ModificersOptions) {
    const handleOnChangePromptModifier = (newPromptModifiers: any) => {
        const newUserPromptOptions = userPromptOptions;
        // newUserPromptOptions.setPromptModifiers(newPromptModifiers);
        setUserPromptOptions(newUserPromptOptions);
    }

    return (
        <Accordion.Item key={"modifiers"} value="modifiers">
            <Accordion.Control icon={<IconPencilUp style={{ width: rem(20) }} />}>
                <Title order={5}>Modifiers</Title>
            </Accordion.Control>
            <Accordion.Panel>
                <Stack gap={"lg"}>
                    <Input size='sm' placeholder={"Search"}></Input>
                    <ScrollArea offsetScrollbars>
                        <Stack gap={'xs'}>
                            <Chip.Group multiple={true} onChange={handleOnChangePromptModifier}>
                                {
                                    modifiers.map(item => {
                                        return (
                                            <Group key={item.slug} justify="space-between">
                                                <Chip size='sm' variant='light' value={item.slug}>
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
                                                            Some description
                                                        </Text>
                                                    </Popover.Dropdown>
                                                </Popover>
                                            </Group>
                                        )
                                    })
                                }
                            </Chip.Group>
                        </Stack>
                    </ScrollArea>
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    )
}