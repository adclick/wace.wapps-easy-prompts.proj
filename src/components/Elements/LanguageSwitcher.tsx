import { SegmentedControl } from "@mantine/core";
import { Language } from "../../model/Language";

interface LanguageSwitcher {
    language: Language,
    setLanguage: any
}

export function LanguageSwitcher({
    language,
    setLanguage
}: LanguageSwitcher) {
    return (
        <SegmentedControl fullWidth size="md" data={Language.getAll()} onChange={setLanguage} />
    )
}