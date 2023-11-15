import { Tabs, Title, rem } from "@mantine/core";
import { OptionsPanel } from "../OptionsPanel/OptionsPanel";
import { TemplatesPanel } from "../TemplatesPanel/TemplatesPanel";
import { IconList, IconTemplate } from "@tabler/icons-react";
import { PromptOptions } from "../../model/PromptOptions";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { Language } from "../../model/Language";
import { useTranslation } from 'react-i18next';

interface Navbar {
    promptOptions: PromptOptions,
    setPromptOptions: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    navbarToggle: any,
    language: Language,
    setLanguage: any
}

export function Navbar({
    promptOptions,
    setPromptOptions,
    userPromptOptions,
    setUserPromptOptions,
    navbarToggle,
    language,
    setLanguage
}: Navbar) {
    const { t } = useTranslation();

    return (
        <Tabs radius={"sm"} defaultValue="options">
            <Tabs.List grow>
                <Tabs.Tab value="options" leftSection={<IconList style={{ width: rem(14), height: rem(14) }} />}>
                    <Title order={4}>{t('options')}</Title>
                </Tabs.Tab>
                <Tabs.Tab value="templates" leftSection={<IconTemplate style={{ width: rem(14), height: rem(14) }} />}>
                    <Title order={4}>Templates</Title>
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
                />
            </Tabs.Panel>
            <Tabs.Panel value="templates" py={"md"}>
                <TemplatesPanel />
            </Tabs.Panel>
        </Tabs>
    )
}