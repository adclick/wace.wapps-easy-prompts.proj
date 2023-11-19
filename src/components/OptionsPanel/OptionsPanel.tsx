import { useEffect, useState } from "react"
import { Accordion, Box, Button, LoadingOverlay, Overlay, Stack, Tabs } from "@mantine/core"
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { PromptOptions } from "../../model/PromptOptions";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { TechnologyOption } from "../Options/TechnologyOption";
import { ProviderOption } from "../Options/ProviderOption";
import { ParameterOption } from "../Options/ParameterOption";
import { ModifiersOption } from "../Options/ModifiersOption";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { Parameter } from "../../model/Parameter";
import { Modifier } from "../../model/Modifier";
import { Language } from "../../model/Language";
import { LanguageSwitcher } from "../Elements/LanguageSwitcher";

interface OptionsPanel {
    promptOptions: PromptOptions,
    setPromptOptions: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    navbarToggle: any,
    language: Language,
    setLanguage: any,
    technologies: Technology[],
    setTechnologies: any,
    technology: Technology,
    setTechnology: any
    providers: Provider[]
    setProviders: any
    provider: Provider
    setProvider: any
    parameters: Parameter[]
    setParameters: any
    modifiers: Modifier[]
    setModifiers: any
    activeModifiers: Modifier[]
    setActiveModifiers: any,
    handleOnChangeTechnology: any,
    handleOnChangeProvider: any
}

export function OptionsPanel({
    promptOptions,
    setPromptOptions,
    userPromptOptions,
    setUserPromptOptions,
    navbarToggle,
    language,
    setLanguage,
    technologies,
    setTechnologies,
    technology,
    setTechnology,
    providers,
    setProviders,
    provider,
    setProvider,
    parameters,
    setParameters,
    modifiers,
    setModifiers,
    activeModifiers,
    setActiveModifiers,
    handleOnChangeTechnology,
    handleOnChangeProvider

}: OptionsPanel) {
    return (
        <Stack gap={'md'}>
            <Accordion variant="" chevron="">
                {
                    parameters.map(parameter => {
                        return (
                            <ParameterOption
                                key={parameter.slug}
                                type={parameter.slug}
                                parameter={parameter}
                                userPromptOptions={userPromptOptions}
                                setUserPromptOptions={setUserPromptOptions}
                            />
                        )
                    })
                }
                <ModifiersOption
                    modifiers={modifiers}
                    activeModifiers={activeModifiers}
                    setActiveModifiers={setActiveModifiers}
                    promptOptions={promptOptions}
                    userPromptOptions={userPromptOptions}
                    setUserPromptOptions={setUserPromptOptions}
                    currentTechnologySlug={technology.slug}
                />
            </Accordion>
            <Button onClick={navbarToggle} hiddenFrom='sm'>
                Apply
            </Button>

        </Stack>
    )
}