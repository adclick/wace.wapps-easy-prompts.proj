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
    setActiveModifiers
}: Navbar) {
    const { t } = useTranslation();

    return (
        <Tabs radius={"sm"} defaultValue="options">
            <Tabs.List grow>
                <Tabs.Tab value="options" leftSection={<IconList style={{ width: rem(18), height: rem(18) }} />}>
                    <Title order={4}>{t('options')}</Title>
                </Tabs.Tab>
                <Tabs.Tab value="templates" leftSection={<IconTemplate style={{ width: rem(18), height: rem(18) }} />}>
                    <Title order={4}>{t('templates')}</Title>
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="options" py={"md"}>
                <OptionsPanel
                    promptOptions={promptOptions}
                    setPromptOptions={setPromptOptions}
                    userPromptOptions={userPromptOptions}
                    setUserPromptOptions={setUserPromptOptions}
                    navbarToggle={navbarToggle}
                    language={language}
                    setLanguage={setLanguage}
                    technologies={technologies}
                    setTechnologies={setTechnologies}
                    technology={technology}
                    setTechnology={setTechnology}
                    providers={providers}
                    setProviders={setProviders}
                    provider={provider}
                    setProvider={setProvider}
                    parameters={parameters}
                    setParameters={setParameters}
                    modifiers={modifiers}
                    setModifiers={setModifiers}
                    activeModifiers={activeModifiers}
                    setActiveModifiers={setActiveModifiers}
                />
            </Tabs.Panel>
            <Tabs.Panel value="templates" py={"md"}>
                <TemplatesPanel />
            </Tabs.Panel>
        </Tabs>
    )
}