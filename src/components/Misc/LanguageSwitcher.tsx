import { SegmentedControl, Select } from "@mantine/core";
import { Language } from "../../model/Language";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { useTranslation } from 'react-i18next';

interface LanguageSwitcher {
    language: Language,
    setLanguage: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any
}

export function LanguageSwitcher({
    language,
    setLanguage,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions
}: LanguageSwitcher) {
    const { i18n } = useTranslation();

    const handleOnChange = (code: string) => {
        setLanguage(code);

        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setLanguage(code);
        setUserPromptOptions(newUserPromptOptions);

        i18n.changeLanguage(code.toLowerCase()).then(() => {
            refreshPromptOptions(code);
        });
    }

    const languages = Language.getAll().map(l => l.toUpperCase());

    return (
        <SegmentedControl
            transitionDuration={100}
            size="sm"
            data={languages}
            onChange={handleOnChange}
        />
    )
}