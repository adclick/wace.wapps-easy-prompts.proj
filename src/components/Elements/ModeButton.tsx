import { ActionIcon, ActionIconGroup, Box, Button, Divider, Popover, TextInput, useComputedColorScheme } from "@mantine/core";
import { IconAdjustments, IconAdjustmentsHorizontal, IconList } from "@tabler/icons-react";
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
                    parameters.map(parameter => {
                        return (
                            <Box>
                                <Divider h={"xs"} />
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
            </Popover.Dropdown>
        </Popover>
    )
}