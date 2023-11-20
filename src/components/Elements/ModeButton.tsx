import { ActionIcon, ActionIconGroup, Box, Button, Divider, Group, Input, Popover, ScrollAreaAutosize, Stack, Tabs, Text, TextInput, rem, useComputedColorScheme } from "@mantine/core";
import { IconAdjustments, IconAdjustmentsHorizontal, IconArrowBackUp, IconCheck, IconDeviceFloppy, IconList, IconRefresh, IconReload, IconSettings, IconTemplate } from "@tabler/icons-react";
import { TechnologyOption } from "../Options/TechnologyOption";
import { ProviderOption } from "../Options/ProviderOption";
import { PromptOptions } from "../../model/PromptOptions";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { ModifiersOption } from "../Options/ModifiersOption";
import { Modifier } from "../../model/Modifier";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Parameter } from "../../model/Parameter";
import { ParameterOption } from "../Options/ParameterOption";
import classes from './ModeButton.module.css';
import cx from 'clsx';
import { useRef } from "react";


interface ModeButton {
    promptOptions: PromptOptions,
    technology: Technology,
    technologies: Technology[],
    handleOnChangeTechnology: any,
    provider: Provider,
    providers: Provider[],
    handleOnChangeProvider: any,
    modifiers: Modifier[],
    activeModifiers: Modifier[],
    setActiveModifiers: any
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    parameters: Parameter[]
}

export function ModeButton({
    promptOptions,
    technology,
    technologies,
    handleOnChangeTechnology,
    provider,
    providers,
    handleOnChangeProvider,
    modifiers,
    activeModifiers,
    setActiveModifiers,
    userPromptOptions,
    setUserPromptOptions,
    parameters
}: ModeButton) {
    const computedColorScheme = useComputedColorScheme('dark');

    const templates = [
        { name: "SEO Report", help: "" },
        { name: "Images for Portugal Tourism", help: "" },
        { name: "Copy about Finance", help: "" },
    ]

    const viewportRef = useRef<HTMLDivElement>(null);

    return (
        <Popover width={300} trapFocus position="top-start" withArrow shadow="md" classNames={{
            dropdown: cx(classes.modeButton, classes[computedColorScheme]),
        }}>
            <Popover.Target >
                <ActionIcon
                    variant="subtle"
                    aria-label="Settings"
                    size="lg"
                    pos={"absolute"}
                    left={"25px"}
                    styles={{
                        root: {
                            zIndex: "1"
                        }
                    }}
                >
                    <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
                <Tabs defaultValue="options" variant="default">
                    <Tabs.List grow>
                        <Tabs.Tab value="options" leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                            <Text size="sm" fw={700}>Options</Text>
                        </Tabs.Tab>
                        <Tabs.Tab value="templates" leftSection={<IconTemplate style={{ width: rem(14), height: rem(14) }} />}>
                            <Text size="sm" fw={700}>Templates</Text>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="options">
                        <ScrollAreaAutosize viewportRef={viewportRef} mah={500} type="hover">
                            <Stack my={"xs"} gap={"xs"}>
                                <TechnologyOption
                                    promptOptions={promptOptions}
                                    currentTechnology={technology}
                                    technologies={technologies}
                                    handleOnChangeTechnology={handleOnChangeTechnology}
                                />
                                <ProviderOption
                                    promptOptions={promptOptions}
                                    currentProvider={provider}
                                    providers={providers}
                                    handleOnChangeProvider={handleOnChangeProvider}
                                />
                                {
                                    parameters.length > 0 &&
                                    <Divider h={"xs"} />
                                }
                                {
                                    parameters.map(parameter => {
                                        return (
                                            <Box my={"sm"} key={parameter.slug}>
                                                <ParameterOption
                                                    key={parameter.slug}
                                                    type={parameter.slug}
                                                    parameter={parameter}
                                                    userPromptOptions={userPromptOptions}
                                                    setUserPromptOptions={setUserPromptOptions}
                                                />
                                            </Box>
                                        )
                                    })
                                }
                                <Divider h={"xs"} />
                                <ModifiersOption
                                    modifiers={modifiers}
                                    activeModifiers={activeModifiers}
                                    setActiveModifiers={setActiveModifiers}
                                    promptOptions={promptOptions}
                                    userPromptOptions={userPromptOptions}
                                    setUserPromptOptions={setUserPromptOptions}
                                    currentTechnologySlug={technology.slug}
                                />
                            </Stack>
                        </ScrollAreaAutosize>
                        <Divider h={"xs"} />
                        <Group justify="space-between">
                            <Button variant="transparent" size="xs" leftSection={<IconReload style={{ width: rem(14), height: rem(14) }} />}>
                                Reset
                            </Button>
                            <Button variant="transparent" size="xs" leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />}>
                                Save Template
                            </Button>

                        </Group>
                    </Tabs.Panel>

                    <Tabs.Panel value="templates">
                        <Stack py={"md"} gap={"md"}>
                            <Input
                                size='xs'
                                placeholder={"Search"}
                            />
                            <Stack gap={"xs"}>
                                {
                                    templates.map(template => {
                                        return (
                                            <Group key={template.name} justify="space-between">
                                                <Text size="sm">{template.name}</Text>
                                                <Button leftSection={<IconCheck style={{width: rem(14), height: rem(14)}} />} variant="subtle" size="compact-xs">Use</Button>
                                            </Group>
                                        )
                                    })
                                }
                            </Stack>
                        </Stack>
                    </Tabs.Panel>

                </Tabs>

            </Popover.Dropdown>
        </Popover>
    )
}