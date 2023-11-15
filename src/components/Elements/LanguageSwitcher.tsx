import { SegmentedControl } from "@mantine/core";
import { Language } from "../../model/Language";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { useTranslation } from 'react-i18next';


interface LanguageSwitcher {
    language: Language,
    setLanguage: any,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any
}

export function LanguageSwitcher({
    language,
    setLanguage,
    userPromptOptions,
    setUserPromptOptions
}: LanguageSwitcher) {
    const { i18n } = useTranslation();


    const handleOnChange = (code: string) => {
        setLanguage(code);

        const newUserPromptOptions = userPromptOptions;
        newUserPromptOptions.setLanguage(code);
        setUserPromptOptions(newUserPromptOptions);

        i18n.changeLanguage(code.toLowerCase());
    }

    return (
        <SegmentedControl fullWidth size="md" data={Language.getAll()} onChange={handleOnChange} />
    )
}