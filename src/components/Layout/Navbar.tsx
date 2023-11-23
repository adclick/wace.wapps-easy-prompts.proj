import { SuggestionsPanel } from "../Suggestions/SuggestionsPanel";
import { UsedPrompt } from "../../model/UsedPrompt";
import { Tabs } from "@mantine/core";

interface Navbar {
    usedPrompts: UsedPrompt[],
    userPrompt: string,
    setUserPrompt: any,
    navbarToggle: any
}

export function Navbar({
    usedPrompts,
    userPrompt,
    setUserPrompt,
    navbarToggle
}: Navbar) {
    return (
        <SuggestionsPanel
            usedPrompts={usedPrompts}
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            navbarToggle={navbarToggle}
        />
    )
}