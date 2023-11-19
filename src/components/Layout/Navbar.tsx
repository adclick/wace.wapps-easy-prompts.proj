import { Tabs, Title, rem } from "@mantine/core";
import { OptionsPanel } from "../OptionsPanel/OptionsPanel";
import { TemplatesPanel } from "../TemplatesPanel/TemplatesPanel";
import { IconList, IconTemplate } from "@tabler/icons-react";
import { PromptOptions } from "../../model/PromptOptions";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Language } from "../../model/Language";
import { useTranslation } from 'react-i18next';
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { Parameter } from "../../model/Parameter";
import { Modifier } from "../../model/Modifier";
import { SuggestionsPanel } from "../Panels/SuggestionsPanel";

interface Navbar {
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
    setActiveModifiers: any
    handleOnChangeTechnology: any
    handleOnChangeProvider: any
}

export function Navbar({
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

}: Navbar) {
    const { t } = useTranslation();

    return (
        <SuggestionsPanel />
    )
}