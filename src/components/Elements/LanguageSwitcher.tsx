import { SegmentedControl } from "@mantine/core";
import { Language } from "../../model/Language";

export function LanguageSwitcher() {
    return (
        <SegmentedControl fullWidth size="md" data={Language.getAll()} />
    )
}